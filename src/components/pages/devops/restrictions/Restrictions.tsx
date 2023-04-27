import { useState } from "react";
import { AdminRestrictionsGQL } from "../../../../graphql/Queries";
import {
  AdminRestrictions,
  AdminRestrictionsVariables,
  AdminRestrictions_adminRestrictions_result,
} from "../../../../graphql/queries/AdminRestrictions";
import { ReloadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Button, Space, Modal, PageHeader, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "../../../../graphql/hooks";
import RestrictionForm from "./form/RestrictionForm";
import { Tag } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { DeleteRestriction, DeleteRestrictionVariables } from "../../../../graphql/mutations/DeleteRestriction";
import { DeleteRestrictionGQL } from "../../../../graphql/Mutations";
import { useMutation } from "../../../../graphql/hooks";

export default function Restrictions() {
  const { t: translate } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<AdminRestrictions_adminRestrictions_result | undefined>(undefined);

  const t = (id: string) => translate(`setter.layouts.devops.restrictions.${id}`);

  const { data, loading, refetch } = useQuery<AdminRestrictions, AdminRestrictionsVariables>(AdminRestrictionsGQL, {
    notifyOnNetworkStatusChange: true,
  });

  const paginationOptions: any = {
    position: ["bottomLeft"],
    list: (d: any) => d.adminRestrictions.result,
    limit: (d: any) => d.adminRestrictions.perPage,
    total: (d: any) => d.adminRestrictions.total,
  };

  const handleModal = (isOpen: boolean, data?: AdminRestrictions_adminRestrictions_result) => {
    setModalOpen(isOpen);
    setModalData(data);
  };

  const closeModal = () => {
    handleModal(false);
  };

  const [deleteRestriction] = useMutation<DeleteRestriction, DeleteRestrictionVariables>(DeleteRestrictionGQL, {
    successMessage: t("form.deletedSuccess"),
  });

  const columns: ColumnsType<AdminRestrictions_adminRestrictions_result> = [
    {
      title: t("table.category"),
      dataIndex: "category",
      key: "category",
      render: (category: string) => {
        return <Tag>{category.toUpperCase()}</Tag>;
      },
    },
    {
      title: t("table.scope"),
      dataIndex: "scope",
      key: "scope",
    },
    {
      title: t("table.value"),
      dataIndex: "value",
      key: "value",
    },
    {
      title: t("table.state"),
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (state: string) => {
        return <Tag>{state.toUpperCase()}</Tag>;
      },
    },
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
            <Popconfirm
              title={t("delete.title")}
              onConfirm={() => {
                const variables: DeleteRestrictionVariables = {
                  id: row.id,
                };
                deleteRestriction({ variables });
              }}
              placement="topRight"
              okText={t("delete.confirm")}
              cancelText={t("delete.cancel")}
            >
              <Button danger shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        ghost={false}
        title={translate("setter.layouts.devops.nav.restrictions")}
        extra={[
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
            {t("table.reload")}
          </Button>,
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + {t("table.new")}
          </Button>,
        ]}
      />
      <Table
        loading={loading}
        dataSource={data?.adminRestrictions.result || []}
        rowKey="id"
        columns={columns}
        pagination={paginationOptions}
      />
      <Modal
        title={t("form.title")}
        visible={isModalOpen}
        onCancel={() => handleModal(false)}
        footer={null}
        destroyOnClose={true}
      >
        <RestrictionForm initialData={modalData} onCompleted={closeModal} />
      </Modal>
    </>
  );
}
