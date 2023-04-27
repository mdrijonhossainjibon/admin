import CurrenciesForm from "../../form/CurrenciesForm";
import { AdminCurrenciesList_adminCurrencies } from "../../../../../../graphql/queries/AdminCurrenciesList";
import { useHistory, useParams } from "react-router-dom";
import { CurrencyRouteParams, RouteParams, Routes } from "../../../../../../constants/routes";

interface Props {
  initialData: AdminCurrenciesList_adminCurrencies;
  toInfo: (key: string) => void;
}

export default function CurrencyDetailsEdit({ initialData, toInfo }: Props) {
  const history = useHistory();
  const { code } = useParams<RouteParams<CurrencyRouteParams>>();

  const redirectToInfo = () => {
    toInfo(Routes.withParams.CurrenciesDetails({ code }));
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  };

  return <CurrenciesForm initialData={initialData} onCompleted={redirectToInfo} />;
}
