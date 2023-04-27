/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminUserByLabel
// ====================================================

export interface AdminUserByLabel_adminUserByLabel_profiles {
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

export interface AdminUserByLabel_adminUserByLabel_phones {
  __typename: "AdminPhone";
  country: string;
  number: string;
  validated_at: string;
}

export interface AdminUserByLabel_adminUserByLabel {
  __typename: "AdminUser";
  uid: string;
  data: string;
  email: string;
  level: number;
  otp: boolean;
  profiles: AdminUserByLabel_adminUserByLabel_profiles[];
  phones: AdminUserByLabel_adminUserByLabel_phones[];
  referral_uid: string;
  role: string;
  state: string;
}

export interface AdminUserByLabel {
  adminUserByLabel: AdminUserByLabel_adminUserByLabel[];
}

export interface AdminUserByLabelVariables {
  _barong_session?: string;
  key: string;
  value: string;
}
