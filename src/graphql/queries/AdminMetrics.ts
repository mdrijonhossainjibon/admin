/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminMetrics
// ====================================================

export interface AdminMetrics_adminMetrics {
  __typename: "AdminMetrics";
  usersTotal: number;
  users24H: number;
  depositsTotal: number;
  deposits24H: number;
  withdrawsTotal: number;
  withdraws24H: number;
  tradesTotal: number;
  trades24H: number;
  ordersTotal: number;
  ordersTotalPending: number;
  orders24H: number;
  orders24HFilled: number;
  orders24HPartialFilled: number;
}

export interface AdminMetrics {
  adminMetrics: AdminMetrics_adminMetrics;
}

export interface AdminMetricsVariables {
  _barong_session?: string;
}
