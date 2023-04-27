import { useState } from "react";
import { UserDetailsProps } from "../UserDetailsLayout";
import { Card, Typography } from "antd";
import WithdrawalTable from "../../../../operations/withdrawals/WithdrawalTable";
import { useQuery } from "../../../../../../graphql/hooks";
import { AdminDepositsGQL, AdminOrdersGQL, AdminTradesGQL, AdminWithdrawsGQL } from "../../../../../../graphql/Queries";
import { AdminWithdraws, AdminWithdrawsVariables } from "../../../../../../graphql/queries/AdminWithdraws";
import { AdminOrders, AdminOrdersVariables } from "../../../../../../graphql/queries/AdminOrders";
import { AdminDeposits, AdminDepositsVariables } from "../../../../../../graphql/queries/AdminDeposits";
import { AdminTrades, AdminTradesVariables } from "../../../../../../graphql/queries/AdminTrades";
import TradeTable from "../../../../operations/trades/TradeTable";
import OrderTable from "../../../../operations/orders/OrderTable";
import DepositTable from "../../../../operations/deposits/DepositTable";
import { useTranslation } from "react-i18next";

export default function UserDetailsHistory({ user }: UserDetailsProps) {
  console.log(user);
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.users.details.history.${id}`);

  const [depositfilter, setDepositFilter] = useState<AdminDepositsVariables | undefined>();
  const [withdrawsfilter, setWithdrawsFilter] = useState<AdminWithdrawsVariables | undefined>();
  const [ordersfilter, setOrdersFilter] = useState<AdminOrdersVariables | undefined>();
  const [tradesfilter, setTradesFilter] = useState<AdminTradesVariables | undefined>();

  const { data: withdrawals, loading: loadingWithdrawals } = useQuery<AdminWithdraws, AdminWithdrawsVariables>(
    AdminWithdrawsGQL,
    {
      variables: {
        ...withdrawsfilter,
        uid: user.uid,
        ordering: "desc"
      },
      pollInterval: 10000,
      notifyOnNetworkStatusChange: true,
    }
  );

  const { data: orders, loading: loadingOrders } = useQuery<AdminOrders, AdminOrdersVariables>(AdminOrdersGQL, {
    variables: {
      ...ordersfilter,
      uid: user.uid,
      type: ordersfilter?.type,
      ordering: "desc"
    },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const { data: deposits, loading: loadingDeposits } = useQuery<AdminDeposits, AdminDepositsVariables>(
    AdminDepositsGQL,
    {
      variables: { ...depositfilter, uid: user.uid, ordering: "desc" },
      pollInterval: 10000,
      notifyOnNetworkStatusChange: true,
    }
  );

  const { data: trades, loading: loadingTrades } = useQuery<AdminTrades, AdminTradesVariables>(AdminTradesGQL, {
    variables: {
      ...tradesfilter,
      uid: user.uid,
      ordering: "desc"
    },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const changeDepositFilter = (filter: AdminDepositsVariables) => {
    setDepositFilter(filter);
  };

  const changeWithdrawalFilter = (filter: AdminWithdrawsVariables) => {
    setWithdrawsFilter(filter);
  };

  const changeOrdersFilter = (filter: AdminOrdersVariables) => {
    setOrdersFilter(filter);
  };

  const changeTradesFilter = (filter: AdminTradesVariables) => {
    setTradesFilter(filter);
  };

  return (
    <>
      <Card className="setter-details-card">
        <Typography.Title level={4}>{t("trades")}</Typography.Title>
        <TradeTable
          trades={trades?.adminTrades?.result || []}
          loading={loadingTrades}
          changeFilter={changeTradesFilter}
          filter={tradesfilter}
          userId={user.uid}
        />
      </Card>
      <Card className="setter-details-card">
        <Typography.Title level={4}>{t("orders")}</Typography.Title>
        <OrderTable
          orders={orders?.adminOrders?.result || []}
          loading={loadingOrders}
          changeFilter={changeOrdersFilter}
          filter={ordersfilter}
        />
      </Card>
      <Card className="setter-details-card">
        <Typography.Title level={4}>{t("deposits")}</Typography.Title>
        <DepositTable
          deposits={deposits?.adminDeposits?.result || []}
          loading={loadingDeposits}
          changeFilter={changeDepositFilter}
          total={deposits?.adminDeposits.total}
          filter={depositfilter}
        />
      </Card>
      <Card className="setter-details-card">
        <Typography.Title level={4}>{t("withdrawals")}</Typography.Title>
        <WithdrawalTable
          withdrawals={withdrawals?.adminWithdraws?.result || []}
          loading={loadingWithdrawals}
          changeFilter={changeWithdrawalFilter}
          filter={withdrawsfilter}
        />
      </Card>
    </>
  );
}
