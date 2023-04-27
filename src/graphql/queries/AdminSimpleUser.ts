/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminSimpleUser
// ====================================================

export interface AdminSimpleUser_adminUserWithoutActivities_labels {
  __typename: "AdminLabel";
  key: string;
  value: string;
  scope: string;
  created_at: string;
  updated_at: string;
}

export interface AdminSimpleUser_adminUserWithoutActivities_phones {
  __typename: "AdminPhone";
  country: string;
  number: string;
  validated_at: string;
}

export interface AdminSimpleUser_adminUserWithoutActivities_profiles {
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

export interface AdminSimpleUser_adminUserWithoutActivities_documents_upload {
  __typename: "AdminDocUpload";
  url: string;
}

export interface AdminSimpleUser_adminUserWithoutActivities_documents {
  __typename: "AdminDocument";
  doc_expire: string;
  doc_number: string;
  doc_type: string;
  metadata: string;
  created_at: string;
  updated_at: string;
  upload: AdminSimpleUser_adminUserWithoutActivities_documents_upload;
}

export interface AdminSimpleUser_adminUserWithoutActivities {
  __typename: "AdminUserWithoutActivities";
  uid: string;
  email: string;
  role: string;
  level: number;
  otp: boolean;
  state: string;
  referral_uid: string;
  labels: AdminSimpleUser_adminUserWithoutActivities_labels[];
  data: string;
  created_at: string;
  updated_at: string;
  phones: AdminSimpleUser_adminUserWithoutActivities_phones[];
  profiles: AdminSimpleUser_adminUserWithoutActivities_profiles[];
  documents: AdminSimpleUser_adminUserWithoutActivities_documents[];
}

export interface AdminSimpleUser {
  adminUserWithoutActivities: AdminSimpleUser_adminUserWithoutActivities;
}

export interface AdminSimpleUserVariables {
  _barong_session?: string;
  uid?: string;
}
