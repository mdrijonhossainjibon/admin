import { Badge, Button, Descriptions, List, Skeleton } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  BlockchainSingle,
  BlockchainSingle_adminBlockchain_currencies,
} from "../../../../../../graphql/queries/BlockchainSingle";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../../../../constants/routes";
import { useTranslation } from "react-i18next";
import { useDate } from "../../../../../../utils/hooks";

interface Props {
  data?: BlockchainSingle;
  loading: boolean;
}

export default function BlockchainDetailsMain(props: Props) {
  const history = useHistory();
  const { t: translate } = useTranslation();
  const { formatDate } = useDate();

  const t = (id: string) => translate(`setter.layouts.configurations.blockchains.details.${id}`);

  const goToCurrencyDetails = (code: string) => {
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  };

  if (props.loading) {
    return <Skeleton active paragraph={{ rows: 9 }} />;
  }
  return (
    <Descriptions bordered column={3}>
      <Descriptions.Item label={t("name")}>
        {props.data?.adminBlockchain?.name} ({props.data?.adminBlockchain?.key})<br />
        <Badge
          status={props.data?.adminBlockchain?.enabled ? "success" : "error"}
          text={props.data?.adminBlockchain?.enabled ? t("enabled") : t("disabled")}
        />
      </Descriptions.Item>

      <Descriptions.Item label={t("height")}>{props.data?.adminBlockchain?.height}</Descriptions.Item>

      <Descriptions.Item label={t("client")}>{props.data?.adminBlockchain?.client}</Descriptions.Item>
      <Descriptions.Item label={t("server")}>{props.data?.adminBlockchain?.server}</Descriptions.Item>
      <Descriptions.Item label={t("minConfirmations")}>
        {props.data?.adminBlockchain?.min_confirmations}
      </Descriptions.Item>

      <Descriptions.Item label={t("dates")}>
        {t("createdAt")}: {formatDate(props.data?.adminBlockchain?.created_at)}
        <br />
        {t("updatedAt")}: {formatDate(props.data?.adminBlockchain?.updated_at)}
      </Descriptions.Item>

      <Descriptions.Item label={t("explorer")}>
        {props.data?.adminBlockchain?.explorer_address}
        <br />
        {props.data?.adminBlockchain?.explorer_transaction}
      </Descriptions.Item>

      <Descriptions.Item label={t("currencies")} span={2}>
        <List
          itemLayout="horizontal"
          dataSource={props.data?.adminBlockchain?.currencies || []}
          renderItem={(c: BlockchainSingle_adminBlockchain_currencies) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Badge status={c.visible ? "success" : "default"} text={`${c.name} (${c.code?.toUpperCase()})`} />
                }
              />
              <Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToCurrencyDetails(c.code)} />
            </List.Item>
          )}
        />
      </Descriptions.Item>
    </Descriptions>
  );
}
