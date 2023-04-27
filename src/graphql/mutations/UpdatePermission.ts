/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePermission
// ====================================================

export interface UpdatePermission_adminUpdatePermission {
  __typename: "SimpleResponse";
  data: string | null;
}

export interface UpdatePermission {
  adminUpdatePermission: UpdatePermission_adminUpdatePermission | null;
}

export interface UpdatePermissionVariables {
  _barong_session?: string | null;
  id?: number | null;
  role?: string | null;
  verb?: string | null;
  path?: string | null;
  topic?: string | null;
  action?: string | null;
}
