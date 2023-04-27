/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMarket
// ====================================================

export interface UpdateMarket_updateMarket {
  __typename: "AdminMarket";
  id: string | null;
}

export interface UpdateMarket {
  updateMarket: UpdateMarket_updateMarket | null;
}

export interface UpdateMarketVariables {
  _barong_session?: string | null;
  id?: string | null;
  max_price?: number | null;
  min_amount?: number | null;
  min_price?: number | null;
  position?: number | null;
  enabled?: boolean | null;
}
