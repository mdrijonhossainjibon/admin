import { AutoForm, AutoField, SubmitField } from "uniforms-antd";
import { DepositBridge, DepositData } from "./DepositBridge";
import { useMutation, useQuery } from "../../../../../graphql/hooks";
import { AdminCurrenciesListGQL } from "../../../../../graphql/Queries";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../../graphql/queries/AdminCurrenciesList";
import { CurrencyType } from "../../../../../constants/currencies";
import { CreateDepositGQL } from "../../../../../graphql/Mutations";
import { CreateDeposit, CreateDepositVariables } from "../../../../../graphql/mutations/CreateDeposit";
import { useTranslation } from "react-i18next";

interface Props {
  onCompleted: () => void;
}

export default function DepositForm({ onCompleted }: Props) {
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.deposits.form.${id}`);

  const { data: currencies } = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(AdminCurrenciesListGQL);

  const [createDeposit, { loading }] = useMutation<CreateDeposit, CreateDepositVariables>(CreateDepositGQL, {
    onCompleted,
  });

  const currencyOptions =
    currencies?.adminCurrencies
      ?.filter((c) => c.type === CurrencyType.Fiat)
      .map((c) => ({ label: `${c.code.toUpperCase()} (${c.name})`, value: c.code })) || [];

  const handleSubmit = (variables: DepositData) => {
    createDeposit({ variables });
  };

  return (
    <AutoForm className="setter-form" schema={DepositBridge} onSubmit={handleSubmit}>
      <AutoField name="uid" label={t("uid")} />
      <AutoField
        name="currency"
        label={t("currency")}
        options={currencyOptions}
        getPopupContainer={(node: any) => node.parentNode}
      />
      <AutoField name="amount" label={t("amount")} />
      <SubmitField value={t("submit")} disabled={loading} />
    </AutoForm>
  );
}
