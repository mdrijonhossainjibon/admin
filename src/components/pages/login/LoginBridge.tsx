import SimpleSchema from "simpl-schema";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import { SchemaType } from "../../uniforms/types";

export type LoginData = {
  email: string | undefined;
  password: string | undefined;
  otp_code: string | undefined;
};

const schema: SchemaType<LoginData> = {
  email: {
    type: String,
    optional: false,
    max: 100,
  },
  password: {
    type: String,
    optional: false,
    uniforms: { type: "password" },
  },
  otp_code: {
    type: String,
    optional: true,
    regEx: /^[0-9]*$/,
  },
};

export const LoginBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
