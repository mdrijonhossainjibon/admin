import React from "react";
import { Button, Layout, Menu, Space, Switch } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import {
  ApiOutlined,
  PoweroffOutlined,
  SwapOutlined,
  TeamOutlined,
  SettingOutlined,
  DashboardOutlined,
  FireOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "./context/auth-context";
import { useThemeContext } from "./context/theme-context";
import { Routes } from "../constants/routes";
import { MenuInfo } from "rc-menu/lib/interface";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { Footer, Header } = Layout;
  const { t } = useTranslation();
  const { authorized, logoutUser } = useAuthContext();
  const { theme, setTheme } = useThemeContext();
  const location = useLocation();
  const history = useHistory();

  const menuItems = [
    { key: Routes.Dashboard, icon: <DashboardOutlined />, text: t("setter.header.tabs.dashboard") },
    { key: Routes.Users, icon: <TeamOutlined />, text: t("setter.header.tabs.users") },
    { key: Routes.Operations, icon: <SwapOutlined />, text: t("setter.header.tabs.operations") },
    { key: Routes.Configuration, icon: <SettingOutlined />, text: t("setter.header.tabs.configuration") },
    { key: Routes.Restrictions, icon: <ApiOutlined />, text: t("setter.header.tabs.devops") },
  ];

  const menuItemOnClick = (e: MenuInfo) => {
    history.push(String(e.key));
  };

  const activeRoute = menuItems.find((item) => location.pathname.includes(item.key))?.key;

  return (
    <Layout className="setter-main-container">
      {authorized && (
        <Header className="setter-main-container-header">
          <div className="logo">Setter ASAP</div>

          <Menu
            theme="dark"
            className="setter-main-container-header-nav"
            mode="horizontal"
            onClick={menuItemOnClick}
            selectedKeys={activeRoute ? [activeRoute] : undefined}
          >
            {menuItems.map(({ key, icon, text }) => (
              <Menu.Item key={key} icon={icon}>
                {text}
              </Menu.Item>
            ))}
          </Menu>
          <Space>
            <Button
              type="primary"
              danger
              icon={<PoweroffOutlined />}
              onClick={logoutUser}
              className="setter-main-container-header-logout"
            >
              Logout
            </Button>
            <Switch
              checkedChildren={<FireOutlined />}
              unCheckedChildren={<BulbOutlined />}
              defaultChecked={theme !== "dark"}
              onChange={(v) => {
                setTheme(v ? "" : "dark");
              }}
            />
          </Space>
        </Header>
      )}
      <Layout>{children}</Layout>
      <Footer className="setter-main-footer">
        Powered by <a href="https://www.tunex.io">TuneX LLC</a> and{" "}
        <a href="https://digital-magic.io">Digital Magic Ltd</a>
      </Footer>
    </Layout>
  );
}
