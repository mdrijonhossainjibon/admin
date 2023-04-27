import { SchemaType } from "../../../../uniforms/types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

type Maybe<T> = T | null | undefined;

export interface DepositFilterData {
  state: Maybe<string>;
  uid: Maybe<string>;
  txid: Maybe<string>;
  address: Maybe<string>;
  currency: Maybe<string>;
  type: Maybe<string>;
  from: Maybe<number>;
  to: Maybe<number>;
}

export interface DepositFilterSchema extends Omit<DepositFilterData, "from" | "to"> {
  from: Maybe<Date>;
  to: Maybe<Date>;
}

const schema: SchemaType<DepositFilterSchema> = {
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
  address: {
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

export const DepositFilterBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
