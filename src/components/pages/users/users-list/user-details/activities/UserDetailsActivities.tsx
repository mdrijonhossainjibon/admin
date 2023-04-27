import React from "react";
import { UserDetailsProps } from "../UserDetailsLayout";
import { Table, Typography } from "antd";
// import { Button, Table, Typography, DatePicker, Space } from "antd";
// import { FilterOutlined } from "@ant-design/icons";
import { useDate } from "../../../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { UAParser } from "ua-parser-js";
import { useQuery } from "../../../../../../graphql/hooks";
import { useHistory } from "react-router-dom";
import { AdminUserActivitiesGQL } from "../../../../../../graphql/Queries";
import {
  AdminUserActivities,
  AdminUserActivitiesVariables,
} from "../../../../../../graphql/queries/AdminUserActivities";
import { ActivityResult } from "../../../../../../constants/user";
import { BlockProps } from "antd/lib/typography/Base";
import qs from "querystring";
// import moment from "moment";

const activityColors: { [key in ActivityResult]: BlockProps["type"] } = {
  [ActivityResult.Succeed]: "success",
  [ActivityResult.Denied]: "danger",
  [ActivityResult.Failed]: "danger",
};

interface Props {
  loading: boolean;
}

export default function UserDetailsActivities({ user, loading }: UserDetailsProps & Props) {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();
  const history = useHistory();
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query: any = {
    ...queryData,
    uid: user.uid,
    limit: queryData.limit ? queryData.limit : "20",
    page: queryData.page ? queryData.page : "1",
  };
  const [filterA, setFilterA] = React.useState<AdminUserActivitiesVariables | undefined>(query);

  const { data } = useQuery<AdminUserActivities, AdminUserActivitiesVariables>(AdminUserActivitiesGQL, {
    variables: { ...filterA },
  });
  const activities = data?.adminUserActivities.result.map((activity) => {
    const ua = new UAParser(activity.user_agent);
    const noteObj = activity.data && JSON.parse(activity.data);

    let note: string | undefined = undefined;

    if (noteObj) {
      if (noteObj.note) note = noteObj.note;
      if (noteObj.reason) note = noteObj.reason;
    }

    return {
      ...activity,
      note,
      browser: ua.getBrowser().name,
      os: ua.getOS().name,
    };
  });

  const t = (id: string) => translate(`setter.layouts.users.details.activities.${id}`);

  // const topicFilters = [
  //   {text: "password", value: "password"},
  //   {text: "session", value: "session"},
  //   {text: "otp", value: "otp"}
  // ]

  const columns = [
    {
      title: t("date"),
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => formatDate(value),
      // filterDropdown: (props: {setSelectedKeys: (selectedKeys: React.Key[]) => void, selectedKeys: React.Key[], confirm: () => void}) => (
      //   <div style={{ width: 236, padding: 8 }}>
      //     <DatePicker.RangePicker
      //       value={
      //         filterA?.from && filterA?.to ? [moment.unix(Number(filterA.from)), moment.unix(Number(filterA.to))] : null
      //       }
      //       onChange={(date) => {
      //         if (date && date[0] && date[1]) {
      //           props.confirm();
      //           const params = {
      //             ...filterA,
      //             from: String(date[0].unix()),
      //             to: String(date[1].unix()),
      //           };
      //           const queryString = qs.stringify(params);
      //           history.push({ search: queryString });
      //           setFilterA(params);
      //           props.setSelectedKeys([`${params.from}-${params.to}`]);
      //         }
      //       }}
      //       style={{ marginBottom: 8, width: 220 }}
      //     />
      //     <Space>
      //       <Button
      //         type="primary"
      //         onClick={() => {
      //           props.confirm();
      //           const params = {
      //             ...filterA,
      //             from: String(props.selectedKeys[0]).split("-")[0],
      //             to: String(props.selectedKeys[0]).split("-")[1],
      //           };
      //           const queryString = qs.stringify(params);
      //           history.push({ search: queryString });
      //           setFilterA(params);
      //         }}
      //         icon={<FilterOutlined />}
      //         size="small"
      //         style={{ width: 106 }}
      //       >
      //         Search
      //       </Button>
      //       <Button
      //         onClick={() => {
      //           let params = Object();
      //           params = {
      //             ...filterA,
      //           };
      //           if (params && params.from && params.to) {
      //             delete params.from;
      //             delete params.to;
      //           }
      //           const queryString = qs.stringify(params);
      //           history.push({ search: queryString });
      //           setFilterA(params);
      //         }}
      //         size="small"
      //         style={{ width: 106 }}
      //       >
      //         Reset
      //       </Button>
      //     </Space>
      //   </div>
      // ),
      // filtered: filterA && filterA.from && filterA.to ? true : false,
      // filteredValue: filterA && filterA.from && filterA.to ? [`${filterA.from}-${filterA.to}`] : [],
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      // filters: topicFilters,
      // filterMultiple: false,
      // filtered: filterA && filterA.topic ? true : false,
      // filteredValue: filterA && filterA.topic ? [filterA.topic] : [],
    },
    {
      title: t("result.title"),
      dataIndex: "result",
      key: "result",
      render: (value: ActivityResult) => (
        <Typography.Text type={activityColors[value]}>{t(`result.${value}`)}</Typography.Text>
      ),
    },
    {
      title: t("note"),
      dataIndex: "note",
      key: "note",
    },
    {
      title: t("ip"),
      dataIndex: "user_ip",
      key: "user_ip",
    },
    {
      title: t("browser"),
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: t("os"),
      dataIndex: "os",
      key: "os",
    },
  ];

  return (
    <>
      <Table
        dataSource={activities || []}
        columns={columns}
        loading={loading}
        onChange={(p) => {
          const params: any = {
            page: String(p.current),
            limit: String(p.pageSize),
          };
          // if (f.topic && f.topic.length !== 0) {
          //   params.topic = f.topic[0];
          // }
          const queryString = qs.stringify(params);
          history.push({ search: queryString });
          setFilterA(params);
        }}
        pagination={{
          position: ["bottomLeft"],
          total: data ? data.adminUserActivities.total : undefined,
          current: filterA ? Number(filterA.page) : undefined,
          pageSize: filterA ? Number(filterA.limit) : undefined,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
      />
    </>
  );
}
