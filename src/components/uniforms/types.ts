export type FieldType<T> = T extends string
  ? StringConstructor | RegExp
  : T extends number
  ? NumberConstructor | RegExp
  : T extends Date
  ? DateConstructor | RegExp
  : T extends boolean
  ? BooleanConstructor
  : never;

export type SchemaType<T extends object> = {
  [K in keyof T]: {
    type: FieldType<T[K]>;
    [rule: string]: any;
  };
};
