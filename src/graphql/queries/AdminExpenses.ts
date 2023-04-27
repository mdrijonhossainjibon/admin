/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminExpenses
// ====================================================

export interface AdminExpenses_adminExpenses_result_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminExpenses_adminExpenses_result_member {
  __typename: "AdminUser";
  uid: string;
  role: string;
  email: string;
}

export interface AdminExpenses_adminExpenses_result {
  __typename: "AdminOperation";
  id: number;
  code: string;
  currency: AdminExpenses_adminExpenses_result_currency;
  credit: string;
  debit: string;
  member: AdminExpenses_adminExpenses_result_member;
  account_kind: string;
  rid: string;
  reference_type: string;
  created_at: string;
}

export interface AdminExpenses_adminExpenses {
  __typename: "AdminOperationsPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminExpenses_adminExpenses_result[];
}

export interface AdminExpenses {
  adminExpenses: AdminExpenses_adminExpenses;
}

export interface AdminExpensesVariables {
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
