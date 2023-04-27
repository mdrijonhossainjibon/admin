/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminLabels
// ====================================================

export interface AdminLabels_adminLabels {
  __typename: "AdminLabel";
  key: string;
  scope: string;
  value: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface AdminLabels {
  adminLabels: AdminLabels_adminLabels[];
}

export interface AdminLabelsVariables {
  _barong_session?: string;
}
