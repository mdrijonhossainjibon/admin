/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUserLabel
// ====================================================

export interface CreateUserLabel_createUserLabel {
  __typename: "AdminUser";
  uid: string | null;
}

export interface CreateUserLabel {
  createUserLabel: CreateUserLabel_createUserLabel | null;
}

export interface CreateUserLabelVariables {
  _barong_session?: string | null;
  uid: string;
  key: string;
  value: string;
  scope?: string | null;
}
