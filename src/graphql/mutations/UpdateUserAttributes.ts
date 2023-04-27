/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserAttributes
// ====================================================

export interface UpdateUserAttributes_updateUserAttributes {
  __typename: "AdminUser";
  uid: string | null;
}

export interface UpdateUserAttributes {
  updateUserAttributes: UpdateUserAttributes_updateUserAttributes | null;
}

export interface UpdateUserAttributesVariables {
  _barong_session?: string | null;
  uid?: string | null;
  state?: string | null;
  otp?: boolean | null;
}
