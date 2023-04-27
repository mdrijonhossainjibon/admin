import { SchemaType } from "../../../../uniforms/types";
import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

export type RestrictionData = {
  id: number;
  state: string;
  scope: string;
  value: string;
  category: string;
};

const schema: SchemaType<RestrictionData> = {
  id: {
    type: Number,
    optional: true,
  },
  state: {
    type: String,
    optional: true,
  },
  scope: {
    type: String,
    optional: true,
  },
  value: {
    type: String,
    optional: true,
  },
  category: {
    type: String,
    optional: true,
  },
};

export const RestrictionBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
