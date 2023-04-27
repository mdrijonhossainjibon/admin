import { useEffect, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  AdminAdjustments,
  AdminAdjustments_adminAdjustments_result,
  AdminAdjustmentsVariables,
} from "../../../../graphql/queries/AdminAdjustments";
import { Button, Modal, PageHeader, Select, Space, Table, Tag } from "antd";
import { useMutation, useQuery } from "../../../../graphql/hooks";
import { AdminAdjustmentsGQL, AdminCurrenciesListGQL } from "../../../../graphql/Queries";
import { AdjustmentAction, AdjustmentCategory, AdjustmentState } from "../../../../constants/adjustments";
import {
  AdjustmentAction as AdjustmentActionMutation,
  AdjustmentActionVariables,
} from "../../../../graphql/mutations/AdjustmentAction";
import { AdjustmentActionGQL } from "../../../../graphql/Mutations";
import AdjustmentForm from "./form/AdjustmentForm";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../../constants/routes";
import qs from "querystring";
import { WithdrawState } from "../../../../constants/withdraws";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../graphql/queries/AdminCurrenciesList";
import { TagProps } from "antd/lib/tag";

const adjustmentStateColors: { [key in AdjustmentState]: TagProps["color"] } = {
  [AdjustmentState.Accepted]: "success",
  [AdjustmentState.Pending]: "warning",
  [AdjustmentState.Rejected]: "error",
};

export default function Adjustments() {
  const [isModalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.adjustments.${id}`);

  const goToAdjustmentDetails = (id: AdminAdjustments_adminAdjustments_result["id"]) => {
    history.push(Routes.withParams.AdjustmentDetails({ id }));
  };

  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
  };
  const [filter, setFilter] = useState<AdminAdjustmentsVariables>(query);

  const { data, loading, refetch } = useQuery<AdminAdjustments, AdminAdjustmentsVariables>(AdminAdjustmentsGQL, {
    variables: {
      ...filter,
      ordering: "desc",
    },
    notifyOnNetworkStatusChange: true,
    pollInterval: 10000,
  });

  const currencyData = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(AdminCurrenciesListGQL, {
    notifyOnNetworkStatusChange: true,
  });

  const currency_codeFilters = currencyData.data?.adminCurrencies?.map((el) => {
    return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
  });

  const stateFilters = Object.values(WithdrawState).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const changeFilter = (filter: AdminAdjustmentsVariables) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };

  const columns: ColumnsType<AdminAdjustments_adminAdjustments_result> = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("table.uid"),
      dataIndex: ["receiving_member", "uid"],
      key: "receiving_member.uid",
    },
    {
      title: t("table.reason"),
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: t("table.amount"),
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: t("table.currency"),
      dataIndex: ["currency", "code"],
      key: "currency",
      filters: currency_codeFilters,
      filterMultiple: false,
      filtered: filter && filter.currency ? true : false,
      filteredValue: filter && filter.currency ? [filter.currency] : [],
      render: (value: string) => value.toUpperCase(),
    },
    {
      title: t("table.category"),
      dataIndex: "category",
      key: "category",
      render: (category: AdjustmentCategory) => t(`category.${category}`),
    },
    {
      title: t("table.creator"),
      dataIndex: ["creator", "uid"],
      key: "creator.uid",
    },
    {
      title: t("table.receivingAccountCode"),
      dataIndex: "receiving_account_code",
      key: "receiving_account_code",
    },
    {
      title: t("table.state"),
      dataIndex: "state",
      key: "state",
      filters: stateFilters,
      filterMultiple: false,
      filtered: filter && filter.state ? true : false,
      filteredValue: filter && filter.state ? [filter.state] : [],
      render: (_, row) => <AdjustmentStateCell adjustment={row} t={t} />,
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => goToAdjustmentDetails(row.id)} />;
      },
    },
  ];

  const extraHeaderContent = (
    <Space>
      <Button loading={loading} icon={<ReloadOutlined />} onClick={() => refetch()}>
        {t("table.reload")}
      </Button>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        + {t("table.newAdjustment")}
      </Button>
    </Space>
  );

  return (
    <>
      <PageHeader
        className="setter-page-header"
        title={translate("setter.layouts.operations.nav.adjustments")}
        ghost={false}
        extra={extraHeaderContent}
      >
        <Table
          bordered
          loading={loading}
          dataSource={data?.adminAdjustments.result}
          rowKey="id"
          columns={columns}
          onChange={(p, f) => {
            const params: any = {
              page: p.current,
              limit: p.pageSize,
            };
            if (f.currency && f.currency.length !== 0) {
              params.currency = f.currency[0];
            }
            if (f.state && f.state.length !== 0) {
              params.state = f.state[0];
            }
            if (changeFilter) {
              changeFilter(params);
            }
          }}
          pagination={{
            position: ["bottomLeft"],
            total: data?.adminAdjustments.total || undefined,
            current: filter ? filter.page : undefined,
            pageSize: filter ? filter.limit : undefined,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        />
      </PageHeader>
      <Modal
        title={t("form.title")}
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose={true}
      >
        <AdjustmentForm onCompleted={() => setModalOpen(false)} />
      </Modal>
    </>
  );
}

const AdjustmentStateCell = ({
  adjustment,
  t,
}: {
  adjustment: AdminAdjustments_adminAdjustments_result;
  t: (id: string) => string;
}) => {
  const [adjustmentState, setAdjustmentState] = useState<AdjustmentState>(adjustment.state as AdjustmentState);

  const onCompleted = (data: AdjustmentActionMutation) =>
    setAdjustmentState((data?.actionAdjustment?.state as AdjustmentState) || adjustmentState);

  const [adjustmentAction, { loading }] = useMutation<AdjustmentActionMutation, AdjustmentActionVariables>(
    AdjustmentActionGQL,
    { onCompleted }
  );

  useEffect(() => {
    setAdjustmentState(adjustment.state as AdjustmentState);
  }, [adjustment.state]);

  return adjustmentState === AdjustmentState.Pending ? (
    <Select
      disabled={loading}
      loading={loading}
      onClick={(e) => e.stopPropagation()}
      value={t(`state.${adjustmentState}`)}
      onSelect={(action) => adjustmentAction({ variables: { id: adjustment.id, action } })}
    >
      {Object.values(AdjustmentAction).map((action) => (
        <Select.Option key={action} value={action}>
          {t(`state.${action}`)}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <Tag color={adjustmentStateColors[adjustmentState]}>{t(`state.${adjustmentState}`)}</Tag>
  );
};
