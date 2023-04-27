import { useState } from "react";
import { AdminPermissionsGQL } from "../../../../graphql/Queries";
import {
  AdminPermissions,
  AdminPermissionsVariables,
  AdminPermissions_adminPermissions_result,
} from "../../../../graphql/queries/AdminPermissions";
import { ReloadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Button, Space, Modal, PageHeader, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "../../../../graphql/hooks";
import PermissionForm from "./form/PermissionForm";
import { Tag } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { DeletePermission, DeletePermissionVariables } from "../../../../graphql/mutations/DeletePermission";
import { DeletePermissionGQL } from "../../../../graphql/Mutations";
import { useMutation } from "../../../../graphql/hooks";

export default function UserPermissions() {
  const { t: translate } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<AdminPermissions_adminPermissions_result | undefined>(undefined);

  const t = (id: string) => translate(`setter.layouts.devops.userPermissions.${id}`);

  const { data, loading, refetch } = useQuery<AdminPermissions, AdminPermissionsVariables>(AdminPermissionsGQL, {
    notifyOnNetworkStatusChange: true,
  });

  const paginationOptions: any = {
    position: ["bottomLeft"],
    list: (d: any) => d.adminPermissions.result,
    limit: (d: any) => d.adminPermissions.perPage,
    total: (d: any) => d.adminPermissions.total,
  };

  const handleModal = (isOpen: boolean, data?: AdminPermissions_adminPermissions_result) => {
    setModalOpen(isOpen);
    setModalData(data);
  };

  const closeModal = () => {
    handleModal(false);
  };

  const [deletePermission] = useMutation<DeletePermission, DeletePermissionVariables>(DeletePermissionGQL, {
    successMessage: t("form.deletedSuccess"),
  });

  const columns: ColumnsType<AdminPermissions_adminPermissions_result> = [
    {
      title: t("table.role"),
      dataIndex: "role",
      key: "role",
    },
    {
      title: t("table.verb"),
      dataIndex: "verb",
      key: "verb",
      render: (verb: string) => {
        return <Tag>{verb.toUpperCase()}</Tag>;
      },
    },
    {
      title: t("table.path"),
      dataIndex: "path",
      key: "path",
    },
    {
      title: t("table.topic"),
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: t("table.action"),
      dataIndex: "action",
      key: "action",
      render: (action: string) => {
        const colorTag = action === "ACCEPT" ? "success" : action === "DROP" ? "error" : "default";
        return <Tag color={colorTag}>{action.toUpperCase()}</Tag>;
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
              placement="topRight"
              title={t("delete.title")}
              onConfirm={() => {
                const variables: DeletePermissionVariables = {
                  id: row.id,
                };
                deletePermission({ variables });
              }}
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
        title={translate("setter.layouts.devops.nav.userPermissions")}
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
        dataSource={data?.adminPermissions.result || []}
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
        <PermissionForm initialData={modalData} onCompleted={closeModal} />
      </Modal>
    </>
  );
}
