/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminAvailableGroups
// ====================================================

export interface AdminAvailableGroups_adminAvailableGroups {
  __typename: "AdminGroup";
  group: string;
}

export interface AdminAvailableGroups {
  adminAvailableGroups: AdminAvailableGroups_adminAvailableGroups[];
}

export interface AdminAvailableGroupsVariables {
  _barong_session?: string;
}
