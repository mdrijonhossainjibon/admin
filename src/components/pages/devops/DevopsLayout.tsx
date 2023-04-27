import { lazy } from "react";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { Routes } from "../../../constants/routes";
import { ExceptionOutlined, FileDoneOutlined } from "@ant-design/icons";
import TabbedMenuLayout from "../../TabbedMenuLayout";
import { Switch, Route } from "react-router-dom";

const restrictions = lazy(() => import("./restrictions/Restrictions"));
const userPermissions = lazy(() => import("./user-permissions/UserPermissions"));

export default function DevopsLayout() {
  const { Content } = Layout;
  const { t } = useTranslation();

  const menuItems = [
    {
      key: Routes.Restrictions,
      content: (
        <>
          <FileDoneOutlined />
          <span>{t("setter.layouts.devops.nav.restrictions")}</span>
        </>
      ),
    },
    {
      key: Routes.UserPermissions,
      content: (
        <>
          <ExceptionOutlined />
          <span>{t("setter.layouts.devops.nav.userPermissions")}</span>
        </>
      ),
    },
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems} />
      <Content>
        <Switch>
          <Route path={Routes.UserPermissions} component={userPermissions} />
          <Route path="*" component={restrictions} />
        </Switch>
      </Content>
    </>
  );
}
