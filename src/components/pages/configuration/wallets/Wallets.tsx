import { useState } from "react";
import { useMutation, useQuery } from "../../../../graphql/hooks";
import {
  AdminWalletsList,
  AdminWalletsList_adminWallets_result,
  AdminWalletsListVariables,
} from "../../../../graphql/queries/AdminWalletsList";
import { AdminCurrenciesListGQL, AdminWalletsListGQL } from "../../../../graphql/Queries";
import { Button, Modal, PageHeader } from "antd";
import { EllipsisOutlined, LinkOutlined, ReloadOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { UpdateWalletGQL } from "../../../../graphql/Mutations";
import { UpdateWallet, UpdateWalletVariables } from "../../../../graphql/mutations/UpdateWallet";
import WalletsForm from "./form/WalletsForm";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../../constants/routes";
import { useDate } from "../../../../utils/hooks";
import ToggleSwitch from "../ToggleSwitch";
import qs from "querystring";
import { WalletKind } from "../../../../constants/wallets";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../graphql/queries/AdminCurrenciesList";

export default function Wallets() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { formatDate } = useDate();
  const history = useHistory();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.configurations.wallets.${id}`);

  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
  };
  const [filter, setFilter] = useState<AdminWalletsListVariables>(query);

  // const { data, loading, refetch } = useQuery<AdminWalletsList, AdminWalletsListVariables>(AdminWalletsListGQL, {
  //   variables: {
  //     ...filter,
  //
  //   },
  //   notifyOnNetworkStatusChange: true,
  // });

  const { data, loading, refetch } = useQuery<AdminWalletsList, AdminWalletsListVariables>(AdminWalletsListGQL, {
    variables: { ...filter },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const currencyData = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(AdminCurrenciesListGQL, {
    notifyOnNetworkStatusChange: true,
  });

  const [updateWallet, { error: updateError }] = useMutation<UpdateWallet, UpdateWalletVariables>(UpdateWalletGQL, {
    successMessage: t("form.updateSuccess"),
  });

  const handleToggle = ({ enabled, id }: AdminWalletsList_adminWallets_result) => {
    updateWallet({
      variables: {
        enabled,
        id,
      },
    });
  };

  const kindFilters = Object.values(WalletKind).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const currency_codeFilters = currencyData.data?.adminCurrencies?.map((el) => {
    return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
  });

  const goToWalletDetails = (id: number) => {
    history.push(Routes.withParams.WalletsDetails({ id }));
  };

  const columns: ColumnsType<AdminWalletsList_adminWallets_result> = [
    {
      title: t("table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("table.address"),
      dataIndex: "address",
      key: "address",
      render: (addr: string, row) => {
        const href = row.currency?.explorer_address?.replace("#{address}", addr);
        function truncate(input: string) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 2) + "...";
          }
          return input;
        }
        return addr ? (
          <>
            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
              {truncate(addr)}
            </Button>
          </>
        ) : null;
      },
    },
    {
      title: t("table.currency"),
      dataIndex: "currency_code",
      key: "currency",
      filters: currency_codeFilters,
      filterMultiple: false,
      filtered: filter && filter.currency ? true : false,
      filteredValue: filter && filter.currency ? [filter.currency] : [],
      render: (currency: string) => currency.toUpperCase(),
    },
    {
      title: t("table.kind"),
      dataIndex: "kind",
      key: "kind",
      filters: kindFilters,
      filterMultiple: false,
      filtered: filter && filter.kind ? true : false,
      filteredValue: filter && filter.kind ? [filter.kind] : [],
    },
    {
      title: t("table.created"),
      dataIndex: "created_at",
      key: "created_at",
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("table.maxBalance"),
      dataIndex: "max_balance",
      key: "max_balance",
    },
    {
      title: t("table.status.title"),
      dataIndex: "enabled",
      key: "enabled",
      render: (_, record: AdminWalletsList_adminWallets_result) => (
        <ToggleSwitch value={record} onChange={handleToggle} name="enabled" error={updateError} />
      ),
    },
    {
      title: "",
      dataIndex: "details",
      align: "center",
      // width: 75,
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => goToWalletDetails(row.id)} />;
      },
    },
  ];

  return (
    <>
      <PageHeader
        ghost={false}
        title={translate("setter.layouts.configurations.nav.wallets")}
        extra={[
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
            {t("table.reload")}
          </Button>,
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + {t("table.new")}
          </Button>,
        ]}
      >
        <Table
          bordered
          dataSource={data?.adminWallets.result}
          rowKey="id"
          loading={false}
          columns={columns}
          pagination={{
            position: ["bottomLeft"],
            total: data?.adminWallets.total || undefined,
            current: filter ? filter.page : undefined,
            pageSize: filter ? filter.limit : undefined,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          onChange={(p, f) => {
            const params: any = {
              page: p.current,
              limit: p.pageSize,
            };
            if (f.kind && f.kind.length !== 0) {
              params.kind = f.kind[0];
            }
            if (f.currency && f.currency.length !== 0) {
              params.currency = f.currency[0];
            }
            const queryString = qs.stringify(params);
            history.push({ search: queryString });
            setFilter(params);
          }}
          // onRow={(wallet) => ({
          //   tabIndex: 0,
          //   onClick: () => goToWalletDetails(wallet.id),
          //   onKeyDown: (e) => e.key === "Enter" && goToWalletDetails(wallet.id),
          // })}
        />
        <Modal
          title={t("modal.create")}
          visible={isModalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          destroyOnClose={true}
        >
          <WalletsForm onCompleted={() => setModalOpen(false)} />
        </Modal>
      </PageHeader>
    </>
  );
}
