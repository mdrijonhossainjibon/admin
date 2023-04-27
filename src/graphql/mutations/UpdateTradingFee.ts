/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTradingFee
// ====================================================

export interface UpdateTradingFee_updateTradingFee {
  __typename: "AdminBlockchain";
  id: number | null;
}

export interface UpdateTradingFee {
  updateTradingFee: UpdateTradingFee_updateTradingFee | null;
}

export interface UpdateTradingFeeVariables {
  _barong_session?: string | null;
  id?: number | null;
  group?: string | null;
  market_id?: string | null;
  maker?: number | null;
  taker?: number | null;
}
