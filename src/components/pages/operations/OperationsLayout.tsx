import { Suspense, lazy } from "react";
import { Layout, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { Routes } from "../../../constants/routes";
import {
  AuditOutlined,
  PieChartOutlined,
  DownloadOutlined,
  UploadOutlined,
  FieldTimeOutlined,
  TransactionOutlined,
  ControlOutlined,
} from "@ant-design/icons";

import TabbedMenuLayout from "../../TabbedMenuLayout";
import { Switch, Route, Redirect } from "react-router-dom";

const deposits = lazy(() => import("./deposits/Deposits"));
const depositsDetails = lazy(() => import("./deposits/depositDetails/DepositDetails"));
const withdrawals = lazy(() => import("./withdrawals/Withdrawals"));
const withdrawalDetails = lazy(() => import("./withdrawals/WithdrawalDetails"));
const pendingWithdrawals = lazy(() => import("./pending-withdrawals/PendingWithdrawals"));
const adjustments = lazy(() => import("./adjustments/Adjustments"));
const adjustmentDetails = lazy(() => import("./adjustments/AdjustmentDetails"));
const orders = lazy(() => import("./orders/Orders"));
const trades = lazy(() => import("./trades/Trades"));
const businessAnalytics = lazy(() => import("./business-analytics/BusinessAnalytics"));

export default function OperationsLayout() {
  const { Content } = Layout;
  const { t } = useTranslation();

  const menuItems = [
    {
      key: Routes.Deposits,
      content: (
        <>
          <DownloadOutlined />
          <span>{t("setter.layouts.operations.nav.deposits")}</span>
        </>
      ),
    },
    {
      key: Routes.Withdrawals,
      content: (
        <>
          <UploadOutlined />
          <span>{t("setter.layouts.operations.nav.withdrawals")}</span>
        </>
      ),
    },
    {
      key: Routes.PendingWithdrawals,
      content: (
        <>
          <FieldTimeOutlined />
          <span>{t("setter.layouts.operations.nav.pendingWithdrawals")}</span>
        </>
      ),
    },
    {
      key: Routes.Adjustments,
      content: (
        <>
          <ControlOutlined />
          <span>{t("setter.layouts.operations.nav.adjustments")}</span>
        </>
      ),
    },
    {
      key: Routes.Orders,
      content: (
        <>
          <AuditOutlined />
          <span>{t("setter.layouts.operations.nav.orders")}</span>
        </>
      ),
    },
    {
      key: Routes.Trades,
      content: (
        <>
          <TransactionOutlined />
          <span>{t("setter.layouts.operations.nav.trades")}</span>
        </>
      ),
    },
    {
      key: Routes.BusinessAnalytics,
      content: (
        <>
          <PieChartOutlined />
          <span>{t("setter.layouts.operations.nav.businessAnalytics")}</span>
        </>
      ),
    },
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems} />
      <Content>
        <Suspense
          fallback={
            <div className="spinner-container">
              <Spin size="large" className="setter-spinner-centered" />
            </div>
          }
        >
          <Switch>
            <Route path={Routes.DepositsDetails} component={depositsDetails} />
            <Route path={Routes.Deposits} component={deposits} />
            <Route path={Routes.WithdrawalDetails} component={withdrawalDetails} />
            <Route path={Routes.Withdrawals} component={withdrawals} />
            <Route path={Routes.PendingWithdrawals} component={pendingWithdrawals} />
            <Route path={Routes.AdjustmentDetails} component={adjustmentDetails} />
            <Route path={Routes.Adjustments} component={adjustments} />
            <Route path={Routes.Orders} component={orders} />
            <Route path={Routes.Trades} component={trades} />
            <Route path={Routes.BusinessAnalytics} component={businessAnalytics} />
            <Redirect to={Routes.Deposits} />
          </Switch>
        </Suspense>
      </Content>
    </>
  );
}
