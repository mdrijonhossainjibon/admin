/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminAdjustment
// ====================================================

export interface AdminAdjustment_adminAdjustment_validator {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminAdjustment_adminAdjustment_creator {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminAdjustment_adminAdjustment_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminAdjustment_adminAdjustment_asset_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
}

export interface AdminAdjustment_adminAdjustment_asset {
  __typename: "AdminOperation";
  id: number;
  code: string;
  member: AdminAdjustment_adminAdjustment_asset_member;
}

export interface AdminAdjustment_adminAdjustment_liability_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
}

export interface AdminAdjustment_adminAdjustment_liability {
  __typename: "AdminOperation";
  id: number;
  code: string;
  member: AdminAdjustment_adminAdjustment_liability_member;
}

export interface AdminAdjustment_adminAdjustment_revenue_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
}

export interface AdminAdjustment_adminAdjustment_revenue {
  __typename: "AdminOperation";
  id: number;
  code: string;
  member: AdminAdjustment_adminAdjustment_revenue_member;
}

export interface AdminAdjustment_adminAdjustment_expense_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
}

export interface AdminAdjustment_adminAdjustment_expense {
  __typename: "AdminOperation";
  id: number;
  code: string;
  member: AdminAdjustment_adminAdjustment_expense_member;
}

export interface AdminAdjustment_adminAdjustment_receiving_member {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminAdjustment_adminAdjustment {
  __typename: "AdminAdjustment";
  id: number;
  reason: string;
  description: string;
  category: string;
  amount: number;
  validator: AdminAdjustment_adminAdjustment_validator;
  creator: AdminAdjustment_adminAdjustment_creator;
  currency: AdminAdjustment_adminAdjustment_currency;
  asset: AdminAdjustment_adminAdjustment_asset;
  liability: AdminAdjustment_adminAdjustment_liability;
  revenue: AdminAdjustment_adminAdjustment_revenue;
  expense: AdminAdjustment_adminAdjustment_expense;
  state: string;
  asset_account_code: string;
  receiving_account_code: string;
  receiving_member: AdminAdjustment_adminAdjustment_receiving_member;
  created_at: string;
  updated_at: string;
}

export interface AdminAdjustment {
  adminAdjustment: AdminAdjustment_adminAdjustment;
}

export interface AdminAdjustmentVariables {
  _barong_session?: string;
  id?: number;
}
