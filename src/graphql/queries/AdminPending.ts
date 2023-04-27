/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminPending
// ====================================================

export interface AdminPending_adminPending_result_profiles {
  __typename: "AdminProfile";
  last_name: string;
  first_name: string;
  country: string;
  address: string;
  city: string;
  dob: string;
  metadata: string;
  postcode: string;
  state: string;
  created_at: string;
  updated_at: string;
}

export interface AdminPending_adminPending_result_documents_upload {
  __typename: "AdminDocUpload";
  url: string;
}

export interface AdminPending_adminPending_result_documents {
  __typename: "AdminDocument";
  doc_expire: string;
  doc_number: string;
  doc_type: string;
  metadata: string;
  created_at: string;
  upload: AdminPending_adminPending_result_documents_upload;
}

export interface AdminPending_adminPending_result {
  __typename: "AdminUser";
  uid: string;
  data: string;
  role: string;
  email: string;
  level: number;
  profiles: AdminPending_adminPending_result_profiles[];
  created_at: string;
  updated_at: string;
  state: string;
  otp: boolean;
  referral_uid: string;
  documents: AdminPending_adminPending_result_documents[];
}

export interface AdminPending_adminPending {
  __typename: "AdminUsersPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminPending_adminPending_result[];
}

export interface AdminPending {
  adminPending: AdminPending_adminPending;
}

export interface AdminPendingVariables {
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
