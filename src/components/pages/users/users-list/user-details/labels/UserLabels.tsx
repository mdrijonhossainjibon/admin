import React, { useState } from "react";
import { Button, Card, Tag, Typography, Modal, Space, Tooltip, Descriptions, Empty } from "antd";
import { AdminUser_adminUser_labels } from "../../../../../../graphql/queries/AdminUser";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "../../../../../../graphql/hooks";
import { DeleteUserLabelGQL } from "../../../../../../graphql/Mutations";
import { DeleteUserLabel, DeleteUserLabelVariables } from "../../../../../../graphql/mutations/DeleteUserLabel";
import LabelForm from "./LabelForm";
import { useTranslation } from "react-i18next";
import { UserDetailsProps } from "../UserDetailsLayout";

export default function UserLabels({ user }: UserDetailsProps) {
  const { t: translate } = useTranslation();
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [formData, setFormData] = useState<AdminUser_adminUser_labels | undefined>(undefined);

  const [deleteUserLabel] = useMutation<DeleteUserLabel, DeleteUserLabelVariables>(DeleteUserLabelGQL);

  const t = (id: string) => translate(`setter.layouts.users.details.labels.${id}`);

  const handleDelete = (e: React.MouseEvent, label: AdminUser_adminUser_labels) => {
    e.stopPropagation();

    Modal.confirm({
      maskClosable: true,
      title: t("confirm.title"),
      icon: <ExclamationCircleOutlined />,
      okText: t("confirm.ok"),
      cancelText: t("confirm.cancel"),
      onOk: () =>
        deleteUserLabel({
          variables: {
            uid: user.uid,
            key: label.key,
            scope: label.scope,
          },
        }),
    });
  };

  const handleFormModal = (isOpen: boolean, formData?: AdminUser_adminUser_labels) => {
    setFormModalOpen(isOpen);
    setFormData(formData);
  };

  const handleFormComplete = () => {
    setFormModalOpen(false);
  };

  return (
    <Card className="setter-details-card">
      <Descriptions
        title={
          <Space>
            <Typography.Text strong>{t("title")}</Typography.Text>{" "}
            <Button type="primary" onClick={() => setFormModalOpen(true)}>
              + {t("new")}
            </Button>
          </Space>
        }
      >
        <Descriptions.Item>
          {user.labels.length ? (
            user.labels?.map((item) => (
              <Tag
                key={item.key}
                color="success"
                tabIndex={0}
                onClick={() => handleFormModal(true, item)}
                style={{ padding: "0.25rem 0.75rem" }}
              >
                <Space size={8}>
                  <span>
                    {item.key}:{item.value}
                  </span>
                  <Tooltip title={t("delete")}>
                    <Button
                      type="ghost"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={(e) => handleDelete(e, item)}
                    />
                  </Tooltip>
                </Space>
              </Tag>
            ))
          ) : (
            <Empty description={t("noLabels")} />
          )}
        </Descriptions.Item>
      </Descriptions>
      <Modal
        title={formData ? t("form.edit") : t("form.create")}
        visible={isFormModalOpen}
        onCancel={() => handleFormModal(false)}
        footer={null}
        destroyOnClose={true}
      >
        <LabelForm user={user} onCompleted={handleFormComplete} initialData={formData} />
      </Modal>
    </Card>
  );
}
