import { SchemaType } from "../../../uniforms/types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

type Maybe<T> = T | undefined | null;

export type MarketsData = {
  amount_precision: Maybe<number>;
  base_currency: Maybe<string>;
  quote_currency: Maybe<string>;
  max_price: Maybe<number>;
  min_amount: Maybe<number>;
  min_price: Maybe<number>;
  position: Maybe<number>;
  price_precision: Maybe<number>;
  enabled: Maybe<boolean>;
};

const schema: SchemaType<MarketsData> = {
  amount_precision: {
    type: Number,
    optional: false,
  },
  base_currency: {
    type: String,
    optional: false,
  },
  quote_currency: {
    type: String,
    optional: false,
  },
  max_price: {
    type: Number,
    optional: false,
  },
  min_amount: {
    type: Number,
    optional: false,
  },
  min_price: {
    type: Number,
    optional: false,
  },
  position: {
    type: Number,
    optional: false,
  },
  price_precision: {
    type: Number,
    optional: false,
  },
  enabled: {
    type: Boolean,
    optional: false,
    defaultValue: false,
  },
};

export const MarketsBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
