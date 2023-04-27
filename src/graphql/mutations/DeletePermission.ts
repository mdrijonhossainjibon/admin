/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePermission
// ====================================================

export interface DeletePermission_adminDeletePermission {
  __typename: "SimpleResponse";
  data: string | null;
}

export interface DeletePermission {
  adminDeletePermission: DeletePermission_adminDeletePermission | null;
}

export interface DeletePermissionVariables {
  _barong_session?: string | null;
  id?: number | null;
}
