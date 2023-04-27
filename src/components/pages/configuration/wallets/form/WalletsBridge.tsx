import { SchemaType } from "../../../../uniforms/types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

type Maybe<T> = T | undefined | null;

export type WalletsData = {
  currency: Maybe<string>;
  kind: Maybe<string>;
  max_balance: Maybe<number>;
  name: Maybe<string>;
  enabled: Maybe<boolean>;
  uri: Maybe<string>;
  secret: Maybe<string>;
  address: Maybe<string>;
  blockchain_key: Maybe<string>;
  gateway: Maybe<string>;
  access_token: Maybe<string>;
  testnet: Maybe<boolean>;
  wallet_id: Maybe<string>;
};

const schema: SchemaType<WalletsData> = {
  currency: {
    type: String,
    optional: false,
  },
  kind: {
    type: String,
    optional: false,
  },
  max_balance: {
    type: Number,
    optional: false,
  },
  name: {
    type: String,
    optional: false,
  },
  enabled: {
    type: Boolean,
    optional: false,
    defaultValue: false,
  },
  uri: {
    type: String,
    optional: true,
  },
  secret: {
    type: String,
    optional: true,
  },
  address: {
    type: String,
    optional: false,
  },
  blockchain_key: {
    type: String,
    optional: false,
  },
  gateway: {
    type: String,
    optional: false,
  },
  access_token: {
    type: String,
    optional: true,
  },
  testnet: {
    type: Boolean,
    optional: true,
  },
  wallet_id: {
    type: String,
    optional: true,
  },
};
const WalletSchema = new SimpleSchema(schema);

export const WalletsBridge = new SimpleSchema2Bridge(WalletSchema);
