import { lazy, Suspense } from "react";
import "./App.less";
import "./App.dark.less";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { Routes } from "./constants/routes";
import { PrivateRoute, PublicRoute } from "./components/routers";
import { Spin } from "antd";
import MainLayout from "./components/MainLayout";
import { ErrorContextProvider } from "./components/context/error-context";
import { AuthContextProvider } from "./components/context/auth-context";

const login = lazy(() => import("./components/pages/login/LoginPage"));
const dashboard = lazy(() => import("./components/pages/dashboard/Dashboard"));
const usersLayout = lazy(() => import("./components/pages/users/UsersLayout"));
const configuration = lazy(() => import("./components/pages/configuration/ConfigurationsLayouts"));
const devOps = lazy(() => import("./components/pages/devops/DevopsLayout"));
const operations = lazy(() => import("./components/pages/operations/OperationsLayout"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="spinner-container">
            <Spin size="large" className="setter-spinner-centered" />
          </div>
        }
      >
        <AuthContextProvider>
          <ErrorContextProvider>
            <MainLayout>
              <Switch>
                <PublicRoute exact path={Routes.Login} component={login} />

                <PrivateRoute path={Routes.Dashboard} component={dashboard} />
                <PrivateRoute path={Routes.Users} component={usersLayout} />
                <PrivateRoute path={Routes.Operations} component={operations} />
                <PrivateRoute path={Routes.Configuration} component={configuration} />
                <PrivateRoute path={Routes.Devops} component={devOps} />

                <Redirect to={Routes.Dashboard} />
              </Switch>
            </MainLayout>
          </ErrorContextProvider>
        </AuthContextProvider>
      </Suspense>
    </Router>
  );
}

export default App;
