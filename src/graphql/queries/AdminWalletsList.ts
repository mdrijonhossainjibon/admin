/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminWalletsList
// ====================================================

export interface AdminWalletsList_adminWallets_result_settings {
  __typename: "AdminWalletSettings";
  uri: string;
  secret: string;
  access_token: string;
  testnet: boolean;
  wallet_id: string;
}

export interface AdminWalletsList_adminWallets_result_currency {
  __typename: "AdminCurrency";
  type: string;
  code: string;
  name: string;
  explorer_address: string;
}

export interface AdminWalletsList_adminWallets_result {
  __typename: "AdminWallet";
  address: string;
  blockchain_key: string;
  currency_code: string;
  gateway: string;
  id: number;
  kind: string;
  max_balance: string;
  name: string;
  settings: AdminWalletsList_adminWallets_result_settings;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  currency: AdminWalletsList_adminWallets_result_currency;
}

export interface AdminWalletsList_adminWallets {
  __typename: "AdminWalletPaginated";
  total: number;
  page: number;
  perPage: number;
  result: AdminWalletsList_adminWallets_result[];
}

export interface AdminWalletsList {
  adminWallets: AdminWalletsList_adminWallets;
}

export interface AdminWalletsListVariables {
  _barong_session?: string;
  kind?: string;
  currency?: string;
  limit?: number;
  page?: number;
}
