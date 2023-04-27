import React, { useEffect, useState } from "react";
import { getFromStorage, useStorageState } from "../../utils/storage-utils";
import { asRole, UserRole } from "../../constants/user";
import { LoginData } from "../pages/login/LoginBridge";
import { useErrorContext } from "./error-context";
import { config } from "../../config";
import { useQuery } from "../../graphql/hooks";
import { SelfUserGQL } from "../../graphql/Queries";
import { SelfUser, SelfUserVariables } from "../../graphql/queries/SelfUser";
import { Spin } from "antd";
import { NetworkStatus } from "@apollo/client";

const uidKey = "userUid";
const roleKey = "userRole";
const storage: Storage = sessionStorage;

type AuthContextType = {
  authorized: boolean;
  uid: string | undefined;
  role: UserRole | undefined;
  setUid: (uid: string | undefined) => void;
  setRole: (role: string | undefined) => void;
  logoutUser: () => void;
  loginUser: (data: LoginData) => void;
};

const defaultAuthContext: AuthContextType = {
  authorized: false,
  uid: getFromStorage(storage, uidKey),
  role: asRole(getFromStorage(storage, roleKey)),
  setRole: () => {},
  setUid: () => {},
  logoutUser: () => {},
  loginUser: (_data: LoginData) => {},
};

const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);

type LoginResponse = {
  uid: string;
  role: UserRole;
};

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [authorized, setAuthorized] = useState(false);
  const [uid, setUid] = useStorageState(storage, uidKey);
  const [role, setRole] = useStorageState(storage, roleKey);
  const errorContext = useErrorContext();

  const { data: user, loading: loadingUser, networkStatus } = useQuery<SelfUser, SelfUserVariables>(SelfUserGQL, {
    fetchPolicy: "no-cache",
    hideError: true,
  });

  // initial user session verification
  useEffect(() => {
    // if session expired, redirect to login
    if (networkStatus === NetworkStatus.error) {
      resetUser();
    }

    // if user found, set user state
    if (user) {
      const { uid, role } = user.userWithProfile;

      setUid(uid);
      setRole(role);
    }
  }, [networkStatus]);

  useEffect(() => {
    if (uid && role) {
      setAuthorized(true);
    }
  }, [uid, role]);

  const resetUser = () => {
    setRole(undefined);
    setUid(undefined);
    setAuthorized(false);
  };

  const handleLogout = async () => {
    console.log("HANDLE LOGOUT");
    try {
      resetUser();
      await logoutFetch();
    } catch (err) {
      errorContext.addError(err.message);
    }
  };

  const handleLogin = async (data: LoginData) => {
    try {
      const user = await loginFetch(data);
      setUid(user.uid);
      setRole(user.role);
      return user;
    } catch (err) {
      errorContext.addError(err.message);
    }

    return undefined;
  };

  return (
    <AuthContext.Provider
      value={{
        authorized,
        role: asRole(role),
        logoutUser: handleLogout,
        loginUser: handleLogin,
        uid,
        setRole,
        setUid,
      }}
    >
      {loadingUser ? (
        <div className="spinner-container">
          <Spin size="large" className="setter-spinner-centered" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);

const loginFetch = async (data: LoginData) => {
  const res = await fetch(`${config.API_URL}/api/v2/barong/identity/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return (await res.json()) as LoginResponse;
  }

  const error = await res.json();

  if (Array.isArray(error.errors)) {
    throw new Error(error.errors[0]);
  } else {
    throw new Error("backend_error");
  }
};

const logoutFetch = async (): Promise<boolean> => {
  const res = await fetch(`${config.API_URL}/api/v2/barong/identity/sessions`, {
    method: "DELETE",
  });

  if (res.ok) {
    return true;
  }

  const error = await res.json();

  if (Array.isArray(error.errors)) {
    throw new Error(error.errors[0]);
  } else {
    throw new Error("backend_error");
  }
};
