/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateWallet
// ====================================================

export interface UpdateWallet_updateWallet {
  __typename: "AdminWallet";
  id: number | null;
}

export interface UpdateWallet {
  updateWallet: UpdateWallet_updateWallet | null;
}

export interface UpdateWalletVariables {
  _barong_session?: string | null;
  id?: number | null;
  address?: string | null;
  blockchain_key?: string | null;
  currency?: string | null;
  gateway?: string | null;
  kind?: string | null;
  max_balance?: number | null;
  name?: string | null;
  enabled?: boolean | null;
}
