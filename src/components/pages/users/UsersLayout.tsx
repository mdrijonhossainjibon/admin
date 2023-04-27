import { lazy } from "react";
import { Layout } from "antd";
import { /*BarsOutlined,*/ TeamOutlined, ContainerOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Routes } from "../../../constants/routes";
import TabbedMenuLayout from "../../TabbedMenuLayout";
import { Switch, Route } from "react-router-dom";

const userDetailsLayout = lazy(() => import("./users-list/user-details/UserDetailsLayout"));
const userListPage = lazy(() => import("./users-list/ListUsersPage"));
const userActivities = lazy(() => import("./activities/Activities"));
const userApplications = lazy(() => import("./applications/Applications"));

export default function UsersLayout() {
  const { Content } = Layout;
  const { t } = useTranslation();

  const menuItems = [
    {
      key: Routes.Users,
      content: (
        <>
          <TeamOutlined />
          <span>{t("setter.layouts.users.nav.users")}</span>
        </>
      ),
    },
    {
      key: Routes.Applications,
      content: (
        <>
          <ContainerOutlined />
          <span>{t("setter.layouts.users.nav.applications")}</span>
        </>
      ),
    },
    //    {
    //      key: Routes.Activities,
    //      content: (
    //        <>
    //          <BarsOutlined />
    //          <span>{t("setter.layouts.users.nav.activities")}</span>
    //        </>
    //      ),
    //    },
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems} />
      <Content>
        <Switch>
          <Route path={Routes.UsersDetails} component={userDetailsLayout} />
          <Route path={Routes.Applications} component={userApplications} />
          <Route path={Routes.Activities} component={userActivities} />
          <Route path="*" component={userListPage} />
        </Switch>
      </Content>
    </>
  );
}
