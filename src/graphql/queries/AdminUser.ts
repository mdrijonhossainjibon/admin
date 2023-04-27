/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminUser
// ====================================================

export interface AdminUser_adminUser_labels {
  __typename: "AdminLabel";
  key: string;
  value: string;
  scope: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser_adminUser_phones {
  __typename: "AdminPhone";
  country: string;
  number: string;
  validated_at: string;
}

export interface AdminUser_adminUser_profiles {
  __typename: "AdminProfile";
  first_name: string;
  last_name: string;
  dob: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  state: string;
  metadata: string;
}

export interface AdminUser_adminUser_activities {
  __typename: "AdminUserActivity";
  action: string;
  created_at: string;
  data: string;
  result: string;
  topic: string;
  user_agent: string;
  user_ip: string;
}

export interface AdminUser_adminUser_documents_upload {
  __typename: "AdminDocUpload";
  url: string;
}

export interface AdminUser_adminUser_documents {
  __typename: "AdminDocument";
  doc_expire: string;
  doc_number: string;
  doc_type: string;
  metadata: string;
  created_at: string;
  updated_at: string;
  upload: AdminUser_adminUser_documents_upload;
}

export interface AdminUser_adminUser {
  __typename: "AdminUser";
  uid: string;
  email: string;
  role: string;
  level: number;
  otp: boolean;
  state: string;
  referral_uid: string;
  labels: AdminUser_adminUser_labels[];
  data: string;
  created_at: string;
  updated_at: string;
  phones: AdminUser_adminUser_phones[];
  profiles: AdminUser_adminUser_profiles[];
  activities: AdminUser_adminUser_activities[];
  documents: AdminUser_adminUser_documents[];
}

export interface AdminUser {
  adminUser: AdminUser_adminUser;
}

export interface AdminUserVariables {
  _barong_session?: string;
  userId?: string;
  activityPage?: number;
  activityLimit?: number;
}
