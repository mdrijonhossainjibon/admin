/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminBlockchains
// ====================================================

export interface AdminBlockchains_adminBlockchains {
  __typename: "AdminBlockchain";
  id: number;
  key: string;
  name: string;
  client: string;
  height: number;
  created_at: string;
  enabled: boolean;
  server: string;
  explorer_address: string;
  explorer_transaction: string;
  min_confirmations: number;
}

export interface AdminBlockchains {
  adminBlockchains: AdminBlockchains_adminBlockchains[];
}

export interface AdminBlockchainsVariables {
  _barong_session?: string;
}
