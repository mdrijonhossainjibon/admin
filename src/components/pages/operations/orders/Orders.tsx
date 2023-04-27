import { useEffect, useState } from "react";
import { Button, PageHeader, Tabs } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { AdminOrdersGQL } from "../../../../graphql/Queries";
import { AdminOrders, AdminOrdersVariables } from "../../../../graphql/queries/AdminOrders";

import { useTranslation } from "react-i18next";
import { OrderFetchType, OrderState } from "../../../../constants/orders";
import OrderTable from "./OrderTable";
import { useQuery } from "../../../../graphql/hooks";
import { AdminDepositsVariables } from "../../../../graphql/queries/AdminDeposits";
import qs from "querystring";
import { useHistory } from "react-router-dom";

export default function Orders() {
  const [type, setType] = useState<OrderFetchType>(OrderFetchType.Open);
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.orders.${id}`);
  const history = useHistory();
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
  };

  const [filter, setFilter] = useState<AdminDepositsVariables | undefined>(query);

  const { data, loading, refetch } = useQuery<AdminOrders, AdminOrdersVariables>(AdminOrdersGQL, {
    variables: {
      ...filter,
      type: filter?.type,
      state: type === OrderFetchType.Open ? OrderState.Wait : undefined,
      ordering: "desc",
    },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => setFilter({}), [type]);

  const changeFilter = (filter: AdminOrdersVariables) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };

  const panes = [
    { tab: t("table.panes.open"), key: OrderFetchType.Open },
    { tab: t("table.panes.history"), key: OrderFetchType.History },
  ];

  const headerExtra = (
    <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
      {t("table.reload")}
    </Button>
  );

  return (
    <>
      <PageHeader
        className="setter-page-header"
        ghost={false}
        title={translate("setter.layouts.operations.nav.orders")}
        extra={headerExtra}
      >
        <Tabs defaultActiveKey={type} onChange={(key) => setType(key as OrderFetchType)}>
          {panes.map((pane) => (
            <Tabs.TabPane {...pane} />
          ))}
        </Tabs>

        <OrderTable
          changeFilter={changeFilter}
          orders={data?.adminOrders?.result || []}
          loading={false}
          filter={filter}
          openOrders={type === OrderFetchType.Open}
          total={data?.adminOrders?.page && filter?.limit && data?.adminOrders?.page * filter?.limit + 100}
        />
      </PageHeader>
    </>
  );
}
