/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminBlockchainClientsList
// ====================================================

export interface AdminBlockchainClientsList_adminBlockchainClients {
  __typename: "AdminBlockchainClient";
  client: string;
}

export interface AdminBlockchainClientsList {
  adminBlockchainClients: AdminBlockchainClientsList_adminBlockchainClients[];
}

export interface AdminBlockchainClientsListVariables {
  _barong_session?: string;
}
