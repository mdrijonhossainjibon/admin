/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetUserGroup
// ====================================================

export interface SetUserGroup_adminSetUserGroup {
  __typename: "AdminMember";
  id: number | null;
  group: string | null;
}

export interface SetUserGroup {
  adminSetUserGroup: SetUserGroup_adminSetUserGroup | null;
}

export interface SetUserGroupVariables {
  _barong_session?: string | null;
  uid?: string | null;
  group?: string | null;
}
