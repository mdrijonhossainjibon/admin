/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminUserActivities
// ====================================================

export interface AdminUserActivities_adminUserActivities_result {
  __typename: "AdminUserActivity";
  action: string;
  created_at: string;
  data: string;
  result: string;
  topic: string;
  user_agent: string;
  user_ip: string;
}

export interface AdminUserActivities_adminUserActivities {
  __typename: "AdminUserActivitiesPaginated";
  page: number;
  total: number;
  perPage: number;
  result: AdminUserActivities_adminUserActivities_result[];
}

export interface AdminUserActivities {
  adminUserActivities: AdminUserActivities_adminUserActivities;
}

export interface AdminUserActivitiesVariables {
  _barong_session?: string;
  uid?: string;
  page?: string;
  limit?: string;
  action?: string;
  topic?: string;
  from?: string;
  to?: string;
}
