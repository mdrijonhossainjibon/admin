import { SchemaType } from "../../../../uniforms/types";
import SimpleSchema from "simpl-schema";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";

type Maybe<T> = T | undefined;

export interface WithdrawFilterData {
  state: Maybe<string>;
  uid: Maybe<string>;
  txid: Maybe<string>;
  currency: Maybe<string>;
  type: Maybe<string>;
  from: Maybe<string>;
  to: Maybe<string>;
}

export interface WithdrawFilterSchema extends Omit<WithdrawFilterData, "from" | "to"> {
  from: Maybe<Date>;
  to: Maybe<Date>;
}

const schema: SchemaType<WithdrawFilterSchema> = {
  state: {
    type: String,
    optional: true,
  },
  uid: {
    type: String,
    optional: true,
  },
  txid: {
    type: String,
    optional: true,
  },
  currency: {
    type: String,
    optional: true,
  },
  type: {
    type: String,
    optional: true,
  },
  from: {
    type: Date,
    optional: true,
  },
  to: {
    type: Date,
    optional: true,
  },
};

export const WithdrawFilterBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
