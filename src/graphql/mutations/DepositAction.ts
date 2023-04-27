/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DepositAction
// ====================================================

export interface DepositAction_actionDeposit {
  __typename: "AdminDeposit";
  id: number | null;
  state: string | null;
}

export interface DepositAction {
  actionDeposit: DepositAction_actionDeposit | null;
}

export interface DepositActionVariables {
  _barong_session?: string | null;
  id: number;
  action: string;
}
