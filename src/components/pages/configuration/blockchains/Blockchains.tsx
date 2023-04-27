import { useState } from "react";
import { BlockchainsListGQL } from "../../../../graphql/Queries";
import { Button, Table, PageHeader } from "antd";
import {
  AdminBlockchains,
  AdminBlockchains_adminBlockchains,
  AdminBlockchainsVariables,
} from "../../../../graphql/queries/AdminBlockchains";
import { UpdateBlockchain, UpdateBlockchainVariables } from "../../../../graphql/mutations/UpdateBlockchain";
import { UpdateBlockchainMutationGql } from "../../../../graphql/Mutations";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
import { BlockchainsData } from "./BlockchainsBridge";
import BlockchainFormModal from "./modal/BlockchainFormModal";
import { CreateBlockchainMutationGql } from "../../../../graphql/Mutations";
import { CreateBlockchain, CreateBlockchainVariables } from "../../../../graphql/mutations/CreateBlockchain";
import { Routes } from "../../../../constants/routes";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "../../../../graphql/hooks";
import { useDate } from "../../../../utils/hooks";
import ToggleSwitch from "../ToggleSwitch";

export default function Blockchains() {
  const { t } = useTranslation();
  const history = useHistory();
  const [isCreateModalVisible, setCreateModalState] = useState(false);
  const { loading, data, refetch } = useQuery<AdminBlockchains, AdminBlockchainsVariables>(BlockchainsListGQL, {
    notifyOnNetworkStatusChange: true,
  });

  const { formatDate } = useDate();

  const [createBlockchain] = useMutation<CreateBlockchain, CreateBlockchainVariables>(CreateBlockchainMutationGql);
  const [updateBlockchain, { error: updateError }] = useMutation<UpdateBlockchain, UpdateBlockchainVariables>(
    UpdateBlockchainMutationGql
  );

  const handleCreateCancel = () => {
    setCreateModalState(false);
  };

  const handleToggle = (variables: AdminBlockchains_adminBlockchains) => {
    updateBlockchain({
      variables,
    });
  };

  const submitCreateForm = async (formModel: BlockchainsData) => {
    await createBlockchain({
      variables: {
        key: formModel.key,
        name: formModel.name,
        client: formModel.client,
        height: formModel.height,
        explorer_transaction: formModel.explorer_transaction,
        explorer_address: formModel.explorer_address,
        server: formModel.server,
        enabled: formModel.enabled,
        min_confirmations: formModel.min_confirmations,
      },
    });

    setCreateModalState(false);
  };

  const openBlockchainDetails = (id: number) => {
    history.push(Routes.withParams.BlockchainsDetails({ id }));
  };

  const onClickAddNewBlockchain = () => {
    setCreateModalState(true);
  };

  const columns: ColumnsType<AdminBlockchains_adminBlockchains> = [
    {
      title: t("setter.layouts.configurations.blockchains.table.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.key"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.client"),
      dataIndex: "client",
      key: "client",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.height"),
      dataIndex: "height",
      key: "height",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.createdAt"),
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => formatDate(date),
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.status.title"),
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render: (_, record: AdminBlockchains_adminBlockchains) => (
        <ToggleSwitch value={record} name="enabled" onChange={handleToggle} error={updateError} />
      ),
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openBlockchainDetails(row.id)} />;
      },
    },
  ];

  return (
    <>
      <PageHeader
        ghost={false}
        className="setter-page-header"
        title={t("setter.layouts.configurations.nav.blockchains")}
        extra={[
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
            {t("setter.layouts.configurations.blockchains.table.reload")}
          </Button>,
          <Button type="primary" onClick={onClickAddNewBlockchain}>
            + {t("setter.layouts.configurations.blockchains.table.new")}
          </Button>,
        ]}
      >
        <Table
          bordered
          dataSource={data?.adminBlockchains}
          rowKey="id"
          columns={columns}
          loading={false}
          pagination={{ position: ["bottomLeft"] }}
          // onRow={(blockchain) => ({
          //   tabIndex: 0,
          //   onClick: () => openBlockchainDetails(blockchain.id),
          //   onKeyDown: (e) => e.key === "Enter" && openBlockchainDetails(blockchain.id),
          // })}
        />
        <BlockchainFormModal
          isModalVisible={isCreateModalVisible}
          onCancel={handleCreateCancel}
          onSubmit={submitCreateForm}
          titleKey="setter.layouts.configurations.blockchains.modal.title.create"
        />
      </PageHeader>
    </>
  );
}
