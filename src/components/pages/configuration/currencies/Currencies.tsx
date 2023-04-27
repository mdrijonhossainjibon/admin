import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AdminCurrenciesList,
  AdminCurrenciesList_adminCurrencies,
  AdminCurrenciesListVariables,
} from "../../../../graphql/queries/AdminCurrenciesList";
import { AdminCurrenciesListGQL } from "../../../../graphql/Queries";
import { ReloadOutlined, EllipsisOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { UpdateCurrency_updateCurrency, UpdateCurrencyVariables } from "../../../../graphql/mutations/UpdateCurrency";
import { UpdateCurrencyMutationGql } from "../../../../graphql/Mutations";
import { Button, Table, PageHeader, Modal } from "antd";
import { useMutation, useQuery } from "../../../../graphql/hooks/";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../../constants/routes";
import { CurrencyType, CurrencyVisible } from "../../../../constants/currencies";
import { useDate } from "../../../../utils/hooks";
import ToggleSwitch from "../ToggleSwitch";
import CurrenciesForm from "./form/CurrenciesForm";
import qs from "querystring";

//interface Props {
//  filter?: AdminCurrenciesListVariables
//}

export default function Currencies() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const { formatDate } = useDate();
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const filter: any = {
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
  };
  if (queryData.visible) {
    filter.visible = queryData.visible;
  }
  if (queryData.type) {
    filter.type = queryData.type;
  }

  const { data, loading, refetch } = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(
    AdminCurrenciesListGQL,
    { notifyOnNetworkStatusChange: true }
  );

  const typeFilters = Object.values(CurrencyType).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const visibleFilters = Object.values(CurrencyVisible).map((el) => {
    return { text: String(el), value: el };
  });

  const [updateCurrency, { error: updateError }] = useMutation<UpdateCurrency_updateCurrency, UpdateCurrencyVariables>(
    UpdateCurrencyMutationGql
  );

  const handleToggle = (variables: AdminCurrenciesList_adminCurrencies) => {
    updateCurrency({
      variables: {
        ...variables,
        options: JSON.stringify(variables.options),
        min_deposit_amount: Number(variables.min_deposit_amount),
        min_withdraw_amount: Number(variables.min_withdraw_amount),
        deposit_fee: Number(variables.deposit_fee),
        withdraw_fee: Number(variables.withdraw_fee),
        withdraw_limit_24h: Number(variables.withdraw_limit_24h),
        withdraw_limit_72h: Number(variables.withdraw_limit_72h),
      },
    });
  };

  const openCurrencyDetails = (code: string) => {
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  };
  console.log("FILTER", filter);
  const columns: ColumnsType<AdminCurrenciesList_adminCurrencies> = [
    {
      title: t("setter.layouts.configurations.currencies.table.code"),
      dataIndex: "code",
      key: "code",
      render: (code: string) => code.toUpperCase(),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("setter.layouts.configurations.currencies.table.symbol"),
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: t("setter.layouts.configurations.currencies.table.type"),
      dataIndex: "type",
      key: "type",
      filters: typeFilters,
      filterMultiple: false,
      filtered: filter.type ? true : false,
      filteredValue: filter.type ? [filter.type] : [],
      onFilter: (_, record) => !filter.type || String(record.type) === filter.type,
      //filtered: filter && filter.type ? true : false,
      //filteredValue: filter && filter.type ? [filter.type] : [],
      //render: (type: string) => {
      //return <DepositType type={type}/>;
      //},
    },
    {
      title: t("setter.layouts.configurations.currencies.table.created"),
      dataIndex: "created_at",
      key: "created_at",
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.visible"),
      dataIndex: "visible",
      key: "visible",
      align: "center",
      filters: visibleFilters,
      filterMultiple: false,
      filtered: filter.visible ? true : false,
      filteredValue: filter.visible ? [filter.visible] : null,
      onFilter: (_, record) => !filter.visible || String(record.visible) === filter.visible,
      render: (_, record: AdminCurrenciesList_adminCurrencies) => (
        <ToggleSwitch value={record} name="visible" onChange={handleToggle} error={updateError} />
      ),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.deposit"),
      dataIndex: "deposit_enabled",
      key: "deposit_enabled",
      align: "center",
      render: (_, record: AdminCurrenciesList_adminCurrencies) => (
        <ToggleSwitch value={record} name="deposit_enabled" onChange={handleToggle} error={updateError} />
      ),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.withdrawal"),
      dataIndex: "withdrawal_enabled",
      key: "withdrawal_enabled",
      align: "center",
      render: (_, record: AdminCurrenciesList_adminCurrencies) => (
        <ToggleSwitch value={record} name="withdrawal_enabled" onChange={handleToggle} error={updateError} />
      ),
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openCurrencyDetails(row.code)} />;
      },
    },
  ];

  const newInitialData = {
    options: [
      {
        key: "erc20_contract_address",
        value: "",
      },
      {
        key: "gas_price",
        value: "",
      },
      {
        key: "gas_limit",
        value: "",
      },
    ],
  };

  return (
    <>
      <PageHeader
        ghost={false}
        className="setter-page-header"
        title={t("setter.layouts.configurations.nav.currencies")}
        extra={[
          <Button loading={loading} icon={<ReloadOutlined />} onClick={() => refetch()}>
            {t("setter.layouts.configurations.currencies.table.reload")}
          </Button>,
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + {t("setter.layouts.configurations.currencies.table.new")}
          </Button>,
        ]}
      >
        <Table
          dataSource={data?.adminCurrencies}
          bordered
          rowKey="code"
          columns={columns}
          loading={false}
          pagination={{
            position: ["bottomLeft"],
            total: data?.adminCurrencies.length,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          onChange={(p, f) => {
            console.log("onchange", p, f);
            const params: any = {
              page: p.current,
              limit: p.pageSize,
            };
            if (f.type && f.type.length > 0) {
              params.type = f.type[0];
            }
            if (f.visible && f.visible.length > 0) {
              params.visible = f.visible[0];
            }
            const queryString = qs.stringify(params);
            history.push({ search: queryString });
          }}
        />
      </PageHeader>
      <Modal
        title={t("setter.layouts.configurations.currencies.modal.title.create")}
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        width="75%"
        footer={null}
        className="currencies-form-modal"
        destroyOnClose={true}
      >
        <CurrenciesForm initialData={newInitialData} onCompleted={() => setModalOpen(false)} />
      </Modal>
    </>
  );
}
