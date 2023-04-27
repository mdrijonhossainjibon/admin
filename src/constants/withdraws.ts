import { AdminWithdraws_adminWithdraws_result } from "../graphql/queries/AdminWithdraws";
import { CurrencyType } from "./currencies";
import { AdminWithdraw_adminWithdraw } from "../graphql/queries/AdminWithdraw";

export enum WithdrawState {
  Prepared = "prepared",
  Submitted = "submitted",
  Processing = "processing",
  Canceled = "canceled",
  Failed = "failed",
  Accepted = "accepted",
  Succeed = "succeed",
  Confirming = "confirming",
  Errored = "errored",
  Rejected = "rejected",
  Skipped = "skipped",
}

export enum WithdrawType {
  Coin = "coin",
  Fiat = "fiat",
}

export const CompletedWithdrawStates = [
  WithdrawState.Succeed,
  WithdrawState.Rejected,
  WithdrawState.Canceled,
  WithdrawState.Failed,
];

export enum WithdrawAction {
  Submit = "submit",
  Cancel = "cancel",
  Accept = "accept",
  Reject = "reject",
  Process = "process",
  Load = "load",
  Dispatch = "dispatch",
  Success = "success",
  Skip = "skip",
  Fail = "fail",
  Err = "err",
}

const dispatchAction = (
  withdraw: AdminWithdraws_adminWithdraws_result | AdminWithdraw_adminWithdraw
): WithdrawAction.Dispatch | undefined =>
  withdraw?.currency?.type === CurrencyType.Fiat || !!withdraw.blockchain_txid ? WithdrawAction.Dispatch : undefined;

const loadAction = (
  withdraw: AdminWithdraws_adminWithdraws_result | AdminWithdraw_adminWithdraw
): WithdrawAction.Load | undefined =>
  withdraw?.currency?.type === CurrencyType.Coin && !!withdraw.blockchain_txid ? WithdrawAction.Load : undefined;

const successAction = (
  withdraw: AdminWithdraws_adminWithdraws_result | AdminWithdraw_adminWithdraw
): WithdrawAction.Success | undefined =>
  (withdraw && withdraw.currency && withdraw.currency.type === CurrencyType.Fiat) || !!withdraw.blockchain_txid
    ? WithdrawAction.Success
    : undefined;

// map states to all possible actions from that state
export const WithdrawActionMap = (
  withdraw: AdminWithdraws_adminWithdraws_result | AdminWithdraw_adminWithdraw
): { [key in WithdrawState]?: (WithdrawAction | undefined)[] } => ({
  [WithdrawState.Prepared]: [WithdrawAction.Submit, WithdrawAction.Cancel],
  [WithdrawState.Submitted]: [WithdrawAction.Cancel, WithdrawAction.Accept, WithdrawAction.Reject],
  [WithdrawState.Accepted]: [
    WithdrawAction.Cancel,
    WithdrawAction.Reject,
    WithdrawAction.Process,
    loadAction(withdraw),
  ],
  [WithdrawState.Confirming]: [WithdrawAction.Reject, successAction(withdraw), WithdrawAction.Fail],
  [WithdrawState.Skipped]: [WithdrawAction.Process],
  [WithdrawState.Errored]: [WithdrawAction.Process, successAction(withdraw), WithdrawAction.Fail],
  [WithdrawState.Processing]: [dispatchAction(withdraw), WithdrawAction.Skip, WithdrawAction.Fail, WithdrawAction.Err],
});
