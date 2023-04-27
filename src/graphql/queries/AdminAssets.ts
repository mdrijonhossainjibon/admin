/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminAssets
// ====================================================

export interface AdminAssets_adminAssets_result_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminAssets_adminAssets_result_member {
  __typename: "AdminUser";
  uid: string;
  role: string;
  email: string;
}

export interface AdminAssets_adminAssets_result {
  __typename: "AdminOperation";
  id: number;
  code: string;
  currency: AdminAssets_adminAssets_result_currency;
  credit: string;
  debit: string;
  member: AdminAssets_adminAssets_result_member;
  account_kind: string;
  rid: string;
  reference_type: string;
  created_at: string;
}

export interface AdminAssets_adminAssets {
  __typename: "AdminOperationsPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminAssets_adminAssets_result[];
}

export interface AdminAssets {
  adminAssets: AdminAssets_adminAssets;
}

export interface AdminAssetsVariables {
  _barong_session?: string;
  reference_type?: string;
  rid?: number;
  code?: number;
  currency?: string;
  range?: string;
  from?: string;
  to?: string;
  limit?: number;
  page?: number;
  ordering?: string;
  order_by?: string;
}
