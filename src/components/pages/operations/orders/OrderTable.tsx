import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { AdminOrders_adminOrders_result, AdminOrdersVariables } from "../../../../graphql/queries/AdminOrders";
import { useMutation } from "../../../../graphql/hooks";
import { CancelOrder, CancelOrderVariables } from "../../../../graphql/mutations/CancelOrder";
import { CancelOrderGQL } from "../../../../graphql/Mutations";
import { Button, Modal, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/lib/table";
import { OrderSide, OrderSideColors, OrderState } from "../../../../constants/orders";
import { useDate } from "../../../../utils/hooks";
import OrderStatus from "./OrdersStatus";
import { AdminMarketsListGQL } from "../../../../graphql/Queries";
import { AdminMarketsList } from "../../../../graphql/queries/AdminMarketsList";
import { AdminMarketVariables } from "../../../../graphql/queries/AdminMarket";
import { useQuery } from "../../../../graphql/hooks";

interface Props {
  orders: AdminOrders_adminOrders_result[];
  loading: boolean;
  changeFilter?: (filter: AdminOrdersVariables) => void;
  filter?: AdminOrdersVariables;
  total?: number;
  openOrders?: boolean;
}

export default function OrderTable({ orders, loading, filter, total, changeFilter, openOrders }: Props) {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.orders.${id}`);

  const [cancelOrder, { loading: loadingCancel }] = useMutation<CancelOrder, CancelOrderVariables>(CancelOrderGQL);

  const sideFilter = Object.values(OrderSide).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const marketData = useQuery<AdminMarketsList, AdminMarketVariables>(AdminMarketsListGQL);

  const marketFilters = marketData.data?.adminMarkets?.map((el) => {
    return { text: `${String(el.name)}`, value: String(el.id) };
  });

  const handleCancel = (id: number) => {
    Modal.confirm({
      maskClosable: true,
      title: t("delete.title"),
      icon: <ExclamationCircleOutlined />,
      okText: t("delete.ok"),
      cancelText: t("delete.cancel"),
      okButtonProps: {
        loading,
      },
      onOk: () => {
        cancelOrder({ variables: { id } });
      },
    });
  };

  const columns: ColumnsType<AdminOrders_adminOrders_result> = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: t("table.email"),
      dataIndex: ["user", "email"],
      key: "email",
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
      title: t("table.amount"),
      dataIndex: "origin_volume",
      key: "origin_volume",
      sorter: (a, b) => a.origin_volume - b.origin_volume,
      width: 75,
    },
    {
      title: t("table.executed"),
      dataIndex: "executed_volume",
      key: "executed_volume",
      sorter: (a, b) => a.executed_volume - b.executed_volume,
      width: 100,
    },
    {
      title: t("table.price"),
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      width: 75,
    },
    {
      title: t("table.side"),
      dataIndex: "side",
      key: "type",
      width: 75,
      filters: sideFilter,
      filterMultiple: false,
      filtered: filter && filter.type ? true : false,
      filteredValue: filter && filter.type ? [filter.type] : [],
      render: (value: OrderSide) => (
        <Typography.Text type={OrderSideColors[value]}>{t(`side.${value}`)}</Typography.Text>
      ),
    },
    {
      title: t("table.ord_type"),
      dataIndex: "ord_type",
      key: "ord_type",
      width: 75,
      filters: [
        { text: "Limit", value: "limit" },
        { text: "Market", value: "market" }
      ],
      filterMultiple: false,
      filtered: filter && filter.ord_type ? true : false,
      filteredValue: filter && filter.ord_type ? [filter.ord_type] : [],
      render: (value) => (
        <Typography.Text>{t(`ord_type.${value}`)}</Typography.Text>
      ),
    },
    {
      title: t("table.created"),
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => formatDate(value),
    },
    // {
    //   title: t("table.updated"),
    //   dataIndex: "updated_at",
    //   key: "updated_at",
    //   render: (value: string) => formatDate(value),
    // },
    {
      title: "State",
      dataIndex: "state",
      align: "center",
      key: "state",
      render: (_, row) => <OrderStatus state={row.state} />,
    },

    openOrders
      ? {
          title: "",
          dataIndex: "delete",
          key: "delete",
          align: "center",
          width: 75,
          render: (_, row) =>
            row.state === OrderState.Wait && (
              <Button
                loading={loadingCancel}
                shape="circle"
                onClick={() => handleCancel(row.id)}
                icon={<CloseOutlined />}
                // type="ghost"
                danger={true}
              />
            ),
        }
      : {},
  ];

  return (
    <Table
      bordered
      loading={loading}
      dataSource={orders}
      rowKey="id"
      columns={columns}
      onChange={(p, f) => {
        const params: any = {
          page: p.current,
          limit: p.pageSize,
        };
        if (f.type && f.type.length !== 0) {
          params.type = f.type[0];
        }

        if (f.ord_type && f.ord_type.length !== 0) {
          params.ord_type = f.ord_type[0];
        }
        if (f.market && f.market.length !== 0) {
          params.market = f.market[0];
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
