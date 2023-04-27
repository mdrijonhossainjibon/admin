import { AutoForm, AutoField, SubmitField } from "uniforms-antd";
import { FeesScheduleBridge, FeesScheduleData } from "./FeesScheduleBridge";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "../../../../graphql/hooks";
import { AdminMarketsListGQL } from "../../../../graphql/Queries";
import { AdminMarketsList, AdminMarketsListVariables } from "../../../../graphql/queries/AdminMarketsList";
import { UpdateTradingFeeGQL, CreateTradingFeeGQL } from "../../../../graphql/Mutations";
import { UpdateTradingFee, UpdateTradingFeeVariables } from "../../../../graphql/mutations/UpdateTradingFee";
import { CreateTradingFee, CreateTradingFeeVariables } from "../../../../graphql/mutations/CreateTradingFee";
import { AdminTradingFees_adminTradingFees } from "../../../../graphql/queries/AdminTradingFees";

interface Props {
  initialData?: AdminTradingFees_adminTradingFees;
  onCompleted?: () => void;
}

export default function FeesScheduleForm({ initialData, onCompleted }: Props) {
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.configurations.feesSchedule.form.${id}`);

  const isUpdating = !!initialData;

  const [updateFee, { loading: loadingUpdate }] = useMutation<UpdateTradingFee, UpdateTradingFeeVariables>(
    UpdateTradingFeeGQL,
    { onCompleted, successMessage: t("updateSuccess") }
  );

  const [createFee, { loading: loadingCreate }] = useMutation<CreateTradingFee, CreateTradingFeeVariables>(
    CreateTradingFeeGQL,
    { onCompleted, successMessage: t("createSuccess") }
  );

  const { data: markets } = useQuery<AdminMarketsList, AdminMarketsListVariables>(AdminMarketsListGQL);

  const marketOptions =
    markets?.adminMarkets?.map((market) => ({
      label: market.id,
      value: market.id,
    })) || [];

  marketOptions.unshift({ label: "any", value: "any" });

  const handleSubmit = (values: FeesScheduleData) => {
    let variables: CreateTradingFeeVariables = values;

    if (isUpdating) {
      (variables as UpdateTradingFeeVariables).id = initialData?.id;
      updateFee({ variables });
    } else {
      createFee({ variables });
    }
  };

  return (
    <AutoForm className="setter-form" schema={FeesScheduleBridge} model={initialData} onSubmit={handleSubmit}>
      <AutoField name="group" label={t("group")} />
      <AutoField
        options={marketOptions}
        getPopupContainer={(node: any) => node.parentNode}
        name="market_id"
        label={t("market_id")}
      />
      <AutoField name="maker" label={t("maker")} />
      <AutoField name="taker" label={t("taker")} />
      <SubmitField value={isUpdating ? t("edit") : t("create")} disabled={loadingCreate || loadingUpdate} />
    </AutoForm>
  );
}
