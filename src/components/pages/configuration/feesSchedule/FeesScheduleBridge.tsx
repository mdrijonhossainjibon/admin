import { SchemaType } from "../../../uniforms/types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

type Maybe<T> = T | null | undefined;

export type FeesScheduleData = {
  group: Maybe<string>;
  market_id: Maybe<string>;
  maker: Maybe<number>;
  taker: Maybe<number>;
};

const schema: SchemaType<FeesScheduleData> = {
  group: {
    type: String,
    optional: false,
  },
  market_id: {
    type: String,
    optional: false,
  },
  maker: {
    type: Number,
    optional: false,
  },
  taker: {
    type: Number,
    optional: false,
  },
};

export const FeesScheduleBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
