import { Table } from "antd";
import { UserDetailsProps } from "../UserDetailsLayout";
import {
  AdminMember,
  AdminMember_adminMember_accounts,
  AdminMemberVariables,
} from "../../../../../../graphql/queries/AdminMember";
import { ColumnsType } from "antd/lib/table";
import { useQuery } from "../../../../../../graphql/hooks";
import { AdminMemberGQL } from "../../../../../../graphql/Queries";
import { useTranslation } from "react-i18next";

export default function UserDetailsBalances({ user }: UserDetailsProps) {
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.users.details.balances.${id}`);

  const { data, loading } = useQuery<AdminMember, AdminMemberVariables>(AdminMemberGQL, {
    variables: { uid: user.uid },
  });

  const columns: ColumnsType<AdminMember_adminMember_accounts> = [
    {
      title: t("currency"),
      dataIndex: ["currency", "code"],
      key: "currencyCode",
      render: (value: string) => value.toUpperCase(),
    },
    {
      title: t("available"),
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: t("locked"),
      dataIndex: "locked",
      key: "locked",
    },
    {
      title: t("total"),
      dataIndex: "total",
      key: "total",
      render: (_, row) => row.balance + row.locked,
    },
  ];

  return (
    <Table
      loading={loading}
      dataSource={data?.adminMember?.accounts}
      columns={columns}
      rowKey="currencyCode"
      pagination={{ position: ["bottomLeft"] }}
    />
  );
}
