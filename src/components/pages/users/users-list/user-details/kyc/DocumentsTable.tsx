import { useDate } from "../../../../../../utils/hooks";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { AdminUser_adminUser_documents } from "../../../../../../graphql/queries/AdminUser";

interface Props {
  documents: AdminUser_adminUser_documents[];
}

export default function DocumentsTable({ documents }: Props) {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.users.details.kyc.documents.${id}`);

  const columns = [
    {
      title: t("url"),
      dataIndex: ["upload", "url"],
      key: "upload",
    },
    {
      title: t("type"),
      dataIndex: "doc_type",
      key: "doc_type",
    },
    {
      title: t("number"),
      dataIndex: "doc_number",
      key: "doc_number",
    },
    {
      title: t("expiry"),
      dataIndex: "doc_expire",
      key: "doc_expire",
      render: (value: string) => formatDate(value, "dd.MM.yyyy"),
    },
    {
      title: t("created"),
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => formatDate(value),
    },
  ];

  return <Table pagination={false} dataSource={documents} columns={columns} rowKey="upload" />;
}
