import { SchemaType } from "../../../../uniforms/types";
import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

export type PermissionData = {
  id: number;
  role: string;
  verb: string;
  path: string;
  topic: string;
  action: string;
};

const schema: SchemaType<PermissionData> = {
  id: {
    type: Number,
    optional: true,
  },
  role: {
    type: String,
    optional: true,
  },
  verb: {
    type: String,
    optional: true,
  },
  path: {
    type: String,
    optional: true,
  },
  topic: {
    type: String,
    optional: true,
  },
  action: {
    type: String,
    optional: true,
  },
};

export const PermissionBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
