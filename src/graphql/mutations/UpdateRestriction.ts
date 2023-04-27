/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRestriction
// ====================================================

export interface UpdateRestriction_adminUpdateRestriction {
  __typename: "SimpleResponse";
  data: string | null;
}

export interface UpdateRestriction {
  adminUpdateRestriction: UpdateRestriction_adminUpdateRestriction | null;
}

export interface UpdateRestrictionVariables {
  _barong_session?: string | null;
  id?: number | null;
  category?: string | null;
  state?: string | null;
  scope?: string | null;
  value?: string | null;
}
