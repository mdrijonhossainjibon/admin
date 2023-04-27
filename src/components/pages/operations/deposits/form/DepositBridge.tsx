import { SchemaType } from "../../../../uniforms/types";
import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

export type DepositData = {
  uid: string;
  currency: string;
  amount: number;
};

const schema: SchemaType<DepositData> = {
  uid: {
    type: String,
    optional: false,
  },
  currency: {
    type: String,
    optional: false,
  },
  amount: {
    type: Number,
    optional: false,
  },
};

export const DepositBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
