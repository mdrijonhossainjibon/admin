/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserLabel
// ====================================================

export interface UpdateUserLabel_updateUserLabelValue {
  __typename: "AdminUser";
  uid: string | null;
}

export interface UpdateUserLabel {
  updateUserLabelValue: UpdateUserLabel_updateUserLabelValue | null;
}

export interface UpdateUserLabelVariables {
  _barong_session?: string | null;
  uid: string;
  key: string;
  value: string;
  scope: string;
}
