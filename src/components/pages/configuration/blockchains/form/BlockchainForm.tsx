import { BlockchainsBridge, BlockchainsData } from "../BlockchainsBridge";
import { Col, Row } from "antd";
import { AutoField, AutoForm, ErrorsField, SubmitField } from "uniforms-antd";
import { useTranslation } from "react-i18next";
import {
  AdminBlockchainClientsList,
  AdminBlockchainClientsListVariables,
} from "../../../../../graphql/queries/AdminBlockchainClientsList";
import { BlockchainClientsListGQL } from "../../../../../graphql/Queries";
import { useQuery } from "../../../../../graphql/hooks";
import { renderRows } from "../../../../../utils/component-utils";

interface Props {
  onSubmit: (formModel: BlockchainsData) => void;
  formModel?: BlockchainsData;
}

export default function BlockchainForm(props: Props) {
  const { t } = useTranslation();

  const { data } = useQuery<AdminBlockchainClientsList, AdminBlockchainClientsListVariables>(BlockchainClientsListGQL);

  const blockchainClientOptions = data?.adminBlockchainClients?.map(({ client }) => client) || [];

  const formRows = [
    [
      <AutoField name="name" label={t("setter.layouts.configurations.blockchains.modal.form.name")} />,
      <AutoField name="height" label={t("setter.layouts.configurations.blockchains.modal.form.height")} />,
    ],
    [
      <AutoField
        name="client"
        label={t("setter.layouts.configurations.blockchains.modal.form.client")}
        getPopupContainer={(node: any) => node.parentNode}
        allowedValues={blockchainClientOptions}
      />,
      <AutoField
        name="min_confirmations"
        label={t("setter.layouts.configurations.blockchains.modal.form.min_confirmations")}
      />,
    ],
    [
      <AutoField name="key" label={t("setter.layouts.configurations.blockchains.modal.form.key")} />,
      <AutoField
        name="explorer_address"
        label={t("setter.layouts.configurations.blockchains.modal.form.explorer_address")}
      />,
    ],
    [
      <AutoField name="server" label={t("setter.layouts.configurations.blockchains.modal.form.server")} />,
      <AutoField
        name="explorer_transaction"
        label={t("setter.layouts.configurations.blockchains.modal.form.explorer_transaction")}
      />,
    ],
    [<AutoField name="enabled" label={t("setter.layouts.configurations.blockchains.modal.form.enabled")} />],
  ];

  return (
    <AutoForm className="setter-form" schema={BlockchainsBridge} onSubmit={props.onSubmit} model={props.formModel}>
      <Row gutter={24}>
        <Col span={24}>{renderRows(formRows)}</Col>
      </Row>
      <ErrorsField />
      <SubmitField />
    </AutoForm>
  );
}
