import { useState } from "react";
import { Button, PageHeader, Space, Tabs } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useQuery } from "../../../../graphql/hooks";
import { AdminWithdrawsGQL } from "../../../../graphql/Queries";
import { AdminWithdraws, AdminWithdrawsVariables } from "../../../../graphql/queries/AdminWithdraws";
import { CurrencyType } from "../../../../constants/currencies";
import { useTranslation } from "react-i18next";
import WithdrawalTable from "./WithdrawalTable";
import qs from "querystring";
import { useHistory } from "react-router-dom";

export default function Withdrawals() {
  const { t: translate } = useTranslation();
  const history = useHistory();

  const t = (id: string) => translate(`setter.layouts.operations.withdrawals.table.${id}`);

  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
  };

  const [filter, setFilter] = useState<AdminWithdrawsVariables | undefined>(query);
  const [currencyType, setCurrencyType] = useState<CurrencyType>(CurrencyType.Coin);

  const { data, loading, refetch } = useQuery<AdminWithdraws, AdminWithdrawsVariables>(AdminWithdrawsGQL, {
    variables: {
      ...filter,
      type: filter?.type || currencyType,
      ordering: "desc",
    },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const changeFilter = (filter: AdminWithdrawsVariables | undefined) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };
  const changeCurrencyType = (type: CurrencyType) => {
    changeFilter(undefined);
    setCurrencyType(type);
  };

  const panes = [
    { tab: t("panes.coin"), key: CurrencyType.Coin },
    { tab: t("panes.fiat"), key: CurrencyType.Fiat },
  ];

  const extraTabContent = (
    <Space>
      <Button
        icon={<ReloadOutlined />}
        loading={loading}
        type="default"
        onClick={() => refetch && refetch({ type: currencyType })}
      >
        {t("reload")}
      </Button>
    </Space>
  );

  return (
    <>
      <PageHeader
        className="setter-page-header"
        ghost={false}
        title={translate("setter.layouts.operations.nav.withdrawals")}
        extra={[extraTabContent]}
      >
        <Tabs defaultActiveKey={currencyType} onChange={changeCurrencyType as (type: string) => void}>
          {panes.map((pane) => (
            <Tabs.TabPane {...pane} />
          ))}
        </Tabs>
        <WithdrawalTable
          loading={false}
          type={currencyType}
          withdrawals={
            data?.adminWithdraws.result.map((el) => {
              return { ...el, user: el.member.user };
            }) || []
          }
          filter={filter}
          changeFilter={changeFilter}
          total={data?.adminWithdraws.total}
        />
      </PageHeader>
    </>
  );
}
