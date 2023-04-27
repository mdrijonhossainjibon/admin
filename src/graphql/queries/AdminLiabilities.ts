/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminLiabilities
// ====================================================

export interface AdminLiabilities_adminLiabilities_result_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminLiabilities_adminLiabilities_result_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminLiabilities_adminLiabilities_result {
  __typename: "AdminOperation";
  id: number;
  code: string;
  currency: AdminLiabilities_adminLiabilities_result_currency;
  credit: string;
  debit: string;
  member: AdminLiabilities_adminLiabilities_result_member;
  account_kind: string;
  rid: string;
  reference_type: string;
  created_at: string;
}

export interface AdminLiabilities_adminLiabilities {
  __typename: "AdminOperationsPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminLiabilities_adminLiabilities_result[];
}

export interface AdminLiabilities {
  adminLiabilities: AdminLiabilities_adminLiabilities;
}

export interface AdminLiabilitiesVariables {
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
