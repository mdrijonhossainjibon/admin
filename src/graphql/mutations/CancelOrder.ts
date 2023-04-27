/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelOrder
// ====================================================

export interface CancelOrder_adminCancelOrder {
  __typename: "SimpleResponse";
  data: string | null;
}

export interface CancelOrder {
  adminCancelOrder: CancelOrder_adminCancelOrder | null;
}

export interface CancelOrderVariables {
  _barong_session?: string | null;
  id?: number | null;
}
