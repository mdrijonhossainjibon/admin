import { SchemaType } from "../../../../../uniforms/types";
import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

export type LabelData = {
  key: string;
  value: string;
  scope: string;
};

const schema: SchemaType<LabelData> = {
  key: {
    type: String,
    optional: false,
  },
  value: {
    type: String,
    optional: false,
  },
  scope: {
    type: String,
    optional: false,
  },
};

export const LabelBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
