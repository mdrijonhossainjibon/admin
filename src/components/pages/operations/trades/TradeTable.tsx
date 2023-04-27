import { AdminTrades_adminTrades_result, AdminTradesVariables } from "../../../../graphql/queries/AdminTrades";
import { useDate } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/lib/table";
import { OrderSide, OrderSideColors } from "../../../../constants/orders";
import { Table, Typography } from "antd";
import { useQuery } from "../../../../graphql/hooks";
import { AdminMarketsListGQL } from "../../../../graphql/Queries";
import { AdminMarketsList } from "../../../../graphql/queries/AdminMarketsList";
import { AdminMarketVariables } from "../../../../graphql/queries/AdminMarket";

interface Props {
  trades: AdminTrades_adminTrades_result[];
  loading: boolean;
  changeFilter?: (filter: AdminTradesVariables) => void;
  filter?: AdminTradesVariables;
  total?: number;
  userId?: string;
}

export default function TradeTable({ trades, loading, filter, total, userId, changeFilter }: Props) {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.trades.${id}`);

  const marketData = useQuery<AdminMarketsList, AdminMarketVariables>(AdminMarketsListGQL);

  const marketFilters = marketData.data?.adminMarkets?.map((el) => {
    return { text: `${String(el.name)}`, value: String(el.id) };
  });

  console.log(marketFilters, " currency_codeFilters currency_codeFilters currency_codeFilters ");

  const columns: ColumnsType<AdminTrades_adminTrades_result> = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: t("table.maker"),
      dataIndex: ["maker", "email"],
      key: "makerEmail",
      render: (_, row) => (
        <>
          {row.maker.email} ({row.maker.uid})
        </>
      ),
    },
    {
      title: t("table.taker"),
      dataIndex: ["taker", "email"],
      key: "takerEmail",
      render: (_, row) => (
        <>
          {row.taker.email} ({row.taker.uid})
        </>
      ),
    },
    {
      title: t("table.market"),
      dataIndex: ["market", "name"],
      key: "market",
      width: 100,
      filters: marketFilters,
      filterMultiple: false,
      filtered: filter && filter.market ? true : false,
      filteredValue: filter && filter.market ? [filter.market] : [],
      render: (name: string) => name.toUpperCase(),
    },
    {
      title: t("table.price"),
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      width: 75,
    },
    {
      title: t("table.amount"),
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      width: 75,
    },
    {
      title: t("table.total"),
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total - b.total,
      width: 75,
    },
    {
      title: t("table.side"),
      dataIndex: "taker_type",
      key: "taker_type",
      width: 75,
      render: (value: OrderSide, row) => {
        if (userId && row.taker.uid === userId) {
          return (<Typography.Text type={OrderSideColors[value]}>{t(`side.${value}`)}</Typography.Text>);
        } else {
          return (<Typography.Text type={OrderSideColors[value]}>{t(`side.${value === "sell" ? "buy" : "sell"}`)}</Typography.Text>);
        }
      },
    },
    {
      title: t("table.time"),
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => formatDate(value),
    },
  ];

  return (
    <Table
      bordered
      loading={loading}
      dataSource={trades}
      rowKey="id"
      columns={columns}
      onChange={(p, f) => {
        const params: any = {
          page: p.current,
          limit: p.pageSize,
        };
        if (f.market && f.market.length !== 0) {
          params.market = f.market[0];
        }
        console.log(f.market);

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
