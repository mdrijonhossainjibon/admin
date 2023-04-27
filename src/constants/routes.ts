import { generatePath } from "react-router-dom";

interface CreateRouteParams {
  [key: string]: any;
}

type AtLeastOneParam<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

const createRoute = <Params extends AtLeastOneParam<CreateRouteParams> = AtLeastOneParam<{}>>(path: string) => {
  return (params?: Params) => {
    if (params) {
      return generatePath(path, params);
    }

    return path;
  };
};

const createRoutes = <T extends CreateRouteParams>(routeConfig: T) => {
  const rawRoutes = {} as { [K in keyof T]: ReturnType<T[K]> };
  const withParams = {} as { [K in keyof T]: T[K] };

  Object.entries(routeConfig).forEach(([key, path]) => {
    rawRoutes[key as keyof T] = path();
    withParams[key as keyof T] = path;
  });

  return {
    ...rawRoutes,
    withParams,
  };
};

export type UserRouteParams = { uid: string };
export type BlockchainRouteParams = { id: number };
export type WalletRouteParams = { id: number };
export type MarketRouteParams = { id: string };
export type CurrencyRouteParams = { code: string };
export type WithdrawalRouteParams = { id: number };
export type AdjustmentRouteParams = { id: number };
export type DepositDetailsRouteParams = { tid: string };

// utility type to use with useParams
export type RouteParams<T extends object> = { [key in keyof T]: string };

/*
  Return routes with typed parameters.
  Usage:
    Routes.MarketsDetails => "/setter/internal/configuration/markets/:id"
    Routes.withParams.MarketsDetails({ id: 5 }) => "/setter/internal/configuration/markets/5"
*/
export const Routes = createRoutes({
  //DASHBOARD ROUTES START
  Dashboard: createRoute("/setter/internal/dashboard"),
  //DASHBOARD ROUTES END

  //USERS ROUTES START
  Users: createRoute("/setter/internal/users"),
  UsersDetails: createRoute<UserRouteParams>("/setter/internal/users/details/:uid"),
  UsersDetailsKYC: createRoute<UserRouteParams>("/setter/internal/users/details/:uid/kyc"),
  UsersDetailsOpenOrders: createRoute<UserRouteParams>("/setter/internal/users/details/:uid/open-orders"),
  UsersDetailsBalances: createRoute<UserRouteParams>("/setter/internal/users/details/:uid/balances"),
  UsersDetailsHistory: createRoute<UserRouteParams>("/setter/internal/users/details/:uid/history"),
  UsersDetailsActivities: createRoute<UserRouteParams>("/setter/internal/users/details/:uid/activities"),
  Applications: createRoute("/setter/internal/users/applications"),
  Activities: createRoute("/setter/internal/users/activities"),
  //USERS ROUTES END

  //OPERATIONS ROUTES START
  Operations: createRoute("/setter/internal/operations"),
  Deposits: createRoute("/setter/internal/operations/deposits"),
  DepositsDetails: createRoute<DepositDetailsRouteParams>("/setter/internal/operations/deposits/details/:tid"),

  Withdrawals: createRoute("/setter/internal/operations/withdrawals"),
  WithdrawalDetails: createRoute<WithdrawalRouteParams>("/setter/internal/operations/withdrawals/details/:id"),
  PendingWithdrawals: createRoute("/setter/internal/operations/pend-withdrawals"),

  Adjustments: createRoute("/setter/internal/operations/adjustments"),
  AdjustmentDetails: createRoute<AdjustmentRouteParams>("/setter/internal/operations/adjustments/details/:id"),

  Orders: createRoute("/setter/internal/operations/orders"),
  Trades: createRoute("/setter/internal/operations/trades"),

  BusinessAnalytics: createRoute("/setter/internal/operations/business-analytics"),
  Assets: createRoute("/setter/internal/operations/business-analytics/assets"),
  Expenses: createRoute("/setter/internal/operations/business-analytics/expenses"),
  Revenues: createRoute("/setter/internal/operations/business-analytics/revenues"),
  Liabilities: createRoute("/setter/internal/operations/business-analytics/liabilities"),

  //OPERATIONS ROUTES END

  //CONFIGURATION ROUTES START
  Configuration: createRoute("/setter/internal/configuration"),

  Blockchains: createRoute("/setter/internal/configuration/blockchains"),
  BlockchainsDetails: createRoute<BlockchainRouteParams>("/setter/internal/configuration/blockchains/details/:id"),
  BlockchainsDetailsEdit: createRoute<BlockchainRouteParams>(
    "/setter/internal/configuration/blockchains/details/:id/edit"
  ),

  Currencies: createRoute("/setter/internal/configuration/currencies"),
  CurrenciesDetails: createRoute<CurrencyRouteParams>("/setter/internal/configuration/currencies/details/:code"),
  CurrenciesDetailsEdit: createRoute<CurrencyRouteParams>(
    "/setter/internal/configuration/currencies/details/:code/edit"
  ),

  Wallets: createRoute("/setter/internal/configuration/wallets"),
  WalletsDetails: createRoute<WalletRouteParams>("/setter/internal/configuration/wallets/details/:id"),
  WalletsDetailsEdit: createRoute<WalletRouteParams>("/setter/internal/configuration/wallets/details/:id/edit"),

  Markets: createRoute("/setter/internal/configuration/markets"),
  MarketsDetails: createRoute<MarketRouteParams>("/setter/internal/configuration/markets/:id"),
  MarketsDetailsEdit: createRoute<MarketRouteParams>("/setter/internal/configuration/markets/:id/edit"),

  FeesSchedule: createRoute("/setter/internal/configuration/fees-schedule"),
  //CONFIGURATION ROUTES END

  //DEVOPS ROUTES START
  Devops: createRoute("/setter/internal/devops"),
  Restrictions: createRoute("/setter/internal/devops"),
  UserPermissions: createRoute("/setter/internal/devops/user-permissions"),
  //DEVOPS ROUTES END

  Login: createRoute("/setter/login"),
});
