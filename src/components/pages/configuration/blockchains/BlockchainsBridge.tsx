import SimpleSchema from "simpl-schema";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import { SchemaType } from "../../../uniforms/types";

export type BlockchainsData = {
  name: string | undefined | null;
  enabled: boolean | undefined | null;
  client: string | undefined | null;
  key: string | undefined | null;
  server: string | undefined | null;
  height: number | undefined | null;
  explorer_address: string | undefined | null;
  explorer_transaction: string | undefined | null;
  min_confirmations: number | undefined | null;
};

const schema: SchemaType<BlockchainsData> = {
  name: {
    type: String,
    optional: false,
  },
  enabled: {
    type: Boolean,
    optional: false,
    defaultValue: false,
  },
  client: {
    type: String,
    optional: false,
  },
  key: {
    type: String,
    optional: false,
  },
  server: {
    type: String,
    optional: false,
  },
  height: {
    type: Number,
    optional: false
  },
  explorer_address: {
    type: String,
    optional: false,
  },
  explorer_transaction: {
    type: String,
    optional: false,
  },
  min_confirmations: {
    type: Number,
    optional: false
  },
};

export const BlockchainsBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
