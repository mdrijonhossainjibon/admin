/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminPermissions
// ====================================================

export interface AdminPermissions_adminPermissions_result {
  __typename: "AdminPermission";
  id: number;
  action: string;
  path: string;
  role: string;
  topic: string;
  verb: string;
  created_at: string;
  updated_at: string;
}

export interface AdminPermissions_adminPermissions {
  __typename: "AdminPermissionsPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminPermissions_adminPermissions_result[];
}

export interface AdminPermissions {
  adminPermissions: AdminPermissions_adminPermissions;
}

export interface AdminPermissionsVariables {
  _barong_session?: string;
  page?: number;
  limit?: number;
}
