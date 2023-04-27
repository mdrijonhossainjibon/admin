/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMarket
// ====================================================

export interface CreateMarket_createMarket {
  __typename: "AdminMarket";
  id: string | null;
}

export interface CreateMarket {
  createMarket: CreateMarket_createMarket | null;
}

export interface CreateMarketVariables {
  _barong_session?: string | null;
  amount_precision?: number | null;
  base_currency?: string | null;
  max_price?: number | null;
  min_amount?: number | null;
  min_price?: number | null;
  position?: number | null;
  price_precision?: number | null;
  quote_currency?: string | null;
  enabled?: boolean | null;
}
