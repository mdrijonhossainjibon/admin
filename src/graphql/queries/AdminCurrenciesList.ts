/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminCurrenciesList
// ====================================================

export interface AdminCurrenciesList_adminCurrencies_options {
  __typename: "KeyValue";
  key: string;
  value: string;
}

export interface AdminCurrenciesList_adminCurrencies {
  __typename: "AdminCurrency";
  code: string;
  name: string;
  symbol: string;
  explorer_transaction: string;
  explorer_address: string;
  type: string;
  deposit_enabled: boolean;
  withdrawal_enabled: boolean;
  deposit_fee: string;
  min_deposit_amount: string;
  withdraw_fee: string;
  min_withdraw_amount: string;
  withdraw_limit_24h: string;
  withdraw_limit_72h: string;
  base_factor: string;
  precision: number;
  position: number;
  icon_url: string;
  options: AdminCurrenciesList_adminCurrencies_options[];
  min_confirmations: number;
  created_at: string;
  visible: boolean;
}

export interface AdminCurrenciesList {
  adminCurrencies: AdminCurrenciesList_adminCurrencies[];
}

export interface AdminCurrenciesListVariables {
  _barong_session?: string;
}
