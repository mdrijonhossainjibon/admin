export enum UserRole {
  SuperAdmin = "superadmin",
  Admin = "admin",
  Accountant = "accountant",
  Compliance = "compliance",
  Technical = "technical",
  Support = "support",
  Trader = "trader",
  Member = "member",
  Broker = "broker",
}

export enum ActivityResult {
  Succeed = "succeed",
  Failed = "failed",
  Denied = "denied",
}

export enum ProfileState {
  Submitted = "submitted",
  Drafted = "drafted",
  Verified = "verified",
  Rejected = "rejected",
}

export enum LabelKey {
  Phone = "phone",
  Document = "document",
  Email = "email",
}

export enum LabelValue {
  Verified = "verified",
  Rejected = "rejected",
  Submitted = "submitted",
  Pending = "pending",
  Partial = "partial",
}

export enum LabelScope {
  Private = "private",
  Public = "public",
}

export type UID = string;

export const asRole = (roleString: string | undefined) => Object.values(UserRole).find((value) => value === roleString);

export enum UserState {
  Active = "active",
  Pending = "pending",
  Banned = "banned",
}
