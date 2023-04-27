export enum DepositAction {
  Cancel = "cancel",
  Reject = "reject",
  Accept = "accept",
  Skip = "skip",
  Dispatch = "dispatch",
}

export enum DepositState {
  Accepted = "accepted",
  Submitted = "submitted",
  Rejected = "rejected",
  Collected = "collected",
  Skipped = "skipped",
  Canceled = "canceled",
}

export enum DepositTypes {
  Coin = "coin",
  Fiat = "fiat",
}

// map states to all possible actions from that state
export const DepositActionMap: { [key in DepositState]?: DepositAction[] } = {
  //[DepositState.Submitted]: [DepositAction.Reject, DepositAction.Accept],
};
