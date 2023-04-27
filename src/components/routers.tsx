import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./context/auth-context";
import { Routes } from "../constants/routes";

// @ts-ignore
const renderMergedProps = (component, ...rest) => {
  const theProps = Object.assign({}, ...rest);
  return React.createElement(component, theProps);
};

// @ts-ignore
export const PrivateRoute = ({ component, ...rest }) => {
  const { authorized } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? (
          renderMergedProps(component, props, rest)
        ) : (
          <Redirect to={{ pathname: Routes.Login, state: { from: props.location } }} />
        )
      }
    />
  );
};

// @ts-ignore
export const PublicRoute = ({ component, ...rest }) => {
  const { authorized } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? (
          <Redirect to={{ pathname: Routes.Dashboard, state: { from: props.location } }} />
        ) : (
          renderMergedProps(component, props, rest)
        )
      }
    />
  );
};
