import { useState } from "react";
import { AutoField, AutoForm, SubmitField, ErrorsField, NumField } from "uniforms-antd";
import { AdjustmentBridge, AdjustmentData } from "./AdjustmentBridge";
import { AdjustmentCategory } from "../../../../../constants/adjustments";
import { useMutation, useQuery } from "../../../../../graphql/hooks";
import { AdminCurrenciesListGQL } from "../../../../../graphql/Queries";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../../graphql/queries/AdminCurrenciesList";
import { CreateAdjustmentGQL } from "../../../../../graphql/Mutations";
import { CreateAdjustment, CreateAdjustmentVariables } from "../../../../../graphql/mutations/CreateAdjustment";
import { useTranslation } from "react-i18next";
import { CurrencyType } from "../../../../../constants/currencies";

interface Props {
  onCompleted: () => void;
}

export default function AdjustmentForm({ onCompleted }: Props) {
  const { t: translate } = useTranslation();

  const [formData, setFormData] = useState<any>();

  const t = (id: string) => translate(`setter.layouts.operations.adjustments.${id}`);

  const { data: currencies } = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(AdminCurrenciesListGQL);

  const [createAdjustment, { loading }] = useMutation<CreateAdjustment, CreateAdjustmentVariables>(
    CreateAdjustmentGQL,
    { onCompleted }
  );

  const handleSubmit = (values: AdjustmentData) => {
    const variables: CreateAdjustmentVariables = {
      ...values,
      amount: String(values.amount),
      description: values.description || "",
    };
    createAdjustment({ variables });
  };

  const categoryOptions = Object.values(AdjustmentCategory).map((c) => ({ label: t(`category.${c}`), value: c })) || [];
  const currencyOptions =
    currencies?.adminCurrencies.map((c) => ({
      label: `${c.name} (${c.code.toUpperCase()})`,
      value: c.code,
    })) || [];

  const receiving_account_code = formData
    ? formData.asset_account_code === 101
      ? ["201", "301", "401"].map((el) => ({ label: el, value: Number(el) })) || []
      : ["202", "302", "402"].map((el) => ({ label: el, value: Number(el) })) || []
    : [];

  const setCurrencyType = (currency_id: string) => {
    currencies?.adminCurrencies.forEach((el) => {
      if (el.code === currency_id) {
        if (el.type === CurrencyType.Coin) {
          setFormData({
            ...formData,
            currency_id,
            asset_account_code: 102,
          });
        }
        if (el.type === CurrencyType.Fiat) {
          setFormData({
            ...formData,
            currency_id,
            asset_account_code: 101,
          });
        }
      }
    });
  };

  return (
    <AutoForm schema={AdjustmentBridge} className="setter-form" onSubmit={handleSubmit} model={formData}>
      <ErrorsField />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ width: "50%" }}>
          <AutoField
            name="currency_id"
            label={t("form.currency")}
            getPopupContainer={(node: any) => node.parentNode}
            options={currencyOptions}
            onChange={(currency_id: string) => {
              setCurrencyType(currency_id);
            }}
          />
        </div>
        <div style={{ width: "45%" }}>
          <NumField name="asset_account_code" label={t("form.assetAccountCode")} decimal={false} />
        </div>
      </div>

      <AutoField name="amount" label={t("form.amount")} />
      <AutoField
        name="category"
        label={t("form.category")}
        getPopupContainer={(node: any) => node.parentNode}
        options={categoryOptions}
      />

      <AutoField name="reason" label={t("form.reason")} />

      <AutoField
        name="receiving_account_code"
        label={t("form.receivingAccountCode")}
        options={receiving_account_code}
      />
      <AutoField name="receiving_member_uid" label={t("form.receivingMemberUid")} />
      <AutoField name="description" label={t("form.description")} />

      <SubmitField value={t("form.submit")} disabled={loading} loading={loading} />
    </AutoForm>
  );
}
