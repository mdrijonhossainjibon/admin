import { useState } from "react";
import { useQuery } from "../../../../graphql/hooks";
import { AdminTradesGQL } from "../../../../graphql/Queries";
import { AdminTrades, AdminTradesVariables } from "../../../../graphql/queries/AdminTrades";
import TradeTable from "./TradeTable";
import { Button, PageHeader } from "antd";
import { useTranslation } from "react-i18next";
import { AdminDepositsVariables } from "../../../../graphql/queries/AdminDeposits";
import { useHistory } from "react-router-dom";
import qs from "querystring";
import { ReloadOutlined } from "@ant-design/icons";

export default function Trades() {
  const { t } = useTranslation();

  const history = useHistory();

  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
  };
  const [filter, setFilter] = useState<AdminTradesVariables | undefined>(query);

  const { data, loading, refetch } = useQuery<AdminTrades, AdminTradesVariables>(AdminTradesGQL, {
    variables: { ...filter, ordering: "desc" },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const changeFilter = (filter: AdminDepositsVariables) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };

  return (
    <>
      <PageHeader
        title={t("setter.layouts.operations.nav.trades")}
        ghost={false}
        className="setter-page-header"
        extra={[
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
            {t("reload")}
          </Button>,
        ]}
      >
        <TradeTable
          trades={data?.adminTrades?.result || []}
          loading={loading}
          changeFilter={changeFilter}
          filter={filter}
          total={data?.adminTrades?.page && filter?.limit && data?.adminTrades?.page * filter?.limit + 100}
        />
      </PageHeader>
    </>
  );
}
