import { PageHeader, Tabs } from "antd";
import { Routes } from "../../../../constants/routes";
import { useHistory, Switch, Route, Redirect, useLocation } from "react-router-dom";
import Assets from "./Assets";
import Liabilities from "./Liabilities";
import Revenues from "./Revenues";
import Expenses from "./Expenses";
import { useTranslation } from "react-i18next";

export default function BusinessAnalytics() {
  const history = useHistory();
  const location = useLocation();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.businessAnalytics.${id}`);

  const handleMenu = (key: string) => {
    history.push(key);
  };

  const routes = [
    { route: Routes.Assets, component: Assets, name: t("nav.assets") },
    { route: Routes.Liabilities, component: Liabilities, name: t("nav.liabilities") },
    { route: Routes.Revenues, component: Revenues, name: t("nav.revenues") },
    { route: Routes.Expenses, component: Expenses, name: t("nav.expenses") },
  ];

  const selectedKey = routes.find((item) => item.route === location.pathname)?.route;

  return (
    <>
      <PageHeader
        className="setter-page-header"
        ghost={false}
        title={translate("setter.layouts.operations.nav.businessAnalytics")}
      >
        <Tabs activeKey={selectedKey} onChange={handleMenu}>
          {routes.map((item) => (
            <Tabs.TabPane tab={item.name} key={item.route} />
          ))}
        </Tabs>

        <Switch>
          {routes.map((item) => (
            <Route key={item.route} path={item.route} component={item.component} />
          ))}
          <Redirect to={routes[0].route} />
        </Switch>
      </PageHeader>
    </>
  );
}
