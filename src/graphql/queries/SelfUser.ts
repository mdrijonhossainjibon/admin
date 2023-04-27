/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SelfUser
// ====================================================

export interface SelfUser_userWithProfile {
  __typename: "User";
  uid: string;
  email: string;
  role: string;
  level: number;
  otp: boolean;
  state: string;
}

export interface SelfUser {
  userWithProfile: SelfUser_userWithProfile;
}

export interface SelfUserVariables {
  _barong_session?: string;
}
