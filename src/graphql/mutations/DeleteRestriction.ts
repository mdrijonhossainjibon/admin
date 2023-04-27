/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteRestriction
// ====================================================

export interface DeleteRestriction_adminDeleteRestriction {
  __typename: "SimpleResponse";
  data: string | null;
}

export interface DeleteRestriction {
  adminDeleteRestriction: DeleteRestriction_adminDeleteRestriction | null;
}

export interface DeleteRestrictionVariables {
  _barong_session?: string | null;
  id?: number | null;
}
