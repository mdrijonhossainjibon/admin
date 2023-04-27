/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminOrders
// ====================================================

export interface AdminOrders_adminOrders_result_market_base_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminOrders_adminOrders_result_market_quote_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminOrders_adminOrders_result_market {
  __typename: "AdminMarket";
  id: string;
  name: string;
  base_currency: AdminOrders_adminOrders_result_market_base_currency;
  quote_currency: AdminOrders_adminOrders_result_market_quote_currency;
  created_at: string;
  updated_at: string;
}

export interface AdminOrders_adminOrders_result_user {
  __typename: "AdminUser";
  uid: string;
  role: string;
  email: string;
}

export interface AdminOrders_adminOrders_result {
  __typename: "AdminOrder";
  id: number;
  uuid: string;
  side: string;
  ord_type: string;
  price: number;
  avg_price: number;
  state: string;
  market: AdminOrders_adminOrders_result_market;
  created_at: string;
  updated_at: string;
  origin_volume: number;
  remaining_volume: number;
  executed_volume: number;
  trades_count: number;
  user: AdminOrders_adminOrders_result_user;
}

export interface AdminOrders_adminOrders {
  __typename: "AdminOrderPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminOrders_adminOrders_result[];
}

export interface AdminOrders {
  adminOrders: AdminOrders_adminOrders;
}

export interface AdminOrdersVariables {
  _barong_session?: string;
  market?: string;
  state?: string;
  ord_type?: string;
  price?: number;
  origin_volume?: number;
  type?: string;
  email?: string;
  uid?: string;
  range?: string;
  from?: string;
  to?: string;
  limit?: number;
  page?: number;
  ordering?: string;
  order_by?: string;
}
