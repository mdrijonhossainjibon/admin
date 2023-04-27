import { useState } from "react";
import { PageHeader, Tabs, Button, Space } from "antd";
import { BlockchainRouteParams, Routes, RouteParams } from "../../../../../constants/routes";
import { ReloadOutlined } from "@ant-design/icons";
import { BlockchainSingleGQL } from "../../../../../graphql/Queries";
import { BlockchainSingle, BlockchainSingleVariables } from "../../../../../graphql/queries/BlockchainSingle";
import { useHistory, useLocation, useParams, Switch, Route, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BlockchainDetailsEdit from "./edit/BlockchainDetailsEdit";
import BlockchainDetailsMain from "./main/BlockchainDetailsMain";
import { useQuery } from "../../../../../graphql/hooks";

export default function BlockchainDetailsLayout() {
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams<RouteParams<BlockchainRouteParams>>();
  const { TabPane } = Tabs;
  const [selectedMenuItem, setSelectedMenuItem] = useState(location.pathname);

  const onChange = (key: string) => {
    setSelectedMenuItem(key);
    if (key !== location.pathname) {
      history.push(key);
    }
  };

  const { data, loading, refetch } = useQuery<BlockchainSingle, BlockchainSingleVariables>(BlockchainSingleGQL, {
    variables: { id: Number(id) },
    notifyOnNetworkStatusChange: true,
    pollInterval: 10000,
  });

  return (
    <>
      <PageHeader
        ghost={false}
        className="setter-page-header"
        onBack={() => history.goBack()}
        title={data?.adminBlockchain?.name}
        subTitle={data?.adminBlockchain?.key}
        extra={
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
            {t("setter.layouts.configurations.blockchains.table.reload")}
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Tabs defaultActiveKey={selectedMenuItem} onChange={onChange}>
            <TabPane
              tab={t("setter.layouts.configurations.blockchains.details.nav.main")}
              key={Routes.withParams.BlockchainsDetails({ id: Number(id) })}
            />
            <TabPane
              tab={t("setter.layouts.configurations.blockchains.details.nav.edit")}
              key={Routes.withParams.BlockchainsDetailsEdit({ id: Number(id) })}
            />
          </Tabs>

          <Switch>
            <Route
              path={Routes.BlockchainsDetailsEdit}
              render={() => <BlockchainDetailsEdit loading={false} data={data} />}
            />
            <Route
              path={Routes.BlockchainsDetails}
              render={() => <BlockchainDetailsMain loading={false} data={data} />}
            />
            <Redirect to={Routes.withParams.BlockchainsDetails({ id: Number(id) })} />
          </Switch>
        </Space>
      </PageHeader>
    </>
  );
}
