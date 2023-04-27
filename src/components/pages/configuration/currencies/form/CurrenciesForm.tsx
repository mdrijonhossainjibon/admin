import { useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
// import { AdminCurrenciesList_adminCurrencies } from "../../../../../graphql/queries/AdminCurrenciesList";
import { AutoForm, AutoField, SubmitField, ErrorsField } from "uniforms-antd";
import { CurrenciesBridge, CurrenciesData } from "../CurrenciesBridge";
import { useTranslation } from "react-i18next";
import {
  CreateCurrency_createCurrency,
  CreateCurrencyVariables,
} from "../../../../../graphql/mutations/CreateCurrency";
import {
  UpdateCurrency_updateCurrency,
  UpdateCurrencyVariables,
} from "../../../../../graphql/mutations/UpdateCurrency";
import { CreateCurrencyMutationGql, UpdateCurrencyMutationGql } from "../../../../../graphql/Mutations";
import { useMutation, useQuery } from "../../../../../graphql/hooks";
import { BlockchainsListGQL } from "../../../../../graphql/Queries";
import CurrencyOptionForm from "./CurrencyOptionForm";
import { AdminBlockchains, AdminBlockchainsVariables } from "../../../../../graphql/queries/AdminBlockchains";
import { renderRows } from "../../../../../utils/component-utils";
import { CurrencyType } from "../../../../../constants/currencies";

export interface CurrencyOption {
  key: string;
  value: string;
}

interface Props {
  initialData?: any; //AdminCurrenciesList_adminCurrencies;
  onCompleted?: () => void;
}

export default function CurrenciesForm({ initialData, onCompleted }: Props) {
  const [optionFields, setOptionFields] = useState<CurrencyOption[]>(initialData?.options || []);
  const [currencyType, setCurrencyType] = useState<string | undefined>(undefined);
  const { t: translate } = useTranslation();

  const isUpdating = !!initialData.type;
  const isCoin = currencyType === "coin";

  const t = (id: string) => translate(`setter.layouts.configurations.currencies.${id}`);

  useEffect(() => {
    if (initialData?.type) {
      setCurrencyType(initialData.type);
    }
  }, []);
  console.log(initialData);

  const handleFormChange = (key: string, value: any) => {
    if (key === "type") {
      setCurrencyType(value);
    }
  };

  const { data: blockchains } = useQuery<AdminBlockchains, AdminBlockchainsVariables>(BlockchainsListGQL);

  const [updateCurrency, { loading: loadingUpdate }] = useMutation<
    UpdateCurrency_updateCurrency,
    UpdateCurrencyVariables
  >(UpdateCurrencyMutationGql, {
    onCompleted,
    successMessage: t("form.updatedSuccess"),
  });

  const [createCurrency, { loading: loadingCreate }] = useMutation<
    CreateCurrency_createCurrency,
    CreateCurrencyVariables
  >(CreateCurrencyMutationGql, {
    onCompleted,
    successMessage: t("form.createdSuccess"),
  });

  const blockchainOptions =
    blockchains?.adminBlockchains?.map((blockchain) => ({
      label: blockchain.key,
      value: blockchain.key,
    })) || [];

  const handleSubmit = (values: CurrenciesData) => {
    const variables: CreateCurrencyVariables | UpdateCurrencyVariables = {
      ...values,
      options: isCoin ? JSON.stringify(optionFields) : null,
      min_collection_amount: values.min_collection_amount !== undefined ? Number(values.min_collection_amount) : 0,
      min_deposit_amount: Number(values.min_deposit_amount),
      min_withdraw_amount: Number(values.min_withdraw_amount),
      deposit_fee: Number(values.deposit_fee),
      withdraw_fee: Number(values.withdraw_fee),
      withdraw_limit_24h: Number(values.withdraw_limit_24h),
      withdraw_limit_72h: Number(values.withdraw_limit_72h),
    };

    if (isUpdating) updateCurrency({ variables });
    else createCurrency({ variables });
  };

  const generalRows = [
    [<AutoField name="visible" label={t("form.visible")} />],
    [
      <AutoField name="name" label={t("form.name")} />,
      <AutoField
        allowedValues={Object.values(CurrencyType)}
        name="type"
        label={t("form.type")}
        getPopupContainer={(node: any) => node.parentNode}
        disabled={isUpdating}
      />,
    ],
    [
      <AutoField name="code" label={t("form.code")} disabled={isUpdating} />,
      <AutoField name="symbol" label={t("form.symbol")} />,
    ],
    [
      isCoin && (
        <AutoField
          name="blockchain_key"
          getPopupContainer={(node: any) => node.parentNode}
          options={blockchainOptions}
          label={t("form.blockchain_key")}
        />
      ),
      <AutoField decimal={false} name="position" label={t("form.position")} />,
    ],
    [
      <AutoField decimal={false} name="precision" label={t("form.precision")} />,
      <AutoField decimal={false} name="subunits" disabled={isUpdating || !isCoin} label={t("form.subunits")} />,
    ],
    [<AutoField name="icon_url" label={t("form.icon_url")} />],
  ];

  const depositRows = [
    [<AutoField name="deposit_enabled" label={t("form.deposit_enabled")} />],
    [<AutoField name="deposit_fee" label={t("form.deposit_fee")} />],
    [<AutoField name="min_deposit_amount" label={t("form.min_deposit_amount")} />],
    [<AutoField name="min_collection_amount" label={t("form.min_collection_amount")} />],
  ];

  const withdrawRows = [
    [<AutoField name="withdrawal_enabled" label={t("form.withdrawal_enabled")} />],
    [<AutoField name="withdraw_fee" label={t("form.withdraw_fee")} />],
    [<AutoField name="min_withdraw_amount" label={t("form.min_withdraw_amount")} />],
    [<AutoField name="withdraw_limit_24h" label={t("form.withdraw_limit_24h")} />],
    [<AutoField name="withdraw_limit_72h" label={t("form.withdraw_limit_72h")} />],
  ];

  return (
    <>
      <AutoForm
        className="setter-form"
        onChange={handleFormChange}
        schema={CurrenciesBridge}
        model={initialData}
        onSubmit={handleSubmit}
      >
        <Row gutter={24}>
          <Col span={12} className="form-section">
            <Typography.Title level={5}>General</Typography.Title>
            {renderRows(generalRows)}
          </Col>
          <Col span={6} className="form-section">
            <Typography.Title level={5}>Deposit</Typography.Title>
            {renderRows(depositRows)}
          </Col>
          <Col span={6} className="form-section">
            <Typography.Title level={5}>Withdraw</Typography.Title>
            {renderRows(withdrawRows)}
          </Col>
        </Row>
        {isCoin && (
          <Row>
            <Col span={24} className="form-section">
              <CurrencyOptionForm fields={optionFields} setFields={setOptionFields} />
            </Col>
          </Row>
        )}
        <ErrorsField />
        <SubmitField
          disabled={loadingCreate || loadingUpdate}
          value={isUpdating ? t("form.update") : t("form.create")}
        />
      </AutoForm>
    </>
  );
}
