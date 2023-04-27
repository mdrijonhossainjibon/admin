/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateRestriction
// ====================================================

export interface CreateRestriction_adminCreateRestriction {
  __typename: "SimpleResponse";
  data: string | null;
}

export interface CreateRestriction {
  adminCreateRestriction: CreateRestriction_adminCreateRestriction | null;
}

export interface CreateRestrictionVariables {
  _barong_session?: string | null;
  category?: string | null;
  state?: string | null;
  scope?: string | null;
  value?: string | null;
}
