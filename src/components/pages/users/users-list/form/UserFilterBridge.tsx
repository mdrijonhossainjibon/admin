import { SchemaType } from "../../../../uniforms/types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

type Maybe<T> = T | undefined;

export interface UserFilterData {
  uid: Maybe<string>;
  email: Maybe<string>;
  role: Maybe<string>;
  first_name: Maybe<string>;
  last_name: Maybe<string>;
  country: Maybe<string>;
  level: Maybe<number>;
  state: Maybe<string>;
  from: Maybe<string>;
  to: Maybe<string>;
}

export interface UserFilterSchema extends Omit<UserFilterData, "from" | "to"> {
  from: Maybe<Date>;
  to: Maybe<Date>;
}

const schema: SchemaType<UserFilterSchema> = {
  uid: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
    optional: true,
  },
  role: {
    type: String,
    optional: true,
  },
  first_name: {
    type: String,
    optional: true,
  },
  last_name: {
    type: String,
    optional: true,
  },
  country: {
    type: String,
    optional: true,
  },
  level: {
    type: Number,
    optional: true,
  },
  state: {
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

export const UserFilterBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
