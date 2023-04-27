/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminListUsers
// ====================================================

export interface AdminListUsers_adminUsers_result_profiles {
  __typename: "AdminProfile";
  last_name: string;
  first_name: string;
  country: string;
}

export interface AdminListUsers_adminUsers_result {
  __typename: "AdminUser";
  uid: string;
  role: string;
  email: string;
  level: number;
  profiles: AdminListUsers_adminUsers_result_profiles[];
  created_at: string;
  updated_at: string;
  state: string;
  otp: boolean;
  referral_uid: string;
}

export interface AdminListUsers_adminUsers {
  __typename: "AdminUsersPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminListUsers_adminUsers_result[];
}

export interface AdminListUsers {
  adminUsers: AdminListUsers_adminUsers;
}

export interface AdminListUsersVariables {
  _barong_session?: string;
  uid?: string;
  email?: string;
  role?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  level?: number;
  state?: string;
  range?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}
