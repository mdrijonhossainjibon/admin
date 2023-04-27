/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminSingleDeposit
// ====================================================

export interface AdminSingleDeposit_adminDeposit_member_user {
  __typename: "AdminUser";
  state: string;
  uid: string;
  email: string;
  role: string;
}

export interface AdminSingleDeposit_adminDeposit_member {
  __typename: "AdminMember";
  user: AdminSingleDeposit_adminDeposit_member_user;
}

export interface AdminSingleDeposit_adminDeposit_currency_blockchain {
  __typename: "AdminBlockchain";
  id: number;
  name: string;
  key: string;
  enabled: boolean;
}

export interface AdminSingleDeposit_adminDeposit_currency {
  __typename: "AdminCurrency";
  name: string;
  code: string;
  precision: number;
  explorer_transaction: string;
  visible: boolean;
  blockchain: AdminSingleDeposit_adminDeposit_currency_blockchain;
}

export interface AdminSingleDeposit_adminDeposit {
  __typename: "AdminDeposit";
  id: number;
  tid: string;
  txout: number;
  block_number: number;
  spread: string;
  state: string;
  amount: number;
  email: string;
  fee: number;
  type: string;
  txid: string;
  member: AdminSingleDeposit_adminDeposit_member;
  currency: AdminSingleDeposit_adminDeposit_currency;
}

export interface AdminSingleDeposit {
  adminDeposit: AdminSingleDeposit_adminDeposit;
}

export interface AdminSingleDepositVariables {
  tid?: string;
}
