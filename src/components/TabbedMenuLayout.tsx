import React from "react";
import { Layout, Menu } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";

interface MenuItem {
  key: string;
  search?: string;
  content: string | number | React.ReactNode;
}

interface Props {
  items: MenuItem[];
}

export const sortMenuItems = (items: MenuItem[]) => {
  const compare = (a: MenuItem, b: MenuItem) => {
    if (a.key.length > b.key.length) return -1;
    if (a.key.length < b.key.length) return 1;
    return 0;
  };

  return Object.assign([] as MenuItem[], items).sort(compare);
};

export default function TabbedMenuLayout({ items }: Props) {
  const { Sider } = Layout;
  const history = useHistory();
  const location = useLocation();

  const menuItemOnClick = (i: MenuInfo) => {
    const item = items.find((el) => String(el.key) === String(i.key));
    if (item && item.search) {
      history.push({
        pathname: String(i.key),
        search: item.search,
      });
    } else {
      history.push(String(i.key));
    }
  };

  // sort items by descending key length to find the most matching route first
  const selectedKey = sortMenuItems(items).find((item) => location.pathname.includes(item.key))?.key;

  return (
    <Sider className="site-layout-background">
      <Menu mode="inline" selectedKeys={selectedKey ? [selectedKey] : undefined} onClick={menuItemOnClick}>
        {items.map((item) => (
          <Menu.Item key={item.key}>{item.content}</Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
