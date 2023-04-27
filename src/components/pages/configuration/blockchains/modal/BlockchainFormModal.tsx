import { BlockchainsData } from "../BlockchainsBridge";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import BlockchainForm from "../form/BlockchainForm";

interface Props {
  isModalVisible: boolean;
  onCancel: () => void;
  onSubmit: (formModel: BlockchainsData) => void;
  titleKey: string;
}

export default function BlockchainFormModal(props: Props) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t(props.titleKey)}
      visible={props.isModalVisible}
      onCancel={props.onCancel}
      okText={t("setter.layouts.configurations.blockchains.modal.save")}
      cancelText={t("setter.layouts.configurations.blockchains.modal.cancel")}
      footer={null}
      width="75%"
    >
      <BlockchainForm onSubmit={props.onSubmit} />
    </Modal>
  );
}
