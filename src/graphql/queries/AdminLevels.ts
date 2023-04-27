/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminLevels
// ====================================================

export interface AdminLevels_adminLevels {
  __typename: "AdminLevel";
  id: number;
  key: string;
  value: string;
}

export interface AdminLevels {
  adminLevels: AdminLevels_adminLevels[];
}

export interface AdminLevelsVariables {
  _barong_session?: string;
}
