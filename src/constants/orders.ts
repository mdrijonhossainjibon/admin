import { BlockProps } from "antd/lib/typography/Base";

export enum OrderFetchType {
  History = "history",
  Open = "open",
}

export enum OrderSide {
  Buy = "buy",
  Sell = "sell",
}

export enum OrderState {
  Pending = "pending",
  Wait = "wait",
  Done = "done",
  Cancel = "cancel",
  Reject = "reject",
}

export const OrderSideColors: { [key in OrderSide]: BlockProps["type"] } = {
  [OrderSide.Sell]: "success",
  [OrderSide.Buy]: "danger",
};
