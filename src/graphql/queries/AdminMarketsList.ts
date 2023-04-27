/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminMarketsList
// ====================================================

export interface AdminMarketsList_adminMarkets_base_currency {
  __typename: "AdminCurrency";
  name: string;
}

export interface AdminMarketsList_adminMarkets_quote_currency {
  __typename: "AdminCurrency";
  name: string;
}

export interface AdminMarketsList_adminMarkets {
  __typename: "AdminMarket";
  amount_precision: number;
  base_unit: string;
  created_at: string;
  id: string;
  max_price: string;
  min_amount: string;
  min_price: string;
  name: string;
  position: number;
  price_precision: number;
  quote_unit: string;
  enabled: boolean;
  updated_at: string;
  base_currency: AdminMarketsList_adminMarkets_base_currency;
  quote_currency: AdminMarketsList_adminMarkets_quote_currency;
}

export interface AdminMarketsList {
  adminMarkets: AdminMarketsList_adminMarkets[];
}

export interface AdminMarketsListVariables {
  _barong_session?: string;
}
