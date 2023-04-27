/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCurrency
// ====================================================

export interface UpdateCurrency_updateCurrency {
  __typename: "AdminCurrency";
  code: string | null;
}

export interface UpdateCurrency {
  updateCurrency: UpdateCurrency_updateCurrency | null;
}

export interface UpdateCurrencyVariables {
  _barong_session?: string | null;
  blockchain_key?: string | null;
  code?: string | null;
  deposit_enabled?: boolean | null;
  deposit_fee?: number | null;
  icon_url?: string | null;
  min_collection_amount?: number | null;
  min_deposit_amount?: number | null;
  min_withdraw_amount?: number | null;
  name?: string | null;
  options?: string | null;
  position?: number | null;
  precision?: number | null;
  subunits?: number | null;
  symbol?: string | null;
  type?: string | null;
  visible?: boolean | null;
  withdraw_fee?: number | null;
  withdraw_limit_24h?: number | null;
  withdraw_limit_72h?: number | null;
  withdrawal_enabled?: boolean | null;
}
