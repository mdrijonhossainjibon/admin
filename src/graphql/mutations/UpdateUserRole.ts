/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserRole
// ====================================================

export interface UpdateUserRole_updateUserRole {
  __typename: "AdminUser";
  uid: string | null;
}

export interface UpdateUserRole {
  updateUserRole: UpdateUserRole_updateUserRole | null;
}

export interface UpdateUserRoleVariables {
  _barong_session?: string | null;
  uid?: string | null;
  role?: string | null;
}
