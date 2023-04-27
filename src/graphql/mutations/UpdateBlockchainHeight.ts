/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateBlockchainHeight
// ====================================================

export interface UpdateBlockchainHeight_resetBlockchainHeight {
  __typename: "AdminBlockchain";
  id: number | null;
}

export interface UpdateBlockchainHeight {
  resetBlockchainHeight: UpdateBlockchainHeight_resetBlockchainHeight | null;
}

export interface UpdateBlockchainHeightVariables {
  _barong_session?: string | null;
  height?: number | null;
  id?: number | null;
}
