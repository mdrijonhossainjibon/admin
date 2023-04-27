import { UserDetailsProps } from "../UserDetailsLayout";
import { useQuery } from "../../../../../../graphql/hooks";
import { AdminOrdersGQL } from "../../../../../../graphql/Queries";
import { AdminOrders, AdminOrdersVariables } from "../../../../../../graphql/queries/AdminOrders";
import UserOrderTable from "./UserOrderTable";
import { OrderState } from "../../../../../../constants/orders";

export default function UserDetailsOpenOrders({ user }: UserDetailsProps) {
  const { data, loading } = useQuery<AdminOrders, AdminOrdersVariables>(AdminOrdersGQL, {
    variables: { uid: user.uid, state: OrderState.Wait, ordering: "desc" },
  });

  return <UserOrderTable orders={data?.adminOrders?.result || []} loading={loading} />;
}
