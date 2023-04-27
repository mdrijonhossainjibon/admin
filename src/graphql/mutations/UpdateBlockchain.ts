/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateBlockchain
// ====================================================

export interface UpdateBlockchain_updateBlockchain {
  __typename: "AdminBlockchain";
  id: number | null;
}

export interface UpdateBlockchain {
  updateBlockchain: UpdateBlockchain_updateBlockchain | null;
}

export interface UpdateBlockchainVariables {
  _barong_session?: string | null;
  id?: number | null;
  key?: string | null;
  name?: string | null;
  client?: string | null;
  explorer_transaction?: string | null;
  explorer_address?: string | null;
  server?: string | null;
  enabled?: boolean | null;
  min_confirmations?: number | null;
}
