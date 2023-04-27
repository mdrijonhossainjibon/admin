import { useState } from "react";
import { WalletsBridge, WalletsData } from "./WalletsBridge";
import { AutoField, AutoForm, ErrorsField, SubmitField } from "uniforms-antd";
import { useMutation, useQuery } from "../../../../../graphql/hooks";
import { CreateWalletGQL, UpdateWalletGQL, UpdateWalletSettingsGQL } from "../../../../../graphql/Mutations";
import { Col, Descriptions, Row, Skeleton, Card } from "antd";
import { CreateWallet, CreateWalletVariables } from "../../../../../graphql/mutations/CreateWallet";
import { UpdateWallet, UpdateWalletVariables } from "../../../../../graphql/mutations/UpdateWallet";
import { useParams } from "react-router-dom";
import { AdminCurrenciesListGQL, AdminWalletGatewaysGQL, BlockchainsListGQL } from "../../../../../graphql/Queries";
import { AdminBlockchains, AdminBlockchainsVariables } from "../../../../../graphql/queries/AdminBlockchains";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../../graphql/queries/AdminCurrenciesList";
import { useTranslation } from "react-i18next";
import { AdminWalletGateways, AdminWalletGatewaysVariables } from "../../../../../graphql/queries/AdminWalletGateways";
import { renderRows } from "../../../../../utils/component-utils";
import { RouteParams, WalletRouteParams } from "../../../../../constants/routes";
import { AdminWallet_adminWallet } from "../../../../../graphql/queries/AdminWallet";
import { CurrencyType } from "../../../../../constants/currencies";
import {
  UpdateWalletSettings,
  UpdateWalletSettingsVariables,
} from "../../../../../graphql/mutations/UpdateWalletSettings";
import { WalletKind } from "../../../../../constants/wallets";

interface Props {
  initialData?: AdminWallet_adminWallet;
  onCompleted?: () => void;
}

enum SubmitType {
  General = "general",
  Settings = "settings",
}

