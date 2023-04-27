import { SchemaType } from "../../../../uniforms/types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

type Maybe<T> = T | null | undefined;

export type AdjustmentData = {
  amount: number;
  asset_account_code: number;
  category: string;
  currency_id: string;
  description: Maybe<string>;
  reason: string;
  receiving_account_code: number;
  receiving_member_uid: string;
};

const schema: SchemaType<AdjustmentData> = {
  amount: {
    type: Number,
    optional: false,
  },
  asset_account_code: {
    type: Number,
    optional: false,
  },
  category: {
    type: String,
    optional: false,
  },
  currency_id: {
    type: String,
    optional: false,
  },
  description: {
    type: String,
    optional: true,
  },
  reason: {
    type: String,
    optional: false,
  },
  receiving_account_code: {
    type: Number,
    optional: false,
  },
  receiving_member_uid: {
    type: String,
    optional: true,
  },
};

export const AdjustmentBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
