import { useRef } from "react";
import { DepositFilterBridge, DepositFilterData, DepositFilterSchema } from "./DepositFilterBridge";
import { AutoForm, AutoField } from "uniforms-antd";
import { useQuery } from "../../../../../graphql/hooks";
import { ReloadOutlined } from "@ant-design/icons";
import { AdminCurrenciesListGQL } from "../../../../../graphql/Queries";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../../graphql/queries/AdminCurrenciesList";
import { CurrencyType } from "../../../../../constants/currencies";
import { DepositState } from "../../../../../constants/deposits";
import { Row, Button } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  loading: boolean;
  onSubmit: (values: DepositFilterData) => void;
}

export default function DepositFilterForm({ onSubmit, loading }: Props) {
  const formRef = useRef<typeof AutoForm>(null);
  const { data: currencies } = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(AdminCurrenciesListGQL);
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.deposits.filter.${id}`);

  const handleSubmit = (values: DepositFilterSchema) => {
    const variables: DepositFilterData = {
      ...values,
      from: values.from && Math.floor(new Date(values.from).getTime() / 1000),
      to: values.to && Math.floor(new Date(values.to).getTime() / 1000),
    };

    Object.keys(variables).forEach((key) => {
      const k = key as keyof DepositFilterData;
      if (variables[k] === "") variables[k] = undefined;
    });

    onSubmit(variables);
  };

  const handleReset = () => {
    formRef?.current?.reset();
  };

  const currencyOptions =
    currencies?.adminCurrencies?.map((c) => ({
      value: c.code,
      label: c.code.toUpperCase(),
    })) || [];

  return (
    <AutoForm
      className="setter-form"
      ref={formRef}
      style={{ minWidth: "320px" }}
      schema={DepositFilterBridge}
      onSubmit={handleSubmit}
    >
      <AutoField name="state" label={t("state")} allowedValues={Object.values(DepositState)} />
      <AutoField name="uid" label={t("uid")} />
      <AutoField name="txid" label={t("txid")} />
      <AutoField name="address" label={t("address")} />
      <AutoField name="currency" label={t("currency")} options={currencyOptions} />
      <AutoField name="type" label={t("currencyType")} allowedValues={Object.values(CurrencyType)} />
      <AutoField name="from" label={t("from")} showTime={false} />
      <AutoField name="to" label={t("to")} showTime={false} />
      <Row>
        <Button style={{ margin: 0 }} htmlType="submit" type="primary" loading={loading}>
          {t("submit")}
        </Button>
        <Button style={{ marginLeft: "auto" }} onClick={handleReset} icon={<ReloadOutlined />}>
          {t("reset")}
        </Button>
      </Row>
    </AutoForm>
  );
}
