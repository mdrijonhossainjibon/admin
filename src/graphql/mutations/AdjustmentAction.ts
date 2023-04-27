/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AdjustmentAction
// ====================================================

export interface AdjustmentAction_actionAdjustment {
  __typename: "AdminAdjustment";
  id: number | null;
  state: string | null;
}

export interface AdjustmentAction {
  actionAdjustment: AdjustmentAction_actionAdjustment | null;
}

export interface AdjustmentActionVariables {
  _barong_session?: string | null;
  id?: number | null;
  action?: string | null;
}
