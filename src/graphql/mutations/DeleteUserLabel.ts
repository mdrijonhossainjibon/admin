/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUserLabel
// ====================================================

export interface DeleteUserLabel_deleteUserLabel {
  __typename: "AdminUser";
  uid: string | null;
}

export interface DeleteUserLabel {
  deleteUserLabel: DeleteUserLabel_deleteUserLabel | null;
}

export interface DeleteUserLabelVariables {
  _barong_session?: string | null;
  uid: string;
  key: string;
  scope: string;
}
