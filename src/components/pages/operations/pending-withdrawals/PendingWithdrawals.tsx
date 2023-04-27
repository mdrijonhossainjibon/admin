import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { CurrencyType } from "../../../../constants/currencies";
import { useTranslation } from "react-i18next";
import { useQuery } from "../../../../graphql/hooks";
import {
  AdminWithdraws,
  AdminWithdrawsVariables,
  AdminWithdraws_adminWithdraws_result,
} from "../../../../graphql/queries/AdminWithdraws";
import { AdminWithdrawsGQL } from "../../../../graphql/Queries";
import { Space, Tabs, Table, PageHeader, Button } from "antd";
import { EllipsisOutlined, ReloadOutlined, LinkOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDate } from "../../../../utils/hooks";
import { Routes } from "../../../../constants/routes";
import { WithdrawState } from "../../../../constants/withdraws";
import qs from "querystring";
import WithdrawalStatus from "../withdrawals/WithdrawalStatus";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../graphql/queries/AdminCurrenciesList";
import { AdminCurrenciesListGQL } from "../../../../graphql/Queries";

export default function PendingWithdrawals() {
  const history = useHistory();
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
    type: queryData.type ? String(queryData.type) : "coin",
    ordering: "desc",
    state: [WithdrawState.Errored, WithdrawState.Accepted, WithdrawState.Skipped, WithdrawState.Confirming],
  };

  const currencyData = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(AdminCurrenciesListGQL, {
    notifyOnNetworkStatusChange: true,
  });
  
  const [filter, setFilter] = useState<AdminWithdrawsVariables | undefined>(query);

  const currency_codeFilters = (filter && filter.type)
  ? currencyData.data?.adminCurrencies
      ?.filter((el) => el.type === filter.type)
      .map((el) => {
        return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
      })
  : currencyData.data?.adminCurrencies?.map((el) => {
      return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
    });

  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.withdrawals.table.${id}`);

  const { formatDate } = useDate();

  const { data, loading, refetch } = useQuery<AdminWithdraws, AdminWithdrawsVariables>(AdminWithdrawsGQL, {
    variables: { ...filter },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const panes = [
    { tab: t("panes.coin"), key: CurrencyType.Coin },
    { tab: t("panes.fiat"), key: CurrencyType.Fiat },
  ];

  const openWithdrawalDetails = (id: number) => {
    history.push(Routes.withParams.WithdrawalDetails({ id }));
  };

  const columns: ColumnsType<AdminWithdraws_adminWithdraws_result> = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("txid.title"),
      dataIndex: "blockchain_txid",
      key: "txid",
      // width: 250,
      render: (txid: string, row) => {
        const href = row.currency?.explorer_transaction?.replace("#{txid}", txid);

        function truncate(input: string) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 2) + "...";
          }
          return input;
        }
        return txid ? (
          <>
            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
              {truncate(txid)}
            </Button>
          </>
        ) : null;
      },
    },
    {
      title: t("created_at"),
      dataIndex: "created_at",
      key: "created_at",
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("currency"),
      dataIndex: ["currency", "code"],
      key: "currency",
      filters: currency_codeFilters,
      filterMultiple: false,
      filtered: filter && filter.currency ? true : false,
      filteredValue: filter && filter.currency ? [filter.currency] : [],
      render: (code: string) => code.toUpperCase(),
    },
    {
      title: t("amount"),
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      key: "amount",
    },
    {
      title: t("rid"),
      dataIndex: "rid",
      key: "rid",
      // width: 250,
      align: "center",
      render: (rid: string, row) => {
        const href = row.currency?.explorer_address?.replace("#{address}", rid);
        console.log(row.currency?.explorer_address, "row.currency row.currency row.currency");

        function truncate(input: string) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 2) + "...";
          }
          return input;
        }
        return rid ? (
          <>
            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
              {truncate(rid)}
            </Button>
          </>
        ) : null;
      },
    },
    {
      title: t("state.title"),
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (_, row) => <WithdrawalStatus withdrawal={row} />,
    },
    {
      title: "",
      dataIndex: "details",
      align: "center",
      // width: 75,
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openWithdrawalDetails(row.id)} />;
      },
    },
  ];

  const changeFilter = (filter: AdminWithdrawsVariables | undefined) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };

  const changeCurrencyType = (type: string) => {
    const params = { ...filter, type };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(params);
  };

  return (
    <>
      <PageHeader
        className="setter-page-header"
        ghost={false}
        title={translate("setter.layouts.operations.nav.pendingWithdrawals")}
        extra={[
          <Space>
            <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
              {t("reload")}
            </Button>
          </Space>,
        ]}
      >
        <Tabs defaultActiveKey={filter?.type} onChange={changeCurrencyType}>
          {panes.map((pane) => (
            <Tabs.TabPane {...pane} />
          ))}
        </Tabs>

        <Table
          tableLayout={"auto"}
          bordered
          loading={loading}
          dataSource={data?.adminWithdraws.result.map((el) => {
            return { ...el, email: el.member.user.email };
          })}
          rowKey="id"
          columns={columns}
          pagination={{
            position: ["bottomLeft"],
            total: data?.adminWithdraws.total,
            current: filter ? filter.page : undefined,
            pageSize: filter ? filter.limit : undefined,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          onChange={(p, f) => {
            const params: any = {
              ...filter,
              page: p.current,
              limit: p.pageSize,
            };
            if (f.currency && f.currency.length !== 0) {
              params.currency = f.currency[0];
            } else {
              if (params.currency) {
                delete params.currency;
              }
            }
            if (changeFilter) {
              changeFilter(params);
            }
          }}
        />
      </PageHeader>
    </>
  );
}
