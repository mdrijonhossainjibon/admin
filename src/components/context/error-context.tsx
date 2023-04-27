import React from "react";
import { message } from "antd";
import { ApolloError } from "@apollo/client";
import { ServerParseError } from "@apollo/client/link/http";
import { useAuthContext } from "./auth-context";
import { useTranslation } from "react-i18next";
import { GraphQLError } from "graphql";

type ErrorContextType = {
  addError: (error: string) => void;
  handleApolloError: (error: ApolloError | undefined) => void;
};

const defaultErrorContext: ErrorContextType = {
  addError: () => {},
  handleApolloError: () => {},
};

const ErrorContext = React.createContext<ErrorContextType>(defaultErrorContext);

type Props = {
  children: React.ReactNode;
};

export const ErrorContextProvider = ({ children }: Props) => {
  const { logoutUser } = useAuthContext();
  const { t } = useTranslation();

  const errorMessagePrefix = "setter.error.";
  const translateError = (id: string) => t(`${errorMessagePrefix}${id}`);

  const handleApolloError = (e: GraphQLError | ApolloError | undefined) => {
    if (e) {
      const translatedError = translateError(e.message);
      const networkError = (e as ApolloError).networkError;
      const serverParseError = networkError as ServerParseError;
      if (serverParseError && [401, 404].indexOf(serverParseError.statusCode) > -1) {
        console.log("NEED LOGOUT");
        logoutUser();
      }

      message.error(translatedError);
    }
  };

  return (
    <ErrorContext.Provider
      value={{
        addError: (error: string) => {
          message.error(translateError(error));
        },
        handleApolloError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => React.useContext(ErrorContext);
