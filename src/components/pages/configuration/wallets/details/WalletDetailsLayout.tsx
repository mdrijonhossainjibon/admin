import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Empty, PageHeader, Skeleton, Tabs, Button, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { RouteParams, Routes, WalletRouteParams } from "../../../../../constants/routes";
import { useHistory, useLocation, useParams, Switch, Route, Redirect } from "react-router-dom";
import WalletDetailsMain from "./main/WalletDetailsMain";
import { useQuery } from "../../../../../graphql/hooks";
import { AdminWalletGQL } from "../../../../../graphql/Queries";
import { AdminWallet, AdminWalletVariables } from "../../../../../graphql/queries/AdminWallet";
import WalletsForm from "../form/WalletsForm";

export default function WalletDetailsLayout() {
  const { t } = useTranslation();

  const { id } = useParams<RouteParams<WalletRouteParams>>();
  const location = useLocation();
  const history = useHistory();

  const [selectedTab, setSelectedTab] = useState(location.pathname);

  const { data, loading, refetch } = useQuery<AdminWallet, AdminWalletVariables>(AdminWalletGQL, {
    variables: { id: Number(id) },
    notifyOnNetworkStatusChange: true,
    pollInterval: 10000,
  });

  const wallet = data?.adminWallet;

  const handleTabChange = (key: string) => {
    setSelectedTab(String(key));

    if (String(key) !== location.pathname) {
      history.replace(String(key));
    }
  };

  return (
    <>
      <PageHeader
        ghost={false}
        className="setter-page-header"
        onBack={() => history.goBack()}
        title={wallet?.name}
        extra={
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
            {t("setter.layouts.configurations.wallets.table.reload")}
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Tabs defaultActiveKey={selectedTab} onChange={handleTabChange}>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.wallets.details.nav.info")}
              key={Routes.withParams.WalletsDetails({ id: Number(id) })}
            />
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.wallets.details.nav.edit")}
              key={Routes.withParams.WalletsDetailsEdit({ id: Number(id) })}
            />
          </Tabs>
          <Switch>
            <Route
              path={Routes.WalletsDetailsEdit}
              render={() => (
                <Skeleton paragraph={{ rows: 20 }} loading={false}>
                  <WalletsForm initialData={wallet} onCompleted={refetch} />
                </Skeleton>
              )}
            />
            <Route
              path={Routes.WalletsDetails}
              render={() => (
                <Skeleton paragraph={{ rows: 12 }} loading={false}>
                  {wallet ? <WalletDetailsMain wallet={wallet} /> : <Empty />}
                </Skeleton>
              )}
            />
            <Redirect to={Routes.withParams.WalletsDetails({ id: Number(id) })} />
          </Switch>
        </Space>
      </PageHeader>
    </>
  );
}
