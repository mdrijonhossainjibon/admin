import {
  AdminWithdraws_adminWithdraws_result,
  AdminWithdrawsVariables,
} from "../../../../graphql/queries/AdminWithdraws";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { CurrencyType } from "../../../../constants/currencies";
import { WithdrawState } from "../../../../constants/withdraws";
import { useQuery } from "../../../../graphql/hooks";
import { useTranslation } from "react-i18next";
import { useDate } from "../../../../utils/hooks";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../../constants/routes";
import { EllipsisOutlined, LinkOutlined } from "@ant-design/icons";
import { AdminCurrenciesList, AdminCurrenciesListVariables } from "../../../../graphql/queries/AdminCurrenciesList";
import { AdminCurrenciesListGQL } from "../../../../graphql/Queries";
import WithdrawalStatus from "./WithdrawalStatus";

interface Props {
  withdrawals: AdminWithdraws_adminWithdraws_result[];
  loading?: boolean;
  type?: CurrencyType;
  total?: number;
  filter?: AdminWithdrawsVariables;
  changeFilter?: (filter: AdminWithdrawsVariables) => void;
}

export default function WithdrawalTable({ withdrawals, loading, type, filter, changeFilter, total }: Props) {
  const { t: translate } = useTranslation();
  const t = (id: string) => translate(`setter.layouts.operations.withdrawals.table.${id}`);
  const history = useHistory();
  const { formatDate } = useDate();

  const currencyData = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(AdminCurrenciesListGQL, {
    notifyOnNetworkStatusChange: true,
  });

  const currency_codeFilters = type
    ? currencyData.data?.adminCurrencies
        ?.filter((el) => el.type === type)
        .map((el) => {
          return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
        })
    : currencyData.data?.adminCurrencies?.map((el) => {
        return { text: `${String(el.code.toUpperCase())}`, value: String(el.code) };
      });

  const stateFilters = Object.values(WithdrawState).map((el) => {
    return { text: String(el), value: String(el) };
  });

  // const typeFilters = Object.values(WithdrawType).map(el => {
  //     return {text: String(el), value: String(el)}
  // });

  const openWithdrawalDetails = (id: number) => {
    history.push(Routes.withParams.WithdrawalDetails({ id }));
  };

  const columns: ColumnsType<AdminWithdraws_adminWithdraws_result> = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("email"),
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: t("txid.title"),
      dataIndex: "blockchain_txid",
      key: "txid",
      // width: 250,
      render: (txid: string, row) => {
        const href = row.currency?.explorer_transaction?.replace("#{txid}", txid);

        function truncate(input: string) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 8) + "...";
          }
          return input;
        }
        return txid ? (
          <>
            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
              {truncate(txid)}
            </Button>
          </>
        ) : null;
      },
    },
    {
      title: t("created_at"),
      dataIndex: "created_at",
      key: "created_at",
      // sorter: (a, b) => (moment(formatDate(a.created_at)).unix()) - moment(formatDate(b.created_at)).unix(),
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("amount"),
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      key: "amount",
    },
    {
      title: t("currency"),
      dataIndex: ["currency", "code"],
      key: "currency",
      filters: currency_codeFilters,
      filterMultiple: false,
      filtered: filter && filter.currency ? true : false,
      filteredValue: filter && filter.currency ? [filter.currency] : [],
      render: (code: string) => code.toUpperCase(),
    },

    {
      title: t("rid"),
      dataIndex: "rid",
      key: "rid",
      // width: 250,
      align: "center",
      render: (rid: string, row) => {
        const href = row.currency?.explorer_address?.replace("#{address}", rid);
        console.log(row.currency?.explorer_address, "row.currency row.currency row.currency");

        function truncate(input: string) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 8) + "...";
          }
          return input;
        }
        return rid ? row.type === 'fiat' ? (
          <>
            {rid}
          </>
          ) :
          (
          <>
            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
              {truncate(rid)}
            </Button>
          </>
        ) : null;
      },
    },
    {
      title: t("state.title"),
      dataIndex: "state",
      key: "state",
      align: "center",
      filters: stateFilters,
      filterMultiple: false,
      filtered: filter && filter.state ? true : false,
      filteredValue: filter && filter.state ? filter.state : [],
      render: (_, row) => <WithdrawalStatus withdrawal={row} />,
    },
    {
      title: "",
      dataIndex: "details",
      align: "center",
      // width: 75,
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openWithdrawalDetails(row.id)} />;
      },
    },
  ];

  return (
    <Table
      bordered
      loading={loading}
      dataSource={withdrawals}
      rowKey="id"
      columns={columns}
      pagination={{
        position: ["bottomLeft"],
        total: total || undefined,
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
        if (f.state && f.state.length !== 0) {
          params.state = f.state;
        }
        if (f.currency && f.currency.length !== 0) {
          params.currency = f.currency[0];
        }
        if (changeFilter) {
          changeFilter(params);
        }
      }}
    />
  );
}

// const TxIDCell = ({withdraw, t}: { withdraw: AdminWithdraws_adminWithdraws_result; t: (id: string) => string }) => {
//     const [txid, setTxid] = useState("");
//     const [blockchainTxid, setBlockchainTxid] = useState(withdraw.blockchain_txid || "");
//     const [isPopoverVisible, setPopoverVisible] = useState(false);
//
//     const onCompleted = () => {
//         setBlockchainTxid(txid);
//         setPopoverVisible(false);
//     };
//
//     const [withdrawAction, {loading}] = useMutation<WithdrawActionMutation, WithdrawActionVariables>(
//         WithdrawActionGQL,
//         {onCompleted}
//     );
//
//     const handleAction = () => {
//         withdrawAction({
//             variables: {
//                 id: withdraw.id,
//                 action: WithdrawAction.Load,
//                 txid,
//             },
//         });
//     };
//
//     const PopoverContent = (
//         <div style={{padding: "12px 16px"}} onClick={(e) => e.stopPropagation()}>
//             <Space direction="vertical">
//                 <Input placeholder={t("txid.load.placeholder")} onChange={(e) => setTxid(e.target.value)} allowClear/>
//                 <Button type="primary" loading={loading} disabled={loading || !txid} onClick={handleAction}>
//                     {t("txid.load.submit")}
//                 </Button>
//             </Space>
//         </div>
//     );
//
//     return (
//         <Space style={{whiteSpace: "pre-wrap"}}>
//             {blockchainTxid && <div style={{wordBreak: "break-all"}}>{blockchainTxid}</div>}
//             {withdraw.state === WithdrawState.Accepted && withdraw.type === CurrencyType.Coin && (
//                 <Popover
//                     trigger={["click"]}
//                     content={PopoverContent}
//                     visible={isPopoverVisible}
//                     onVisibleChange={setPopoverVisible}
//                     overlayClassName="txid-load-popover"
//                 >
//                     <Button type="link" style={{padding: 0}} onClick={(e) => e.stopPropagation()}>
//                         {t("txid.load.title")}
//                     </Button>
//                 </Popover>
//             )}
//         </Space>
//     );
// };
