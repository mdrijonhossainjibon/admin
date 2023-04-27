/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserProfile
// ====================================================

export interface UpdateUserProfile_updateUserProfile {
  __typename: "AdminUser";
  uid: string | null;
}

export interface UpdateUserProfile {
  updateUserProfile: UpdateUserProfile_updateUserProfile | null;
}

export interface UpdateUserProfileVariables {
  uid?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  dob?: string | null;
  address?: string | null;
  postcode?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  metadata?: string | null;
}
