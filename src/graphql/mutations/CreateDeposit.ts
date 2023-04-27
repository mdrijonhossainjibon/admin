/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDeposit
// ====================================================

export interface CreateDeposit_createDeposit {
  __typename: "AdminDeposit";
  uid: string | null;
}

export interface CreateDeposit {
  createDeposit: CreateDeposit_createDeposit | null;
}

export interface CreateDepositVariables {
  _barong_session?: string | null;
  uid: string;
  currency: string;
  amount: number;
}
