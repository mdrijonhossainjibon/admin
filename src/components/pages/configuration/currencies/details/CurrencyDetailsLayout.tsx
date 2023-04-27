import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, PageHeader, Tabs, Skeleton, Space } from "antd";
import { CurrencyRouteParams, RouteParams, Routes } from "../../../../../constants/routes";
import { ReloadOutlined } from "@ant-design/icons";
import { useQuery } from "../../../../../graphql/hooks";
import { AdminCurrencySingleGQL } from "../../../../../graphql/Queries";
import { useParams, useLocation, useHistory, Switch, Route, Redirect } from "react-router-dom";
import CurrencyDetailsEdit from "./edit/CurrencyDetailsEdit";
import CurrencyDetailsMain from "./main/CurrencyDetailsMain";
import { AdminCurrencySingleVariables, AdminCurrencySingle } from "../../../../../graphql/queries/AdminCurrencySingle";

export default function CurrencyDetailsLayout() {
  const { t } = useTranslation();

  const { code } = useParams<RouteParams<CurrencyRouteParams>>();
  const location = useLocation();
  const history = useHistory();

  const [selectedTab, setSelectedTab] = useState(location.pathname);

  const { data, loading, refetch } = useQuery<AdminCurrencySingle, AdminCurrencySingleVariables>(
    AdminCurrencySingleGQL,
    {
      variables: { code },
      notifyOnNetworkStatusChange: true,
      pollInterval: 10000,
    }
  );

  const currency = data?.adminCurrency;

  const handleTabChange = (key: string) => {
    refetch();
    setSelectedTab(key);

    if (key !== location.pathname) {
      history.push(key);
    }
  };

  return (
    <>
      <PageHeader
        className="setter-page-header"
        ghost={false}
        onBack={() => history.goBack()}
        title={currency?.name}
        subTitle={currency?.code?.toUpperCase()}
        extra={[
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
            {t("setter.layouts.configurations.currencies.table.reload")}
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Tabs onChange={handleTabChange} activeKey={selectedTab}>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.currencies.details.nav.main")}
              key={Routes.withParams.CurrenciesDetails({ code })}
            />
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.currencies.details.nav.edit")}
              key={Routes.withParams.CurrenciesDetailsEdit({ code })}
            />
          </Tabs>
          <Switch>
            <Route
              path={Routes.CurrenciesDetailsEdit}
              render={() => (
                <Skeleton loading={false} active paragraph={{ rows: 24 }}>
                  {currency && <CurrencyDetailsEdit toInfo={handleTabChange} initialData={currency} />}
                </Skeleton>
              )}
            />
            <Route
              path={Routes.CurrenciesDetails}
              render={() => (
                <Skeleton loading={false} active paragraph={{ rows: 9 }}>
                  {currency && <CurrencyDetailsMain currency={currency} />}
                </Skeleton>
              )}
            />
            <Redirect to={Routes.withParams.CurrenciesDetails({ code })} />
          </Switch>
        </Space>
      </PageHeader>
    </>
  );
}
