import { useState } from "react";
import { AdminDepositsGQL } from "../../../../graphql/Queries";
import { AdminDeposits, AdminDepositsVariables } from "../../../../graphql/queries/AdminDeposits";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Modal, PageHeader, Popover } from "antd";
import { useTranslation } from "react-i18next";
import DepositForm from "./form/DepositForm";
import DepositFilterForm from "./form/DepositFilterForm";
import DepositTable from "./DepositTable";
import qs from "querystring";
import { useHistory } from "react-router-dom";
import { useQuery } from "../../../../graphql/hooks";

export default function Deposits() {
  const { t: translate } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  const t = (id: string) => translate(`setter.layouts.operations.deposits.${id}`);

  const history = useHistory();
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
  };
  const [filter, setFilter] = useState<AdminDepositsVariables | undefined>(query);

  const { data, loading, refetch } = useQuery<AdminDeposits, AdminDepositsVariables>(AdminDepositsGQL, {
    variables: { ...filter, ordering: "desc" },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const changeFilter = (filter: AdminDepositsVariables) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };

  return (
    <PageHeader
      ghost={false}
      title={translate("setter.layouts.operations.nav.deposits")}
      extra={[
        <Popover
          content={<DepositFilterForm loading={loading} onSubmit={console.log} />}
          placement="bottomRight"
          trigger="click"
        ></Popover>,
        <Button icon={<ReloadOutlined />} loading={loading} onClick={() => refetch()}>
          {t("table.reload")}
        </Button>,
        <Button type="primary" onClick={() => setModalOpen(true)}>
          + {t("table.new")}
        </Button>,
      ]}
    >
      {data?.adminDeposits.result && (
        <DepositTable
          deposits={data?.adminDeposits.result || []}
          loading={false}
          changeFilter={changeFilter}
          total={data?.adminDeposits.total}
          filter={filter}
        />
      )}
      {/*<PaginationComponent />*/}
      <Modal
        title={t("form.title")}
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose={true}
      >
        <DepositForm onCompleted={() => setModalOpen(false)} />
      </Modal>
    </PageHeader>
  );
}
