/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminCurrencySingle
// ====================================================

export interface AdminCurrencySingle_adminCurrency_options {
  __typename: "KeyValue";
  key: string;
  value: string;
}

export interface AdminCurrencySingle_adminCurrency_markets {
  __typename: "AdminMarket";
  id: string;
  enabled: boolean;
  name: string;
  quote_unit: string;
  base_unit: string;
}

export interface AdminCurrencySingle_adminCurrency_blockchain_currencies_wallets_settings {
  __typename: "AdminWalletSettings";
  uri: string;
}

export interface AdminCurrencySingle_adminCurrency_blockchain_currencies_wallets {
  __typename: "AdminWallet";
  id: number;
  currency_code: string;
  kind: string;
  name: string;
  enabled: boolean;
  address: string;
  blockchain_key: string;
  settings: AdminCurrencySingle_adminCurrency_blockchain_currencies_wallets_settings;
  gateway: string;
}

export interface AdminCurrencySingle_adminCurrency_blockchain_currencies {
  __typename: "AdminCurrency";
  name: string;
  code: string;
  wallets: AdminCurrencySingle_adminCurrency_blockchain_currencies_wallets[];
}

export interface AdminCurrencySingle_adminCurrency_blockchain {
  __typename: "AdminBlockchain";
  id: number;
  client: string;
  key: string;
  name: string;
  server: string;
  enabled: boolean;
  height: number;
  currencies: AdminCurrencySingle_adminCurrency_blockchain_currencies[];
}

export interface AdminCurrencySingle_adminCurrency_wallets {
  __typename: "AdminWallet";
  id: number;
  currency_code: string;
  kind: string;
  name: string;
  enabled: boolean;
  address: string;
}

export interface AdminCurrencySingle_adminCurrency {
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
  subunits: number;
  position: number;
  icon_url: string;
  options: AdminCurrencySingle_adminCurrency_options[];
  min_confirmations: number;
  created_at: string;
  visible: boolean;
  blockchain_key: string;
  updated_at: string;
  markets: AdminCurrencySingle_adminCurrency_markets[];
  blockchain: AdminCurrencySingle_adminCurrency_blockchain;
  wallets: AdminCurrencySingle_adminCurrency_wallets[];
}

export interface AdminCurrencySingle {
  adminCurrency: AdminCurrencySingle_adminCurrency;
}

export interface AdminCurrencySingleVariables {
  _barong_session?: string;
  code: string;
}
