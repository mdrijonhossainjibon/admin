/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePermission
// ====================================================

export interface CreatePermission_adminCreatePermission {
  __typename: "SimpleResponse";
  data: string | null;
}

export interface CreatePermission {
  adminCreatePermission: CreatePermission_adminCreatePermission | null;
}

export interface CreatePermissionVariables {
  _barong_session?: string | null;
  role?: string | null;
  verb?: string | null;
  path?: string | null;
  topic?: string | null;
  action?: string | null;
}
