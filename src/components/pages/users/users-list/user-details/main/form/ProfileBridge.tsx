import { SchemaType } from "../../../../../../uniforms/types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";

export type ProfileData = {
  first_name: string;
  last_name: string;
  dob: Date;
  address: string;
  postcode: string;
  city: string;
  country: string;
  state: string;
  nationality: string;
};

const schema: SchemaType<ProfileData> = {
  first_name: {
    type: String,
    optional: false,
  },
  last_name: {
    type: String,
    optional: false,
  },
  dob: {
    type: Date,
    optional: false,
  },
  address: {
    type: String,
    optional: false,
  },
  postcode: {
    type: String,
    optional: false,
  },
  city: {
    type: String,
    optional: false,
  },
  country: {
    type: String,
    optional: false,
  },
  state: {
    type: String,
    optional: false,
  },
  nationality: {
    type: String,
    optional: false,
  },
};

export const ProfileBridge = new SimpleSchema2Bridge(new SimpleSchema(schema));
