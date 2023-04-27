/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAdjustment
// ====================================================

export interface CreateAdjustment_adminCreateAdjustment {
  __typename: "AdminAdjustment";
  id: number | null;
}

export interface CreateAdjustment {
  adminCreateAdjustment: CreateAdjustment_adminCreateAdjustment | null;
}

export interface CreateAdjustmentVariables {
  _barong_session?: string | null;
  amount?: string | null;
  asset_account_code?: number | null;
  category?: string | null;
  currency_id?: string | null;
  description?: string | null;
  reason?: string | null;
  receiving_account_code?: number | null;
  receiving_member_uid?: string | null;
}
