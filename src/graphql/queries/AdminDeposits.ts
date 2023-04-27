/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminDeposits
// ====================================================

export interface AdminDeposits_adminDeposits_result_currency {
  __typename: "AdminCurrency";
  type: string;
  explorer_transaction: string;
}

export interface AdminDeposits_adminDeposits_result {
  __typename: "AdminDeposit";
  amount: number;
  completed_at: string;
  created_at: string;
  email: string;
  fee: number;
  id: number;
  state: string;
  tid: string;
  txid: string;
  type: string;
  uid: string;
  updated_at: string;
  currency_code: string;
  confirmations: number;
  currency: AdminDeposits_adminDeposits_result_currency;
}

export interface AdminDeposits_adminDeposits {
  __typename: "AdminDepositPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminDeposits_adminDeposits_result[];
}

export interface AdminDeposits {
  adminDeposits: AdminDeposits_adminDeposits;
}

export interface AdminDepositsVariables {
  page?: number;
  limit?: number;
  state?: string;
  type?: string;
  uid?: string;
  currency?: string;
  ordering?: string;
  order_by?: string;
}
