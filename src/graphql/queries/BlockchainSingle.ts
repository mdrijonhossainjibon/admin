/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlockchainSingle
// ====================================================

export interface BlockchainSingle_adminBlockchain_currencies {
  __typename: "AdminCurrency";
  code: string;
  name: string;
  visible: boolean;
}

export interface BlockchainSingle_adminBlockchain {
  __typename: "AdminBlockchain";
  id: number;
  client: string;
  explorer_address: string;
  explorer_transaction: string;
  height: number;
  key: string;
  min_confirmations: number;
  name: string;
  server: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  currencies: BlockchainSingle_adminBlockchain_currencies[];
}

export interface BlockchainSingle {
  adminBlockchain: BlockchainSingle_adminBlockchain;
}

export interface BlockchainSingleVariables {
  _barong_session?: string;
  id: number;
}
