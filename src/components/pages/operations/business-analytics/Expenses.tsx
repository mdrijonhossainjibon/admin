import React, { useState } from "react";
import { useDate } from "../../../../utils/hooks";
import { useQuery } from "../../../../graphql/hooks";
import { AdminExpensesGQL } from "../../../../graphql/Queries";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/lib/table";
import { Table } from "antd";
import {
  AdminExpenses,
  AdminExpenses_adminExpenses_result,
  AdminExpensesVariables,
} from "../../../../graphql/queries/AdminExpenses";
import { useHistory } from "react-router-dom";
import qs from "querystring";

export default function Expenses() {
  const { formatDate } = useDate();

  const history = useHistory();
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 50,
    page: queryData.page ? Number(queryData.page) : 1,
  };
  const [filter, setFilter] = useState<AdminExpensesVariables>(query);

  const { data, loading } = useQuery<AdminExpenses, AdminExpensesVariables>(AdminExpensesGQL, {
    variables: {
      ...filter,
    },
    notifyOnNetworkStatusChange: true,
    pollInterval: 10000,
  });

  const changeFilter = (filter: AdminExpensesVariables) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };

  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.businessAnalytics.expenses.${id}`);

  const columns: ColumnsType<AdminExpenses_adminExpenses_result> = [
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
      ? filter.limit * (filter.page + (data && data.adminExpenses.result.length === filter.limit ? 1 : 0))
      : undefined;

  return (
    <React.Fragment>
      <Table
        bordered
        loading={loading}
        dataSource={data?.adminExpenses.result}
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
    </React.Fragment>
  );
}
