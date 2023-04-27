/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminMember
// ====================================================

export interface AdminMember_adminMember_user {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
}

export interface AdminMember_adminMember_accounts_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
}

export interface AdminMember_adminMember_accounts {
  __typename: "AdminAccount";
  currency: AdminMember_adminMember_accounts_currency;
  balance: number;
  locked: number;
}

export interface AdminMember_adminMember {
  __typename: "AdminMember";
  id: number;
  user: AdminMember_adminMember_user;
  group: string;
  created_at: string;
  updated_at: string;
  accounts: AdminMember_adminMember_accounts[];
}

export interface AdminMember {
  adminMember: AdminMember_adminMember;
}

export interface AdminMemberVariables {
  _barong_session?: string;
  uid?: string;
}
