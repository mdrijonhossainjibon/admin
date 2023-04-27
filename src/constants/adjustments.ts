export enum AdjustmentState {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export enum AdjustmentAction {
  Accept = "accept",
  Reject = "reject",
}

export enum AdjustmentCategory {
  AssetRegistration = "asset_registration",
  Investment = "investment",
  MintingToken = "minting_token",
  BalanceAnomaly = "balance_anomaly",
  Misc = "misc",
  Refund = "refund",
  Compensation = "compensation",
  Incentive = "incentive",
  BankFees = "bank_fees",
  BankInterest = "bank_interest",
  Minor = "minor",
}
