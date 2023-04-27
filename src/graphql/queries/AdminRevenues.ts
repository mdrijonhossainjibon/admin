/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminRevenues
// ====================================================

export interface AdminRevenues_adminRevenues_result_currency {
  __typename: "AdminCurrency";
  type: string;
  code: string;
}

export interface AdminRevenues_adminRevenues_result_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminRevenues_adminRevenues_result {
  __typename: "AdminOperation";
  id: number;
  code: string;
  currency: AdminRevenues_adminRevenues_result_currency;
  credit: string;
  debit: string;
  member: AdminRevenues_adminRevenues_result_member;
  account_kind: string;
  rid: string;
  reference_type: string;
  created_at: string;
}

export interface AdminRevenues_adminRevenues {
  __typename: "AdminOperationsPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminRevenues_adminRevenues_result[];
}

export interface AdminRevenues {
  adminRevenues: AdminRevenues_adminRevenues;
}

export interface AdminRevenuesVariables {
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
