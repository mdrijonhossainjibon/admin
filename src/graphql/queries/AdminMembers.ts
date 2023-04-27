/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminMembers
// ====================================================

export interface AdminMembers_adminMembers_user {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminMembers_adminMembers_accounts_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminMembers_adminMembers_accounts {
  __typename: "AdminAccount";
  currency: AdminMembers_adminMembers_accounts_currency;
  balance: number;
  locked: number;
}

export interface AdminMembers_adminMembers {
  __typename: "AdminMember";
  id: number;
  user: AdminMembers_adminMembers_user;
  group: string;
  created_at: string;
  updated_at: string;
  accounts: AdminMembers_adminMembers_accounts[];
}

export interface AdminMembers {
  adminMembers: AdminMembers_adminMembers[];
}

export interface AdminMembersVariables {
  _barong_session?: string;
  state?: string;
  role?: string;
  group?: string;
  email?: string;
  uid?: string;
  range?: string;
  from?: string;
  to?: string;
  limit?: number;
  page?: number;
  ordering?: string;
  order_by?: string;
}
