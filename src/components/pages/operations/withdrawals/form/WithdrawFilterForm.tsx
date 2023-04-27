import { useRef } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { useQuery } from "../../../../../graphql/hooks";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../../graphql/queries/AdminCurrenciesList";
import { AdminCurrenciesListGQL } from "../../../../../graphql/Queries";
import { useTranslation } from "react-i18next";
import { CurrencyType } from "../../../../../constants/currencies";
import { Button, Row } from "antd";
import { AutoForm, AutoField } from "uniforms-antd";
import { WithdrawFilterBridge, WithdrawFilterData, WithdrawFilterSchema } from "./WithdrawFilterBridge";
import { WithdrawState } from "../../../../../constants/withdraws";

interface Props {
  loading: boolean;
  onSubmit: (values?: WithdrawFilterData) => void;
}

export default function WithdrawFilterForm({ onSubmit, loading }: Props) {
  const formRef = useRef<typeof AutoForm>(null);
  const { data: currencies } = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(AdminCurrenciesListGQL);
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.withdrawals.filter.${id}`);

  const handleSubmit = (values: WithdrawFilterSchema) => {
    const variables: WithdrawFilterData = {
      ...values,
      from: values.from && values.from.toISOString(),
      to: values.to && values.to.toISOString(),
    };

    Object.keys(variables).forEach((key) => {
      const k = key as keyof WithdrawFilterData;
      if (variables[k] === "") variables[k] = undefined;
    });

    onSubmit(variables);
  };

  const handleReset = () => {
    formRef?.current?.reset();
    onSubmit();
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
      schema={WithdrawFilterBridge}
      onSubmit={handleSubmit}
    >
      <AutoField name="state" label={t("state")} allowedValues={Object.values(WithdrawState)} />
      <AutoField name="uid" label={t("uid")} />
      <AutoField name="txid" label={t("txid")} />
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
