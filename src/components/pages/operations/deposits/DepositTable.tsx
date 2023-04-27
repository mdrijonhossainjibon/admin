import { AdminDeposits_adminDeposits_result, AdminDepositsVariables } from "../../../../graphql/queries/AdminDeposits";
import { useDate } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import Table, { ColumnsType } from "antd/lib/table";
import { EllipsisOutlined, LinkOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Routes } from "../../../../constants/routes";
import { useHistory } from "react-router-dom";
import DepositType from "./DepositType";
import DepositStateCell from "./DepositState";
import { DepositState, DepositTypes } from "../../../../constants/deposits";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../graphql/queries/AdminCurrenciesList";
import { AdminCurrenciesListGQL } from "../../../../graphql/Queries";
import { useQuery } from "../../../../graphql/hooks";

// const depositDetails = lazy(() => import("./depositDetails/DepositDetails"));

interface Props {
  deposits: AdminDeposits_adminDeposits_result[];
  loading: boolean;
  changeFilter?: (filter: AdminDepositsVariables) => void;
  total?: number;
  filter?: AdminDepositsVariables;
}

export default function DepositTable({ deposits, loading, changeFilter, total, filter }: Props) {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();
  const history = useHistory();

  const t = (id: string) => translate(`setter.layouts.operations.deposits.${id}`);

  const currencyData = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(AdminCurrenciesListGQL, {
    notifyOnNetworkStatusChange: true,
  });

  const stateFilters = Object.values(DepositState).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const typeFilters = Object.values(DepositTypes).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const currency_codeFilters = filter?.type
    ? currencyData.data?.adminCurrencies
        ?.filter((el) => el.type === filter.type)
        .map((el) => {
          return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
        })
    : currencyData.data?.adminCurrencies?.map((el) => {
        return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
      });

  const openDepositDetails = (tid: string) => {
    history.push(Routes.withParams.DepositsDetails({ tid }));
  };

  const columns: ColumnsType<AdminDeposits_adminDeposits_result> = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("table.uid"),
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: t("table.txid"),
      dataIndex: "txid",
      key: "txid",
      // width: 350,
      render: (txid: string, row) => {
        const href = row.currency?.explorer_transaction?.replace("#{txid}", txid);
        function truncate(input: string) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 8) + "...";
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
      title: t("table.type"),
      dataIndex: "type",
      align: "center",
      key: "type",
      filters: typeFilters,
      filterMultiple: false,
      filtered: filter && filter.type ? true : false,
      filteredValue: filter && filter.type ? [filter.type] : [],
      render: (type: string) => {
        return <DepositType type={type} />;
      },
    },
    {
      title: t("table.created_at"),
      dataIndex: "created_at",
      key: "created_at",
      // sorter: (a, b) => (moment(formatDate(a.created_at)).unix()) - moment(formatDate(b.created_at)).unix(),
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("table.amount"),
      dataIndex: "amount",
      align: "right",
      sorter: (a, b) => a.amount - b.amount,
      key: "amount",
    },
    {
      title: t("table.currency_code"),
      dataIndex: "currency_code",
      key: "currency",
      filters: currency_codeFilters,
      filterMultiple: false,
      filtered: filter && filter.currency ? true : false,
      filteredValue: filter && filter.currency ? [filter.currency] : [],
      render: (code: string) => code?.toUpperCase(),
    },
    {
      title: t("table.confirmations"),
      dataIndex: "confirmations",
      align: "center",
      key: "confirmations",
    },
    {
      title: t("table.state.title"),
      dataIndex: "state",
      align: "center",
      key: "state",
      filters: stateFilters,
      filterMultiple: false,
      filtered: filter && filter.state ? true : false,
      filteredValue: filter && filter.state ? [filter.state] : [],
      render: (_, row) => <DepositStateCell deposit={row} />,
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openDepositDetails(row.tid)} />;
      },
    },
  ];

  return (
    <Table
      bordered
      loading={loading}
      dataSource={deposits}
      rowKey="tid"
      columns={columns}
      onChange={(p, f) => {
        const params: any = {
          page: p.current,
          limit: p.pageSize,
        };
        if (f.currency && f.currency.length !== 0) {
          params.currency = f.currency[0];
        }
        if (f.state && f.state.length !== 0) {
          params.state = f.state[0];
        }
        if (f.type && f.type.length !== 0) {
          if (f.type[0] !== filter?.type) {
            delete params.currency;
          }
          params.type = f.type[0];
        }
        if (changeFilter) {
          changeFilter(params);
        }
      }}
      pagination={{
        position: ["bottomLeft"],
        total: total || undefined,
        current: filter ? filter.page : undefined,
        pageSize: filter ? filter.limit : undefined,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
    />
  );
}
