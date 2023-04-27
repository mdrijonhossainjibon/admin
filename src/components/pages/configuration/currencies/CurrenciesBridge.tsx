import { SchemaType } from "../../../uniforms/types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

export type CurrenciesData = {
  blockchain_key: string | undefined | null;
  code: string | undefined | null;
  deposit_enabled: boolean | undefined | null;
  deposit_fee: number | undefined | null;
  icon_url: string | undefined | null;
  min_collection_amount: number | undefined | null;
  min_deposit_amount: number | undefined | null;
  min_withdraw_amount: number | undefined | null;
  name: string | undefined | null;
  position: number | undefined | null;
  precision: number | undefined | null;
  subunits: number | undefined | null;
  symbol: string | undefined | null;
  type: string | undefined | null;
  visible: boolean | undefined | null;
  withdraw_fee: number | undefined | null;
  withdraw_limit_24h: number | undefined | null;
  withdraw_limit_72h: number | undefined | null;
  withdrawal_enabled: boolean | undefined | null;
};

const schema: SchemaType<CurrenciesData> = {
  name: {
    type: String,
    optional: false,
  },
  min_collection_amount: {
    type: Number,
    optional: true,
  },
  blockchain_key: {
    type: String,
    optional: true,
  },
  subunits: {
    type: Number,
    optional: true,
  },
  code: {
    type: String,
    optional: false,
  },
  symbol: {
    type: String,
    optional: false,
  },
  type: {
    type: String,
    optional: false,
  },
  deposit_enabled: {
    type: Boolean,
    optional: false,
    defaultValue: false,
  },
  withdrawal_enabled: {
    type: Boolean,
    optional: false,
    defaultValue: false,
  },
  deposit_fee: {
    type: Number,
    optional: false,
  },
  min_deposit_amount: {
    type: Number,
    optional: false,
  },
  withdraw_fee: {
    type: Number,
    optional: false,
  },
  min_withdraw_amount: {
    type: Number,
    optional: false,
    defaultValue: 0,
  },
  withdraw_limit_24h: {
    type: Number,
    optional: false,
  },
  withdraw_limit_72h: {
    type: Number,
    optional: false,
  },
  precision: {
    type: Number,
    optional: false,
  },
  position: {
    type: Number,
    optional: false,
  },
  icon_url: {
    type: String,
    optional: true,
  },
  visible: {
    type: Boolean,
    optional: false,
    defaultValue: false,
  },
};

export const CurrenciesBridge = new SimpleSchema2Bridge(new SimpleSchema(schema, { clean: { autoConvert: true } }));
