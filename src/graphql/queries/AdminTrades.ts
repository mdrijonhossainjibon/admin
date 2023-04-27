/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminTrades
// ====================================================

export interface AdminTrades_adminTrades_result_market_base_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminTrades_adminTrades_result_market_quote_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminTrades_adminTrades_result_market {
  __typename: "AdminMarket";
  id: string;
  name: string;
  base_currency: AdminTrades_adminTrades_result_market_base_currency;
  quote_currency: AdminTrades_adminTrades_result_market_quote_currency;
  created_at: string;
  updated_at: string;
}

export interface AdminTrades_adminTrades_result_maker {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminTrades_adminTrades_result_taker {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminTrades_adminTrades_result {
  __typename: "AdminTrade";
  id: number;
  price: number;
  amount: number;
  total: number;
  market: AdminTrades_adminTrades_result_market;
  taker_type: string;
  maker: AdminTrades_adminTrades_result_maker;
  maker_fee_currency: string;
  maker_fee_amount: number;
  taker: AdminTrades_adminTrades_result_taker;
  taker_fee_currency: string;
  taker_fee_amount: number;
  created_at: string;
}

export interface AdminTrades_adminTrades {
  __typename: "AdminTradePaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminTrades_adminTrades_result[];
}

export interface AdminTrades {
  adminTrades: AdminTrades_adminTrades;
}

export interface AdminTradesVariables {
  _barong_session?: string;
  market?: string;
  uid?: string;
  range?: string;
  from?: string;
  to?: string;
  limit?: number;
  page?: number;
  ordering?: string;
  order_by?: string;
}
