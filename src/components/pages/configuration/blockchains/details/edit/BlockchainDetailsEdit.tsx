import { useEffect, useState } from "react";
import { Button, InputNumber, message, Skeleton, Row, Col, Card, Space } from "antd";
import { BlockchainsData } from "../../BlockchainsBridge";
import BlockchainForm from "../../form/BlockchainForm";
import { ApolloError, useMutation } from "@apollo/client";
import { UpdateBlockchain, UpdateBlockchainVariables } from "../../../../../../graphql/mutations/UpdateBlockchain";
import { UpdateBlockchainHeightGQL, UpdateBlockchainMutationGql } from "../../../../../../graphql/Mutations";
import { useHistory, useParams } from "react-router-dom";
import { useErrorContext } from "../../../../../context/error-context";
import { useTranslation } from "react-i18next";
import { BlockchainRouteParams, RouteParams, Routes } from "../../../../../../constants/routes";
import { BlockchainSingle } from "../../../../../../graphql/queries/BlockchainSingle";
import {
  UpdateBlockchainHeight,
  UpdateBlockchainHeightVariables,
} from "../../../../../../graphql/mutations/UpdateBlockchainHeight";

interface Props {
  data?: BlockchainSingle;
  loading: boolean;
}

export default function BlockchainDetailsEdit(props: Props) {
  const { handleApolloError } = useErrorContext();
  const { id } = useParams<RouteParams<BlockchainRouteParams>>();
  const { t } = useTranslation();
  const history = useHistory();
  const [blockchainHeight, setBlockchainHeight] = useState(0);
  const [updateBlockchain] = useMutation<UpdateBlockchain, UpdateBlockchainVariables>(UpdateBlockchainMutationGql);
  const [resetBlockchainHeight] = useMutation<UpdateBlockchainHeight, UpdateBlockchainHeightVariables>(
    UpdateBlockchainHeightGQL
  );

  useEffect(() => {
    if (props.data?.adminBlockchain?.height) setBlockchainHeight(props.data?.adminBlockchain?.height);
  }, [props.data?.adminBlockchain?.height]);

  const formModel: BlockchainsData = {
    name: props.data?.adminBlockchain?.name,
    enabled: props.data?.adminBlockchain?.enabled,
    client: props.data?.adminBlockchain?.client,
    key: props.data?.adminBlockchain?.key,
    server: props.data?.adminBlockchain?.server,
    height: props.data?.adminBlockchain?.height,
    explorer_address: props.data?.adminBlockchain?.explorer_address,
    explorer_transaction: props.data?.adminBlockchain?.explorer_transaction,
    min_confirmations: props.data?.adminBlockchain?.min_confirmations,
  };

  const submitUpdateForm = (formModel: BlockchainsData) => {
    updateBlockchain({
      variables: {
        id: Number(id),
        key: formModel.key,
        name: formModel.name,
        client: formModel.client,
        explorer_transaction: formModel.explorer_transaction,
        explorer_address: formModel.explorer_address,
        server: formModel.server,
        enabled: formModel.enabled,
        min_confirmations: formModel.min_confirmations,
      },
    }).then(
      () => {
        message.success(t("setter.global.messages.success.update"));
        history.push(Routes.withParams.BlockchainsDetails({ id: Number(id) }));
      },
      (error: ApolloError) => {
        handleApolloError(error);
      }
    );
  };

  const updateBlockchainHeight = () => {
    resetBlockchainHeight({ variables: { id: Number(id), height: blockchainHeight } }).then(
      () => {
        message.success(t("setter.global.messages.success.blockchain.height"));
      },
      (error: ApolloError) => {
        handleApolloError(error);
      }
    );
  };

  const heightInputOnChange = (value: number | string | undefined) => {
    if (value) {
      setBlockchainHeight(Number(value));
    }
  };

  if (props.loading) return <Skeleton active paragraph={{ rows: 9 }} />;

  return (
    <>
      <Row gutter={[24, 16]}>
        <Col md={24} lg={18}>
          <Card>
            <BlockchainForm onSubmit={submitUpdateForm} formModel={formModel} />
          </Card>
        </Col>
        <Col md={24} lg={6}>
          <Card>
            <Space direction="vertical">
              <InputNumber
                style={{ width: "100%" }}
                value={blockchainHeight}
                onChange={(value) => heightInputOnChange(value)}
              />

              <Button style={{ width: 100 }} type="primary" onClick={updateBlockchainHeight}>
                {t("setter.layouts.configurations.blockchains.details.edit.reset")}
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
}
