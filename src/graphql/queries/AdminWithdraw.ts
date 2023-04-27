/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminWithdraw
// ====================================================

export interface AdminWithdraw_adminWithdraw_currency {
  __typename: "AdminCurrency";
  code: string;
  type: string;
  name: string;
  visible: boolean;
  explorer_transaction: string;
  explorer_address: string;
}

export interface AdminWithdraw_adminWithdraw_member_user_profiles {
  __typename: "AdminProfile";
  first_name: string;
  last_name: string;
}

export interface AdminWithdraw_adminWithdraw_member_user {
  __typename: "AdminUser";
  uid: string;
  email: string;
  created_at: string;
  state: string;
  profiles: AdminWithdraw_adminWithdraw_member_user_profiles[];
}

export interface AdminWithdraw_adminWithdraw_member_accounts_currency {
  __typename: "AdminCurrency";
  code: string;
}

export interface AdminWithdraw_adminWithdraw_member_accounts {
  __typename: "AdminAccount";
  currency: AdminWithdraw_adminWithdraw_member_accounts_currency;
  balance: number;
  locked: number;
}

export interface AdminWithdraw_adminWithdraw_member {
  __typename: "AdminMember";
  user: AdminWithdraw_adminWithdraw_member_user;
  accounts: AdminWithdraw_adminWithdraw_member_accounts[];
}

export interface AdminWithdraw_adminWithdraw_beneficiary_data {
  __typename: "AdminBeneficiaryData";
  account_number: string;
  bank_name: string;
  bank_swift_code: string;
  full_name: string;
  intermediary_bank_name: string;
  intermediary_bank_swift_code: string;
  address: string;
}

export interface AdminWithdraw_adminWithdraw_beneficiary {
  __typename: "AdminBeneficiary";
  id: number;
  name: string;
  state: string;
  data: AdminWithdraw_adminWithdraw_beneficiary_data;
}

export interface AdminWithdraw_adminWithdraw {
  __typename: "AdminWithdraw";
  id: number;
  currency: AdminWithdraw_adminWithdraw_currency;
  type: string;
  sum: number;
  fee: number;
  blockchain_txid: string;
  rid: string;
  state: string;
  confirmations: number;
  note: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  member: AdminWithdraw_adminWithdraw_member;
  beneficiary: AdminWithdraw_adminWithdraw_beneficiary;
  account: string;
  block_number: number;
  amount: number;
  tid: string;
}

export interface AdminWithdraw {
  adminWithdraw: AdminWithdraw_adminWithdraw;
}

export interface AdminWithdrawVariables {
  _barong_session?: string;
  id?: number;
}
