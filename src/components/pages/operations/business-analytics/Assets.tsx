import React, { useState } from "react";
import { AdminAssetsGQL } from "../../../../graphql/Queries";
import {
  AdminAssets,
  AdminAssets_adminAssets_result,
  AdminAssetsVariables,
} from "../../../../graphql/queries/AdminAssets";
import { ColumnsType } from "antd/lib/table";
import { useQuery } from "../../../../graphql/hooks";
import { Table } from "antd";
import { useDate } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import qs from "querystring";

export default function Assets() {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.businessAnalytics.assets.${id}`);

  const history = useHistory();
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 50,
    page: queryData.page ? Number(queryData.page) : 1,
  };
  const [filter, setFilter] = useState<AdminAssetsVariables>(query);

  const { data, loading } = useQuery<AdminAssets, AdminAssetsVariables>(AdminAssetsGQL, {
    variables: {
      ...filter,
    },
    notifyOnNetworkStatusChange: true,
    pollInterval: 10000,
  });

  const changeFilter = (filter: AdminAssetsVariables) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };

  const columns: ColumnsType<AdminAssets_adminAssets_result> = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("code"),
      dataIndex: "code",
      key: "code",
    },
    {
      title: t("currency"),
      dataIndex: ["currency", "code"],
      key: "currencyCode",
      render: (value: string) => value.toUpperCase(),
    },
    {
      title: t("refId"),
      key: "rid",
      dataIndex: "rid",
    },
    {
      title: t("refType"),
      key: "reference_type",
      dataIndex: "reference_type",
    },
    {
      title: t("credit"),
      key: "credit",
      dataIndex: "credit",
    },
    {
      title: t("debit"),
      key: "debit",
      dataIndex: "debit",
    },
    {
      title: t("date"),
      key: "created_at",
      dataIndex: "created_at",
      render: (value: string) => formatDate(value),
    },
  ];

  const total =
    filter && filter.limit && filter.page
      ? filter.limit * (filter.page + (data && data.adminAssets.result.length === filter.limit ? 1 : 0))
      : undefined;

  return (
    <React.Fragment>
      <Table
        bordered
        loading={loading}
        dataSource={data?.adminAssets.result}
        rowKey="id"
        columns={columns}
        onChange={(p) => {
          const params: any = {
            page: p.current,
            limit: p.pageSize,
          };
          if (changeFilter) {
            changeFilter(params);
          }
        }}
        pagination={{
          position: ["bottomLeft"],
          total,
          current: filter ? filter.page : undefined,
          pageSize: filter ? filter.limit : undefined,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
      />
      {/* <PaginationComponent /> */}
    </React.Fragment>
  );
}
