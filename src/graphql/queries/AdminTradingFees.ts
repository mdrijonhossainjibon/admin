/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminTradingFees
// ====================================================

export interface AdminTradingFees_adminTradingFees {
  __typename: "AdminTradingFee";
  id: number;
  group: string;
  market_id: string;
  maker: number;
  taker: number;
  created_at: string;
  updated_at: string;
}

export interface AdminTradingFees {
  adminTradingFees: AdminTradingFees_adminTradingFees[];
}

export interface AdminTradingFeesVariables {
  _barong_session?: string;
}
