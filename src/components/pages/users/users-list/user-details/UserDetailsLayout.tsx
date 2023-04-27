import { lazy } from "react";
import { PageHeader, Spin, Tabs } from "antd";
import { RouteParams, Routes, UserRouteParams } from "../../../../../constants/routes";
import { useHistory, useLocation, useParams, Switch, Route, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sortMenuItems } from "../../../../TabbedMenuLayout";
import { AdminSimpleUserGQL } from "../../../../../graphql/Queries";
import {
  AdminSimpleUser,
  AdminSimpleUser_adminUserWithoutActivities,
  AdminSimpleUserVariables,
} from "../../../../../graphql/queries/AdminSimpleUser";
import { UserState } from "../../../../../constants/user";
import { useQuery } from "../../../../../graphql/hooks";

const UserDetailsMainInfo = lazy(() => import("./main/UserDetailsMainInfo"));
const UserDetailsKyc = lazy(() => import("./kyc/UserDetailsKYC"));
const UserDetailsOpenOrders = lazy(() => import("./open-orders/UserDetailsOpenOrders"));
const UserDetailsBalances = lazy(() => import("./balances/UserDetailsBalances"));
const UserDetailsHistory = lazy(() => import("./history/UserDetailsHistory"));
const UserDetailsActivities = lazy(() => import("./activities/UserDetailsActivities"));

export interface UserDetailsProps {
  user: AdminSimpleUser_adminUserWithoutActivities;
}

export default function UserDetailsLayout() {
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const { uid } = useParams<RouteParams<UserRouteParams>>();

  const handleTabChange = (key: string) => {
    if (key !== location.pathname) {
      history.push(key);
    }
  };

  const { data: adminUser, loading } = useQuery<AdminSimpleUser, AdminSimpleUserVariables>(AdminSimpleUserGQL, {
    variables: { uid },
  });

  const user = adminUser?.adminUserWithoutActivities;

  const menuItems = [
    {
      key: Routes.withParams.UsersDetails({ uid }),
      content: t("setter.layouts.users.details.nav.main"),
      show: true,
    },
    {
      key: Routes.withParams.UsersDetailsKYC({ uid }),
      content: t("setter.layouts.users.details.nav.kyc"),
      show: true,
    },
    {
      key: Routes.withParams.UsersDetailsOpenOrders({ uid }),
      content: t("setter.layouts.users.details.nav.openOrders"),
      show: user?.state === UserState.Active,
    },
    {
      key: Routes.withParams.UsersDetailsBalances({ uid }),
      content: t("setter.layouts.users.details.nav.balances"),
      show: user?.state === UserState.Active,
    },
    {
      key: Routes.withParams.UsersDetailsHistory({ uid }),
      content: t("setter.layouts.users.details.nav.history"),
      show: user?.state === UserState.Active,
    },
    {
      key: Routes.withParams.UsersDetailsActivities({ uid }),
      content: t("setter.layouts.users.details.nav.activities"),
      show: user?.state === UserState.Active,
    },
  ];

  const selectedKey = sortMenuItems(menuItems).find((item) => location.pathname.includes(item.key))?.key;

  return (
    <>
      <PageHeader ghost={false} onBack={() => history.goBack()} title={user?.email} subTitle={uid}>
        <Tabs activeKey={selectedKey} onChange={handleTabChange}>
          {!loading && menuItems.map((item) => item.show && <Tabs.TabPane tab={item.content} key={item.key} />)}
        </Tabs>
      </PageHeader>
      {user ? (
        <Switch>
          <Route exact path={Routes.UsersDetails} render={() => <UserDetailsMainInfo {...{ user }} />} />
          <Route path={Routes.UsersDetailsKYC} render={() => <UserDetailsKyc {...{ user }} />} />
          {user.state === UserState.Active && (
            <>
              <Route path={Routes.UsersDetailsOpenOrders} render={() => <UserDetailsOpenOrders {...{ user }} />} />
              <Route path={Routes.UsersDetailsBalances} render={() => <UserDetailsBalances {...{ user }} />} />
              <Route path={Routes.UsersDetailsHistory} render={() => <UserDetailsHistory {...{ user }} />} />
              <Route
                path={Routes.UsersDetailsActivities}
                render={() => <UserDetailsActivities {...{ user, loading }} />}
              />
            </>
          )}
          <Redirect to={Routes.withParams.UsersDetails({ uid })} />
        </Switch>
      ) : (
        loading && (
          <div className="spinner-container">
            <Spin size="large" className="setter-spinner-centered" />
          </div>
        )
      )}
    </>
  );
}
