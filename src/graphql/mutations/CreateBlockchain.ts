/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBlockchain
// ====================================================

export interface CreateBlockchain_createBlockchain {
  __typename: "AdminBlockchain";
  id: number | null;
}

export interface CreateBlockchain {
  createBlockchain: CreateBlockchain_createBlockchain | null;
}

export interface CreateBlockchainVariables {
  _barong_session?: string | null;
  key?: string | null;
  name?: string | null;
  client?: string | null;
  height?: number | null;
  explorer_transaction?: string | null;
  explorer_address?: string | null;
  server?: string | null;
  enabled?: boolean | null;
  min_confirmations?: number | null;
}
