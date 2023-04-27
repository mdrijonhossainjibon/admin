/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTradingFee
// ====================================================

export interface CreateTradingFee_createTradingFee {
  __typename: "AdminBlockchain";
  id: number | null;
}

export interface CreateTradingFee {
  createTradingFee: CreateTradingFee_createTradingFee | null;
}

export interface CreateTradingFeeVariables {
  _barong_session?: string | null;
  group?: string | null;
  market_id?: string | null;
  maker?: number | null;
  taker?: number | null;
}
