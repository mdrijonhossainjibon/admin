/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WithdrawAction
// ====================================================

export interface WithdrawAction_actionWithdraw {
  __typename: "AdminWithdraw";
  id: number | null;
  state: string | null;
}

export interface WithdrawAction {
  actionWithdraw: WithdrawAction_actionWithdraw | null;
}

export interface WithdrawActionVariables {
  _barong_session?: string | null;
  id: number;
  action: string;
  txid?: string | null;
}
