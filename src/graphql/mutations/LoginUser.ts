/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUser
// ====================================================

export interface LoginUser_login {
  __typename: "User";
  _barong_session: string | null;
  uid: string;
  role: string | null;
}

export interface LoginUser {
  login: LoginUser_login | null;
}

export interface LoginUserVariables {
  mail: string;
  pwd: string;
  otp?: string | null;
}
