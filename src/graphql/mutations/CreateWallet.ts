/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateWallet
// ====================================================

export interface CreateWallet_createWallet {
  __typename: "AdminWallet";
  id: number | null;
}

export interface CreateWallet {
  createWallet: CreateWallet_createWallet | null;
}

export interface CreateWalletVariables {
  _barong_session?: string | null;
  address?: string | null;
  blockchain_key?: string | null;
  currency?: string | null;
  gateway?: string | null;
  kind?: string | null;
  max_balance?: number | null;
  name?: string | null;
  settings?: string | null;
  enabled?: boolean | null;
}
