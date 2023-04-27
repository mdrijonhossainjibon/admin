/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminRestrictions
// ====================================================

export interface AdminRestrictions_adminRestrictions_result {
  __typename: "AdminRestriction";
  id: number;
  scope: string;
  state: string;
  category: string;
  value: string;
  code: number;
  created_at: string;
  updated_at: string;
}

export interface AdminRestrictions_adminRestrictions {
  __typename: "AdminRestrictionsPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminRestrictions_adminRestrictions_result[];
}

export interface AdminRestrictions {
  adminRestrictions: AdminRestrictions_adminRestrictions;
}

export interface AdminRestrictionsVariables {
  _barong_session?: string;
  page?: number;
  limit?: number;
}
