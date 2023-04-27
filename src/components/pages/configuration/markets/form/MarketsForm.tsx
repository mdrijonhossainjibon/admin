import { MarketsBridge, MarketsData } from "../MarketsBridge";
import { AutoForm, AutoField, SubmitField } from "uniforms-antd";
import { useMutation, useQuery } from "../../../../../graphql/hooks";
import { CreateMarketGQL, UpdateMarketGQL } from "../../../../../graphql/Mutations";
import { CreateMarket, CreateMarketVariables } from "../../../../../graphql/mutations/CreateMarket";
import { Col, Row, Skeleton } from "antd";
import { AdminCurrenciesListGQL } from "../../../../../graphql/Queries";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../../graphql/queries/AdminCurrenciesList";
import { UpdateMarket, UpdateMarketVariables } from "../../../../../graphql/mutations/UpdateMarket";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { renderRows } from "../../../../../utils/component-utils";
import { MarketRouteParams, RouteParams } from "../../../../../constants/routes";

interface Props {
  initialData?: MarketsData;
  onCompleted?: () => void;
}

export default function MarketsForm({ initialData, onCompleted }: Props) {
  const { t: translate } = useTranslation();
  const { id } = useParams<RouteParams<MarketRouteParams>>();

  const isUpdating = !!initialData;

  const t = (id: string) => translate(`setter.layouts.configurations.markets.form.${id}`);

  const [createMarket, { loading: loadingCreate }] = useMutation<CreateMarket, CreateMarketVariables>(CreateMarketGQL, {
    onCompleted,
    successMessage: t("createSuccess"),
  });

  const [updateMarket, { loading: loadingUpdate }] = useMutation<UpdateMarket, UpdateMarketVariables>(UpdateMarketGQL, {
    onCompleted,
    successMessage: t("updateSuccess"),
  });

  const { data: currencies, loading: loadingCurrencies } = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(
    AdminCurrenciesListGQL
  );

  const handleSubmit = (values: MarketsData) => {
    const variables: CreateMarketVariables = values;

    if (isUpdating) updateMarket({ variables: { ...variables, id } });
    else createMarket({ variables });
  };

  const currencyOptions =
    currencies?.adminCurrencies?.map((currency) => ({
      label: `${currency.name} (${currency.code.toUpperCase()})`,
      value: currency.code,
    })) || [];

  const formRows = [
    [
      <AutoField
        options={currencyOptions}
        getPopupContainer={(node: any) => node.parentNode}
        name="base_currency"
        label={t("base_currency")}
        disabled={isUpdating}
      />,
      <AutoField
        options={currencyOptions}
        getPopupContainer={(node: any) => node.parentNode}
        name="quote_currency"
        label={t("quote_currency")}
        disabled={isUpdating}
      />,
    ],
    [
      <AutoField decimal={false} name="amount_precision" label={t("amount_precision")} disabled={isUpdating} />,
      <AutoField decimal={false} name="price_precision" label={t("price_precision")} disabled={isUpdating} />,
    ],
    [
      <AutoField name="max_price" label={t("max_price")} />,
      <AutoField name="min_price" label={t("min_price")} />,
      <AutoField name="min_amount" label={t("min_amount")} />,
    ],
    [<AutoField decimal={false} name="position" label={t("position")} />],
    [<AutoField name="enabled" label={t("enabled")} />],
  ];

  return (
    <AutoForm className="setter-form" schema={MarketsBridge} model={initialData} onSubmit={handleSubmit}>
      <Skeleton loading={loadingCurrencies} active paragraph={{ rows: 9 }}>
        <Row gutter={24}>
          <Col span={24}>{renderRows(formRows)}</Col>
        </Row>
        <SubmitField loading={loadingUpdate || loadingCreate} value={isUpdating ? t("update") : t("create")} />
      </Skeleton>
    </AutoForm>
  );
}
