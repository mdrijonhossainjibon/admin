/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminAdjustments
// ====================================================

export interface AdminAdjustments_adminAdjustments_result_validator {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminAdjustments_adminAdjustments_result_creator {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminAdjustments_adminAdjustments_result_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminAdjustments_adminAdjustments_result_asset_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
}

export interface AdminAdjustments_adminAdjustments_result_asset {
  __typename: "AdminOperation";
  id: number;
  code: string;
  member: AdminAdjustments_adminAdjustments_result_asset_member;
}

export interface AdminAdjustments_adminAdjustments_result_liability_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
}

export interface AdminAdjustments_adminAdjustments_result_liability {
  __typename: "AdminOperation";
  id: number;
  code: string;
  member: AdminAdjustments_adminAdjustments_result_liability_member;
}

export interface AdminAdjustments_adminAdjustments_result_revenue_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
}

export interface AdminAdjustments_adminAdjustments_result_revenue {
  __typename: "AdminOperation";
  id: number;
  code: string;
  member: AdminAdjustments_adminAdjustments_result_revenue_member;
}

export interface AdminAdjustments_adminAdjustments_result_expense_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
}

export interface AdminAdjustments_adminAdjustments_result_expense {
  __typename: "AdminOperation";
  id: number;
  code: string;
  member: AdminAdjustments_adminAdjustments_result_expense_member;
}

export interface AdminAdjustments_adminAdjustments_result_receiving_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminAdjustments_adminAdjustments_result {
  __typename: "AdminAdjustment";
  id: number;
  reason: string;
  description: string;
  category: string;
  amount: number;
  validator: AdminAdjustments_adminAdjustments_result_validator;
  creator: AdminAdjustments_adminAdjustments_result_creator;
  currency: AdminAdjustments_adminAdjustments_result_currency;
  asset: AdminAdjustments_adminAdjustments_result_asset;
  liability: AdminAdjustments_adminAdjustments_result_liability;
  revenue: AdminAdjustments_adminAdjustments_result_revenue;
  expense: AdminAdjustments_adminAdjustments_result_expense;
  state: string;
  asset_account_code: string;
  receiving_account_code: string;
  receiving_member: AdminAdjustments_adminAdjustments_result_receiving_member;
  created_at: string;
  updated_at: string;
}

export interface AdminAdjustments_adminAdjustments {
  __typename: "AdminAdjustmentsPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminAdjustments_adminAdjustments_result[];
}

export interface AdminAdjustments {
  adminAdjustments: AdminAdjustments_adminAdjustments;
}

export interface AdminAdjustmentsVariables {
  _barong_session?: string;
  currency?: string;
  range?: string;
  from?: string;
  to?: string;
  limit?: number;
  page?: number;
  ordering?: string;
  order_by?: string;
  state?: string;
  category?: string;
}
