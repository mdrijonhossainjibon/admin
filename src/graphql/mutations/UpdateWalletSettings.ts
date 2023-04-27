/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateWalletSettings
// ====================================================

export interface UpdateWalletSettings_updateWalletSettings {
  __typename: "AdminWallet";
  id: number | null;
}

export interface UpdateWalletSettings {
  updateWalletSettings: UpdateWalletSettings_updateWalletSettings | null;
}

export interface UpdateWalletSettingsVariables {
  _barong_session?: string | null;
  id?: number | null;
  settings?: string | null;
}
