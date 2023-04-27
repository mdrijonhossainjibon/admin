import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { AdminPending, AdminPendingVariables } from "../../../../graphql/queries/AdminPending";
import { UpdateUserLabel, UpdateUserLabelVariables } from "../../../../graphql/mutations/UpdateUserLabel";
import { DeleteUserLabel, DeleteUserLabelVariables } from "../../../../graphql/mutations/DeleteUserLabel";
import { AdminPendingGQL } from "../../../../graphql/Queries";
import { UpdateUserLabelGQL, DeleteUserLabelGQL } from "../../../../graphql/Mutations";
import { Button, PageHeader, Space, Table } from "antd";
import { FolderOpenOutlined, EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../../constants/routes";
import countryISO from "i18n-iso-countries";
import { useDate } from "../../../../utils/hooks";
import KYCDetails from "./KYCDetails";
import { useQuery, useMutation } from "../../../../graphql/hooks";
import qs from "querystring";

const parseTableData = (users: AdminPending | undefined, lang: string) =>
  users?.adminPending.result.map((user) => {
    const { profiles, documents, ...restUser } = user;
    const profile = profiles && profiles[profiles.length - 1];

    return {
      ...restUser,
      profile,
      documents,
      numDocs: documents.length,
      country: profile && profile.country ? countryISO.getName(profile.country, lang, { select: "official" }) : "",
    };
  }) || [];

type UserWithProfileUnion = ReturnType<typeof parseTableData>[number];

const Application: React.FC<React.Component> = () => {
  const history = useHistory();
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
    level: queryData.level ? Number(queryData.level) : undefined,
  };
  const [filter, setFilter] = useState<AdminPendingVariables | undefined>(query);

  const { formatDate } = useDate();
  const { i18n, t } = useTranslation();

  const lang = i18n.language.split("-")[0];

  const { data, loading, refetch } = useQuery<AdminPending, AdminPendingVariables>(AdminPendingGQL, {
    variables: { ...filter },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const onCompleted = () => refetch();

  const [verifyApp] = useMutation<UpdateUserLabel, UpdateUserLabelVariables>(UpdateUserLabelGQL, { onCompleted });

  const [rejectApp] = useMutation<DeleteUserLabel, DeleteUserLabelVariables>(DeleteUserLabelGQL, { onCompleted });

  const handleReject = (row: any) => {
    rejectApp({
      variables: {
        uid: row.uid,
        key: "document",
        scope: "private",
      },
    });
  };

  const handleVerify = (row: any) => {
    verifyApp({
      variables: {
        uid: row.uid,
        key: "document",
        scope: "private",
        value: "verified",
      },
    });
  };

  const openUserDetails = (uid: any) => {
    history.push(Routes.withParams.UsersDetailsKYC({ uid }));
  };

  const columns: ColumnsType<UserWithProfileUnion> = [
    {
      title: t("setter.layouts.users.table.userId"),
      dataIndex: "uid",
      key: "uid",
      width: 150,
    },
    {
      title: t("setter.layouts.users.table.email"),
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: t("setter.layouts.users.table.name"),
      dataIndex: "name",
      key: "name",
      // sorter: sortUser("first_name"),
      render: (_, row) => [row.profile.first_name, row.profile.last_name].join(" "),
    },
    {
      title: t("setter.layouts.users.table.country"),
      dataIndex: "country",
      key: "country",
      width: 100,
      // sorter: sortUser("country"),
    },
    {
      title: t("setter.layouts.users.table.created"),
      dataIndex: "created_at",
      key: "created_at",
      width: 175,
      // sorter: sortUser("created_at"),
      render: (value: string) => formatDate(value),
    },
    {
      title: t("setter.layouts.users.table.attachments"),
      dataIndex: "numDocs",
      key: "numDocs",
      width: 120,
      render: (value: number) => (
        <>
          {value} <FolderOpenOutlined />
        </>
      ),
    },
    {
      title: "",
      dataIndex: "details",
      key: "x",
      align: "center",
      width: 250,
      render: (_, row) => {
        return (
          <>
            <Button type="primary" danger onClick={() => handleReject(row)}>
              Reject
            </Button>
            &nbsp;
            <Button type="primary" onClick={() => handleVerify(row)}>
              Verify
            </Button>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openUserDetails(row.uid)} />;
      },
    },
  ];

  return (
    <PageHeader
      ghost={false}
      title="Users"
      extra={[
        <Space>
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
            {t("setter.layouts.configurations.blockchains.table.reload")}
          </Button>
        </Space>,
      ]}
    >
      {data && [
        <Table
          bordered
          loading={false}
          dataSource={parseTableData(data, lang)}
          columns={columns}
          rowKey="uid"
          tableLayout="fixed"
          pagination={{
            position: ["bottomLeft"],
            total: data ? data.adminPending.total : undefined,
            current: filter ? filter.page : undefined,
            pageSize: filter ? filter.limit : undefined,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          expandable={{
            expandedRowRender: (record) => {
              return record && record.documents ? <KYCDetails record={record} /> : <p />;
            },
          }}
          onChange={(p) => {
            const params: any = {
              page: p.current,
              limit: p.pageSize,
            };
            const queryString = qs.stringify(params);
            history.push({ search: queryString });
            setFilter(params);
          }}
        />,
      ]}
    </PageHeader>
  );
};

export default Application;