export default function WalletsForm({ initialData, onCompleted }: Props) {
  const [submitType, setSubmitType] = useState<SubmitType | undefined>(undefined);
  const [walletKind, setWalletKind] = useState<WalletKind | undefined>(undefined);
  const { id } = useParams<RouteParams<WalletRouteParams>>();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.configurations.wallets.form.${id}`);

  const isUpdating = !!initialData;

  const [createWallet, { loading: loadingCreate }] = useMutation<CreateWallet, CreateWalletVariables>(CreateWalletGQL, {
    onCompleted,
    successMessage: t("createSuccess"),
  });

  const [updateWallet, { loading: loadingUpdate }] = useMutation<UpdateWallet, UpdateWalletVariables>(UpdateWalletGQL, {
    onCompleted,
    successMessage: t("updateSuccess"),
    invalidateCache: false,
  });

  const [updateWalletSettings, { loading: loadingSettings }] = useMutation<
    UpdateWalletSettings,
    UpdateWalletSettingsVariables
  >(UpdateWalletSettingsGQL, { successMessage: t("settings.updateSuccess"), invalidateCache: false });

  const { data: blockchains, loading: loadingBlockchains } = useQuery<AdminBlockchains, AdminBlockchainsVariables>(
    BlockchainsListGQL
  );

  const { data: gateways, loading: loadingGateways } = useQuery<AdminWalletGateways, AdminWalletGatewaysVariables>(
    AdminWalletGatewaysGQL
  );

  const { data: currencies, loading: loadingCurrencies } = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(
    AdminCurrenciesListGQL
  );

  const blockchainOptions =
    blockchains?.adminBlockchains?.map((blockchain) => ({
      label: blockchain.key,
      value: blockchain.key,
    })) || [];

  const gatewaysOptions =
    gateways?.adminWalletGateways?.map(({ gateway }) => ({
      label: gateway,
      value: gateway,
    })) || [];

  const currencyOptions =
    currencies?.adminCurrencies
      ?.filter((currency) => currency.type === CurrencyType.Coin)
      .map((currency) => ({
        label: `${currency.name} (${currency.code.toUpperCase()})`,
        value: currency.code,
      })) || [];

  const handleSubmit = async (values: WalletsData) => {
    const settings: any = { uri: values.uri };

    if (values.secret) {
      settings.secret = values.secret;
    }

    if (values.gateway === "bitgo") {
      settings.access_token = values.access_token;
      settings.testnet = values.testnet;
      settings.wallet_id = values.wallet_id;
    }

    const variables: CreateWalletVariables = {
      ...values,
      settings: JSON.stringify(settings),
    };

    if (submitType === SubmitType.Settings) {
      await updateWalletSettings({
        variables: { id: Number(id), settings: JSON.stringify(settings) },
      });
    } else {
      if (isUpdating) await updateWallet({ variables: { ...variables, id: Number(id) } });
      else await createWallet({ variables });
    }

    setSubmitType(undefined);
  };

  const handleFormChange = (key: string, value: string) => {
    if (key === "kind") {
      setWalletKind(value as WalletKind);
    }
  };

  const parseInitialData = (): WalletsData | undefined => {
    if (initialData) {
      return {
        ...initialData,
        uri: initialData?.settings?.uri,
        secret: initialData?.settings?.secret,
        currency: initialData.currency_code,
        max_balance: Number(initialData.max_balance),
        testnet: initialData?.settings?.testnet,
        access_token: initialData?.settings?.access_token,
        wallet_id: initialData?.settings?.wallet_id,
      };
    }

    return undefined;
  };

  const formRows = [
    [<AutoField name="enabled" label={t("enabled")} />],
    [<AutoField name="name" label={t("name")} />],
    [
      <AutoField
        name="currency"
        getPopupContainer={(node: any) => node.parentNode}
        label={t("currency")}
        options={currencyOptions}
      />,
      <AutoField
        name="blockchain_key"
        getPopupContainer={(node: any) => node.parentNode}
        label={t("blockchain_key")}
        options={blockchainOptions}
      />,
    ],
    [
      <AutoField
        name="kind"
        getPopupContainer={(node: any) => node.parentNode}
        label={t("kind")}
        allowedValues={Object.values(WalletKind)}
      />,
      <AutoField
        name="gateway"
        getPopupContainer={(node: any) => node.parentNode}
        label={t("gateway")}
        options={gatewaysOptions}
      />,
    ],
    [<AutoField name="address" label={t("address")} style={{ width: "100%" }} />],
    [<AutoField name="max_balance" label={t("max_balance")} />, []],
  ];

  console.log(WalletKind.Cold, WalletKind.Deposit, walletKind);

  const settingsRows = [
    [
      <AutoField name="uri" label={t("settings.uri")} />,
      ![WalletKind.Cold, WalletKind.Deposit, undefined].includes(
        walletKind ? walletKind : (parseInitialData()?.kind as WalletKind)
      ) && <AutoField name="secret" label={t("settings.secret")} type="password" />,
    ],
    [parseInitialData()?.gateway === "bitgo" && <AutoField name="access_token" label={t("settings.accessToken")} />],
    [parseInitialData()?.gateway === "bitgo" && <AutoField name="testnet" label={t("settings.testnet")} />],
    [parseInitialData()?.gateway === "bitgo" && <AutoField name="wallet_id" label={t("settings.walletId")} />],
  ];

  const loadingGeneral = loadingCreate || loadingUpdate;
  const loadingValues = loadingBlockchains || loadingGateways || loadingCurrencies;

  const generalSubmitField = (
    <SubmitField
      loading={loadingGeneral}
      value={isUpdating ? t("update") : t("create")}
      onClick={() => setSubmitType(SubmitType.General)}
      disabled={false}
    />
  );

  const settingsSubmitField = (
    <SubmitField
      loading={loadingSettings}
      value={t("settings.submit")}
      onClick={() => setSubmitType(SubmitType.Settings)}
      disabled={false}
    />
  );

  const formColStyle = {
    flex: 1,
    minWidth: "320px",
  };

  return (
    <>
      <AutoForm
        className="setter-form"
        schema={WalletsBridge}
        onChange={handleFormChange}
        onValidate={submitType === SubmitType.General ? undefined : () => null}
        model={parseInitialData()}
        onSubmit={handleSubmit}
      >
        <Skeleton paragraph={{ rows: 10 }} loading={loadingValues}>
          <Row gutter={[24, 16]}>
            <Col style={formColStyle}>
              <Card>
                <Descriptions title={t("title")} style={{ marginBottom: "1rem" }}>
                  <Descriptions.Item>
                    <Row gutter={24} style={{ width: "100%" }}>
                      <Col span={24}>{renderRows(formRows)}</Col>
                    </Row>
                    <ErrorsField />
                    {isUpdating && generalSubmitField}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col style={formColStyle}>
              <Card>
                <Descriptions title={t("settings.title")}>
                  <Descriptions.Item>
                    <Row gutter={24}>
                      <Col span={24}>
                        {renderRows(settingsRows)}
                        <br />
                        {isUpdating && settingsSubmitField}
                      </Col>
                    </Row>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          {!isUpdating && generalSubmitField}
        </Skeleton>
      </AutoForm>
    </>
  );
}
