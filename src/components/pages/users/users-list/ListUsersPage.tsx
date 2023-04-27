import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { AdminListUsers, AdminListUsersVariables } from "../../../../graphql/queries/AdminListUsers";
import { AdminListUsersGQL } from "../../../../graphql/Queries";
import { Button, PageHeader, Input, DatePicker, Space, Table } from "antd";
import { EllipsisOutlined, FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { UID, UserRole, UserState } from "../../../../constants/user";
import { Routes } from "../../../../constants/routes";
import { useDate } from "../../../../utils/hooks";
// import UserFilterForm from "./form/UserFilterForm";
import { useQuery } from "../../../../graphql/hooks";
import countryISO from "i18n-iso-countries";
import UserStatus from "../UserStatus/UserStatus";
import qs from "querystring";
import moment from "moment";

const parseTableData = (users: AdminListUsers | undefined, lang: string) => {
  return (
    users?.adminUsers.result.map((user) => {
      const { profiles, ...restUser } = user;
      const profile = profiles && profiles[profiles.length - 1];

      return {
        ...profile,
        ...restUser,
        country: profile && profile.country ? countryISO.getName(profile.country, lang, { select: "official" }) : "",
      };
    }) || []
  );
};

type UserWithProfileUnion = ReturnType<typeof parseTableData>[number];

// const sortUser = (key: keyof UserWithProfileUnion) => (a: UserWithProfileUnion, b: UserWithProfileUnion) => {
//   return (a[key] || "") > (b[key] || "") ? 1 : (b[key] || "") > (a[key] || "") ? -1 : 0;
// };

const ListUsersPage: React.FC<React.Component> = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 50,
    page: queryData.page ? Number(queryData.page) : 1,
    level: queryData.level ? Number(queryData.level) : undefined,
  };
  const [filter, setFilter] = useState<AdminListUsersVariables | undefined>(query);

  const { i18n, t } = useTranslation();

  const lang = i18n.language.split("-")[0];

  const { formatDate } = useDate();

  // const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, loading, refetch } = useQuery<AdminListUsers, AdminListUsersVariables>(AdminListUsersGQL, {
    variables: { ...filter },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const roleFilters = Object.values(UserRole).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const stateFilters = Object.values(UserState).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const levelFilters = [0, 1, 2, 3].map((el) => {
    return { text: `${t("setter.layouts.users.table.level")} ${String(el)}`, value: String(el) };
  });

  const openUserDetails = (uid: UID) => {
    history.push(Routes.withParams.UsersDetails({ uid }));
  };

  const columns: ColumnsType<UserWithProfileUnion> = [
    {
      title: t("setter.layouts.users.table.userId"),
      dataIndex: "uid",
      key: "uid",
      width: 150,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={"Enter full UID"}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => {
              confirm();
              const params = {
                ...filter,
                uid: String(selectedKeys[0]),
              };
              const queryString = qs.stringify(params);
              history.push({ search: queryString });
              setFilter(params);
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
                const params = {
                  ...filter,
                  uid: String(selectedKeys[0]),
                };
                const queryString = qs.stringify(params);
                history.push({ search: queryString });
                setFilter(params);
              }}
              icon={<FilterOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                let params = Object();
                params = {
                  ...filter,
                };
                if (params && params.uid) {
                  delete params.uid;
                }
                const queryString = qs.stringify(params);
                history.push({ search: queryString });
                setFilter(params);
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
    },
    {
      title: t("setter.layouts.users.table.role"),
      dataIndex: "role",
      key: "role",
      align: "center",
      filters: roleFilters,
      filterMultiple: false,
      filtered: filter && filter.role ? true : false,
      filteredValue: filter && filter.role ? [filter.role] : [],
      width: 150,
    },
    {
      title: t("setter.layouts.users.table.level"),
      dataIndex: "level",
      key: "level",
      align: "center",
      filters: levelFilters,
      filterMultiple: false,
      filtered: filter && filter.level ? true : false,
      filteredValue: filter && filter.level ? [String(filter.level)] : [],
      width: 100,
    },
    {
      title: t("setter.layouts.users.table.email"),
      dataIndex: "email",
      key: "email",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={"Enter full email"}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => {
              confirm();
              const params = {
                ...filter,
                email: String(selectedKeys[0]),
              };
              const queryString = qs.stringify(params);
              history.push({ search: queryString });
              setFilter(params);
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
                const params = {
                  ...filter,
                  email: String(selectedKeys[0]),
                };
                const queryString = qs.stringify(params);
                history.push({ search: queryString });
                setFilter(params);
              }}
              icon={<FilterOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                let params = Object();
                params = {
                  ...filter,
                };
                if (params && params.email) {
                  delete params.email;
                }
                const queryString = qs.stringify(params);
                history.push({ search: queryString });
                setFilter(params);
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filtered: filter && filter.email ? true : false,
      filteredValue: filter && filter.email ? [String(filter.email)] : [],
    },
    {
      title: t("setter.layouts.users.table.name"),
      dataIndex: "name",
      key: "name",
      width: 150,
      // sorter: sortUser("first_name"),
      render: (_, row) => [row.first_name, row.last_name].join(" "),
    },
    {
      title: t("setter.layouts.users.table.referralUid"),
      dataIndex: "referral_uid",
      key: "referral_uid",
      width: 150,
      // sorter: sortUser("referral_uid"),
    },
    {
      title: t("setter.layouts.users.table.country"),
      dataIndex: "country",
      key: "country",
      width: 100,
      // sorter: sortUser("country"),
    },
    {
      title: t("setter.layouts.users.table.state"),
      dataIndex: "state",
      align: "center",
      width: 150,
      // sorter: sortUser("state"),
      filters: stateFilters,
      filterMultiple: false,
      filtered: filter && filter.state ? true : false,
      filteredValue: filter && filter.state ? [filter.state] : [],
      render: (state) => {
        return <UserStatus state={state} />;
      },
    },
    {
      title: t("setter.layouts.users.table.created"),
      dataIndex: "created_at",
      key: "created_at",
      width: 175,
      // sorter: sortUser("created_at"),
      render: (value: string) => formatDate(value),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ width: 236, padding: 8 }}>
          <DatePicker.RangePicker
            value={
              filter?.from && filter?.to ? [moment.unix(Number(filter.from)), moment.unix(Number(filter.to))] : null
            }
            onChange={(date) => {
              if (date && date[0] && date[1]) {
                confirm();
                const params = {
                  ...filter,
                  from: String(date[0].unix()),
                  to: String(date[1].unix()),
                };
                const queryString = qs.stringify(params);
                history.push({ search: queryString });
                setFilter(params);
                setSelectedKeys([`${params.from}-${params.to}`]);
              }
            }}
            style={{ marginBottom: 8, width: 220 }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
                const params = {
                  ...filter,
                  from: String(selectedKeys[0]).split("-")[0],
                  to: String(selectedKeys[0]).split("-")[1],
                };
                const queryString = qs.stringify(params);
                history.push({ search: queryString });
                setFilter(params);
              }}
              icon={<FilterOutlined />}
              size="small"
              style={{ width: 106 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                let params = Object();
                params = {
                  ...filter,
                };
                if (params && params.from && params.to) {
                  delete params.from;
                  delete params.to;
                }
                const queryString = qs.stringify(params);
                history.push({ search: queryString });
                setFilter(params);
              }}
              size="small"
              style={{ width: 106 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filtered: filter && filter.from && filter.to ? true : false,
      filteredValue: filter && filter.from && filter.to ? [`${filter.from}-${filter.to}`] : [],
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
          pagination={{
            position: ["bottomLeft"],
            total: data ? data.adminUsers.total : undefined,
            current: filter ? filter.page : undefined,
            pageSize: filter ? filter.limit : undefined,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          onChange={(p, f) => {
            const params: any = {
              page: p.current,
              limit: p.pageSize,
            };
            if (f.level && f.level.length !== 0) {
              params.level = Number(f.level[0]);
            }
            if (f.state && f.state.length !== 0) {
              params.state = f.state[0];
            }
            if (f.role && f.role.length !== 0) {
              params.role = f.role[0];
            }
            const queryString = qs.stringify(params);
            history.push({ search: queryString });
            setFilter(params);
          }}
          // onRow={(user) => ({
          //   tabIndex: 0,
          //   onClick: () => openUserDetails(user.uid),
          //   onKeyDown: (e) => e.key === "Enter" && openUserDetails(user.uid),
          // })}
        />,
      ]}
    </PageHeader>
  );
};

export default ListUsersPage;
