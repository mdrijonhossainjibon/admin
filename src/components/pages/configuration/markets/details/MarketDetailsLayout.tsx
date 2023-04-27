import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader, Tabs, Skeleton, Button, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { MarketRouteParams, RouteParams, Routes } from "../../../../../constants/routes";
import { useParams, useLocation, useHistory, Switch, Route, Redirect } from "react-router-dom";
import MarketDetailsMain from "./main/MarketDetailsMain";
import { useQuery } from "../../../../../graphql/hooks";
import { AdminMarket, AdminMarketVariables } from "../../../../../graphql/queries/AdminMarket";
import { AdminMarketGQL } from "../../../../../graphql/Queries";
import MarketsForm from "../form/MarketsForm";

export default function MarketDetailsLayout() {
  const { t } = useTranslation();

  const { id } = useParams<RouteParams<MarketRouteParams>>();
  const location = useLocation();
  const history = useHistory();

  const [selectedTab, setSelectedTab] = useState(location.pathname);

  const { data, loading, refetch } = useQuery<AdminMarket, AdminMarketVariables>(AdminMarketGQL, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
    pollInterval: 10000,
  });

  const market = data?.adminMarket;

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
        title={market?.name}
        extra={
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
            {t("setter.layouts.configurations.markets.table.reload")}
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Tabs defaultActiveKey={selectedTab} onChange={handleTabChange}>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.markets.details.nav.info")}
              key={Routes.withParams.MarketsDetails({ id })}
            />
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.markets.details.nav.edit")}
              key={Routes.withParams.MarketsDetailsEdit({ id })}
            />
          </Tabs>

          <Switch>
            <Route
              path={Routes.MarketsDetailsEdit}
              render={() => (
                <Skeleton paragraph={{ rows: 11 }} active loading={false}>
                  <MarketsForm
                    initialData={
                      market && {
                        ...market,
                        max_price: Number(market.max_price),
                        min_price: Number(market.min_price),
                        min_amount: Number(market.min_amount),
                        base_currency: market.base_unit,
                        quote_currency: market.quote_unit,
                      }
                    }
                  />
                </Skeleton>
              )}
            />
            <Route
              path={Routes.MarketsDetails}
              render={() => (
                <Skeleton loading={false} paragraph={{ rows: 9 }} active>
                  <MarketDetailsMain market={market!} />
                </Skeleton>
              )}
            />
            <Redirect to={Routes.withParams.MarketsDetails({ id })} />
          </Switch>
        </Space>
      </PageHeader>
    </>
  );
}
