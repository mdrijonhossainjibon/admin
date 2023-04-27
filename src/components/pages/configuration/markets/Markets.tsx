import { useState } from "react";
import { useMutation, useQuery } from "../../../../graphql/hooks";
import { EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  AdminMarketsList,
  AdminMarketsList_adminMarkets,
  AdminMarketsListVariables,
} from "../../../../graphql/queries/AdminMarketsList";
import { AdminMarketsListGQL } from "../../../../graphql/Queries";
import { Table, Switch, Button, Modal, PageHeader } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import MarketsForm from "./form/MarketsForm";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../../constants/routes";

import { UpdateMarketGQL } from "../../../../graphql/Mutations";
import { UpdateMarket, UpdateMarketVariables } from "../../../../graphql/mutations/UpdateMarket";
import { useDate } from "../../../../utils/hooks";
import qs from "querystring";

export default function Markets() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { formatDate } = useDate();

  const { t: translate } = useTranslation();
  const history = useHistory();

  const { data, loading, refetch } = useQuery<AdminMarketsList, AdminMarketsListVariables>(AdminMarketsListGQL, {
    notifyOnNetworkStatusChange: true,
  });

  const [updateMarket] = useMutation<UpdateMarket, UpdateMarketVariables>(UpdateMarketGQL);

  const goToMarketDetails = (id: string) => {
    history.push(Routes.withParams.MarketsDetails({ id }));
  };

  const t = (id: string) => translate(`setter.layouts.configurations.markets.${id}`);

  const columns: ColumnsType<AdminMarketsList_adminMarkets> = [
    {
      title: t("table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("table.baseCurrency"),
      dataIndex: ["base_currency", "name"],
      key: "base_currency.name",
    },
    {
      title: t("table.quoteCurrency"),
      dataIndex: ["quote_currency", "name"],
      key: "quote_currency.name",
    },
    {
      title: t("table.created"),
      dataIndex: "created_at",
      key: "created_at",
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("table.updated"),
      dataIndex: "updated_at",
      key: "updated_at",
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("table.maxPrice"),
      dataIndex: "max_price",
      key: "max_price",
    },
    {
      title: t("table.minPrice"),
      dataIndex: "min_price",
      key: "min_price",
    },
    {
      title: t("table.minAmount"),
      dataIndex: "min_amount",
      key: "min_amount",
    },
    {
      title: t("table.status.title"),
      dataIndex: "enabled",
      key: "enabled",
      render: (value: boolean, record: AdminMarketsList_adminMarkets) => (
        <Switch
          size="small"
          onClick={(_, e) => e.stopPropagation()}
          defaultChecked={value}
          onChange={(val) => {
            console.log(record);
            updateMarket({
              variables: {
                ...record,
                max_price: Number(record.max_price),
                min_price: Number(record.min_price),
                min_amount: Number(record.min_amount),
                enabled: val,
              },
            });
          }}
        />
      ),
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => goToMarketDetails(row.id)} />;
      },
    },
  ];

  return (
    <>
      <PageHeader
        ghost={false}
        className="setter-page-header"
        title={translate("setter.layouts.configurations.nav.markets")}
        extra={[
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch && refetch()}>
            {t("table.reload")}
          </Button>,
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + {t("table.new")}
          </Button>,
        ]}
      >
        <Table
          bordered
          dataSource={data?.adminMarkets}
          rowKey="id"
          columns={columns}
          loading={false}
          pagination={{
            position: ["bottomLeft"],
            total: data?.adminMarkets.length,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          onChange={(p) => {
            const params: any = {
              page: p.current,
              limit: p.pageSize,
            };
            const queryString = qs.stringify(params);
            history.push({ search: queryString });
          }}
          // onRow={(market) => ({
          //   tabIndex: 0,
          //   onClick: () => goToMarketDetails(market.id),
          //   onKeyDown: (e) => e.key === "Enter" && goToMarketDetails(market.id),
          // })}
        />
        <Modal
          title={t("modal.create")}
          visible={isModalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          destroyOnClose={true}
        >
          <MarketsForm onCompleted={() => setModalOpen(false)} />
        </Modal>
      </PageHeader>
    </>
  );
}
