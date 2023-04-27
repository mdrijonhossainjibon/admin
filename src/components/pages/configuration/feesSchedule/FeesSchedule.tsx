import { useState } from "react";
import { useQuery } from "../../../../graphql/hooks";
import { useHistory } from "react-router-dom";
import { AdminTradingFeesGQL } from "../../../../graphql/Queries";
import {
  AdminTradingFees,
  AdminTradingFees_adminTradingFees,
  AdminTradingFeesVariables,
} from "../../../../graphql/queries/AdminTradingFees";
import { Tooltip, Button, Space, Modal, PageHeader } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/lib/table";
import FeesScheduleForm from "./FeesScheduleForm";
import { useTranslation } from "react-i18next";
import qs from "querystring";

export default function FeesSchedule() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<AdminTradingFees_adminTradingFees | undefined>(undefined);
  const { t: translate } = useTranslation();
  const history = useHistory();

  const t = (id: string) => translate(`setter.layouts.configurations.feesSchedule.${id}`);

  const { loading, data, refetch } = useQuery<AdminTradingFees, AdminTradingFeesVariables>(AdminTradingFeesGQL, {
    notifyOnNetworkStatusChange: true,
  });

  const handleModal = (isOpen: boolean, data?: AdminTradingFees_adminTradingFees) => {
    setModalOpen(isOpen);
    setModalData(data);
  };

  const handleDelete = (fee: AdminTradingFees_adminTradingFees) => {
    Modal.confirm({
      maskClosable: true,
      title: t("delete.title"),
      icon: <ExclamationCircleOutlined />,
      okText: t("delete.confirm"),
      cancelText: t("delete.cancel"),
      onOk: () => {
        console.log("confirm delete", fee.id);
      },
    });
  };

  const columns: ColumnsType<AdminTradingFees_adminTradingFees> = [
    { title: t("table.id"), dataIndex: "id", key: "id" },
    { title: t("table.group"), dataIndex: "group", key: "group" },
    { title: t("table.market"), dataIndex: "market_id", key: "market_id" },
    { title: t("table.maker"), dataIndex: "maker", key: "maker" },
    { title: t("table.taker"), dataIndex: "taker", key: "taker" },
    {
      title: "",
      align: "center",
      width: 100,
      dataIndex: "actions",
      key: "actions",
      className: "actions-cell",
      render: (_, row) => (
        <Space size="middle" className="actions-container">
          <Tooltip title={t("table.edit")}>
            <Button shape="circle" icon={<EditOutlined />} onClick={() => handleModal(true, row)} />
          </Tooltip>
          <Tooltip title={t("table.delete")}>
            <Button shape="circle" icon={<DeleteOutlined />} onClick={() => handleDelete(row)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        ghost={false}
        className="setter-page-header"
        title={translate("setter.layouts.configurations.nav.feesSchedule")}
        extra={[
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
            {t("table.reload")}
          </Button>,
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + {t("table.new")}
          </Button>,
        ]}
      >
        <Table
          bordered
          className="fees-schedule-table"
          columns={columns}
          loading={false}
          dataSource={data?.adminTradingFees}
          rowKey="id"
          pagination={{
            position: ["bottomLeft"],
            total: data?.adminTradingFees.length,
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
        />
        <Modal
          title={modalData ? t("form.edit") : t("form.create")}
          visible={isModalOpen}
          onCancel={() => handleModal(false)}
          footer={null}
          destroyOnClose={true}
        >
          <FeesScheduleForm initialData={modalData} onCompleted={() => handleModal(false)} />
        </Modal>
      </PageHeader>
    </>
  );
}
