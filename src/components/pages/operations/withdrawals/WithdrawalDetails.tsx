import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { RouteParams, Routes, WithdrawalRouteParams } from "../../../../constants/routes";
import { Badge, Button, Descriptions, Input, List, PageHeader, Popover, Skeleton } from "antd";
import { EllipsisOutlined, LinkOutlined, ReloadOutlined, CopyOutlined } from "@ant-design/icons";
import { useQuery } from "../../../../graphql/hooks";
import { AdminWithdrawGQL } from "../../../../graphql/Queries";
import { AdminWithdraw, AdminWithdrawVariables } from "../../../../graphql/queries/AdminWithdraw";
import { useDate } from "../../../../utils/hooks";
import { CurrencyType } from "../../../../constants/currencies";
import { useTranslation } from "react-i18next";
import UserStatus from "../../users/UserStatus/UserStatus";
import WithdrawalStatus from "./WithdrawalStatus";
import { WithdrawState, WithdrawType } from "../../../../constants/withdraws";
import { useMutation } from "@apollo/client";
import { WithdrawAction, WithdrawActionVariables } from "../../../../graphql/mutations/WithdrawAction";
import { WithdrawActionGQL } from "../../../../graphql/Mutations";

export default function WithdrawalDetails() {
  const history = useHistory();

  const [withdrawMutation] = useMutation<WithdrawAction, WithdrawActionVariables>(WithdrawActionGQL);

  const goToCurrencyDetails = (code: string) => {
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  };

  const goToUserDetails = (uid: string) => {
    history.push(Routes.withParams.UsersDetails({ uid }));
  };

  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.withdrawals.${id}`);

  const { id } = useParams<RouteParams<WithdrawalRouteParams>>();

  const { data: adminWithdraw, loading, refetch } = useQuery<AdminWithdraw, AdminWithdrawVariables>(AdminWithdrawGQL, {
    variables: { id: Number(id) },
    pollInterval: 40000,
    notifyOnNetworkStatusChange: true,
  });

  const withdraw = adminWithdraw?.adminWithdraw;
  const accounts = withdraw?.member?.accounts;

  const refetchAll = () => {
    if (refetch) refetch();
  };

  const onProcess = () => {
    if (withdraw?.currency?.type === WithdrawType.Coin) {
      withdrawMutation({ variables: { id: Number(withdraw?.id), action: "process" } }).then((r) =>
        console.log(r, "rrrrrrrrrr")
      );
    }
    if (withdraw?.currency?.type === WithdrawType.Fiat) {
      withdrawMutation({ variables: { id: Number(withdraw?.id), action: "process" } }).then(() =>
        withdrawMutation({ variables: { id: Number(withdraw?.id), action: "dispatch" } }).then(() =>
          withdrawMutation({ variables: { id: Number(withdraw?.id), action: "success" } }).then((r) =>
            console.log(r, " ftchResult WithdrawAction")
          )
        )
      );
    }
  };

  const onReject = () => {
    if (withdraw?.state === WithdrawState.Errored) {
      withdrawMutation({ variables: { id: Number(withdraw?.id), action: "fail" } }).then((r) =>
        console.log(r, "onRejectErroredState")
      );
    } else {
      withdrawMutation({ variables: { id: Number(withdraw?.id), action: "reject" } }).then((r) =>
        console.log(r, "onRejectAnotherStateState")
      );
    }
  };
  const skeleton = (content: React.ReactNode, rows: number = 9) =>
    loading ? <Skeleton paragraph={{ rows }} active /> : content;

  const renderAccountsInfo = (accounts: any) => {
    const account = accounts.find((el: any) => el.currency.code === withdraw?.currency?.code);
    return (
      <>
        <List.Item>
          <List.Item.Meta
            title={<Badge status={"default"} text="Total:" />}
            description={`${account.balance + account.locked} ${account.currency.code.toUpperCase()}`}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            title={<Badge status={"warning"} text="Locked:" />}
            description={`${account.locked} ${account.currency.code.toUpperCase()}`}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            title={<Badge status={"success"} text="Available:" />}
            description={`${account.balance} ${account.currency.code.toUpperCase()}`}
          />
        </List.Item>
      </>
    );
  };

  

  const actions = Array();
  if (["accepted", "errored", "skipped"].includes(withdraw ? withdraw.state : "")) {
    actions.push(
      <Button type="primary" onClick={() => onProcess()}>
        {t("details.withdraw.process")}
      </Button>
    );
  }
  if (["accepted", "errored", "confirming"].includes(withdraw ? withdraw.state : "")) {
    actions.push(
      <Button type="primary" danger onClick={() => onReject()}>
        {t("details.withdraw.reject")}
      </Button>
    );
  }

  const [txid, setTxid] = useState<string | undefined>();

  const onLoad = () => {
    withdrawMutation({ variables: { id: Number(withdraw?.id), action: "load", txid } });
  };

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => history.goBack()}
        title={t("details.title")}
        extra={[
          <Button
            key={1}
            icon={<ReloadOutlined />}
            loading={loading}
            onClick={() => {
              refetchAll();
            }}
          >
            {t("table.reload")}
          </Button>,
        ]}
      >
        {withdraw &&
          skeleton(
            <Descriptions column={{ lg: 2, md: 1 }} bordered size="middle">
              {withdraw?.currency && (
                <Descriptions.Item label={t("details.withdraw.currency")}>
                  <List itemLayout="horizontal">
                    <List.Item
                      actions={[
                        <Button
                          shape="circle"
                          icon={<EllipsisOutlined />}
                          onClick={() => goToCurrencyDetails(withdraw?.currency.code)}
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Badge
                            status={withdraw?.currency.visible ? "success" : "error"}
                            text={`${withdraw?.currency.name} (${withdraw?.currency.code})`}
                          />
                        }
                      />
                    </List.Item>
                  </List>
                </Descriptions.Item>
              )}

              <Descriptions.Item label={t("details.withdraw.state")}>
                <List>
                  <List.Item actions={actions}>
                    <List.Item.Meta title={<WithdrawalStatus withdrawal={withdraw} />} />
                  </List.Item>
                </List>
              </Descriptions.Item>

              <Descriptions.Item label={t("details.user.title")}>
                <List>
                  <List.Item
                    actions={[
                      <Button
                        shape="circle"
                        icon={<EllipsisOutlined />}
                        onClick={() => goToUserDetails(withdraw.member.user.uid)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${withdraw.member.user.email} (${withdraw.member.user.uid})`}
                      description={<UserStatus state={withdraw.member.user.state} />}
                    />
                  </List.Item>
                </List>
              </Descriptions.Item>
              <Descriptions.Item label={t("details.withdraw.date")}>
                {formatDate(String(withdraw?.created_at))}
              </Descriptions.Item>

              <Descriptions.Item label={t("details.user.balance")}>
                <List itemLayout="horizontal">{renderAccountsInfo(accounts)}</List>
              </Descriptions.Item>
              <Descriptions.Item label={t("details.withdraw.sum")}>
                <List itemLayout="horizontal">
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.withdraw.amount")}
                      description={`${withdraw.amount} ${withdraw.currency.code.toUpperCase()}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.withdraw.fee")}
                      description={`${withdraw.fee} ${withdraw.currency.code.toUpperCase()}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.withdraw.total")}
                      description={`${withdraw.sum} ${withdraw.currency.code.toUpperCase()}`}
                    />
                  </List.Item>
                </List>
              </Descriptions.Item>
            
              {withdraw?.type === CurrencyType.Fiat && (
                <Descriptions.Item label="Beneficiary" span={2}>
                  <List itemLayout="horizontal">                  
                  <List.Item>
                    <List.Item.Meta
                      title={<Badge status={withdraw?.beneficiary.state  === "active"? "success" : "default"} 
                      text={`State:`+`${withdraw?.beneficiary.state}`} />}
                      
                    />                      
                  </List.Item>  
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.name")}
                      description ={`${withdraw?.beneficiary.name}`}
                    />
                  </List.Item>

                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.bankName")}
                      description={`${withdraw?.beneficiary?.data?.bank_name}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.fullName")}
                      description={`${withdraw?.beneficiary?.data?.full_name}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.bankSwiftCode")}
                      description={`${withdraw?.beneficiary?.data?.bank_swift_code}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.intermediaryBankName")}
                      description={`${withdraw?.beneficiary?.data?.intermediary_bank_name}`}
                    />
                  </List.Item> 
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.intermediaryBankSwiftCode")}
                      description={`${withdraw?.beneficiary?.data?.intermediary_bank_swift_code}`}
                    />
                  </List.Item> 
                  
                  <List.Item>
                     <List.Item.Meta
                      title={t("details.recipient.accountNumber")}
                      description={`${withdraw?.beneficiary?.data?.account_number}`}
                    />
                  </List.Item>                       
                </List>
                  
                </Descriptions.Item>
              )}
            
              {withdraw?.type === CurrencyType.Coin && (
                <Descriptions.Item label={t("details.withdraw.txid")} span={2}>
                  <List itemLayout="horizontal">
                    {withdraw?.blockchain_txid ? (
                      <div>
                        {withdraw?.blockchain_txid}&nbsp;
                        <Button
                          shape="circle"
                          target="_blank"
                          icon={<LinkOutlined />}
                          href={withdraw.currency?.explorer_transaction?.replace("#{txid}", withdraw?.blockchain_txid)}
                        />
                      </div>
                    ) : withdraw.state === "accepted" ? (
                      <Input.Search
                        placeholder="TxID"
                        allowClear
                        enterButton="Load"
                        onChange={(e: any) => setTxid(e.target.value)}
                        size="large"
                        onSearch={onLoad}
                      />
                    ) : null}
                  </List>
                </Descriptions.Item>
              )}

              {withdraw?.type === CurrencyType.Coin && (
                <Descriptions.Item label={t("details.withdraw.rid")} span={2}>
                  <List itemLayout="horizontal">
                    {withdraw?.rid ? (
                      <div>
                        {withdraw?.rid}&nbsp;
                        <Button
                          shape="circle"
                          target="_blank"
                          icon={<LinkOutlined />}
                          href={withdraw.currency?.explorer_address?.replace("#{address}", withdraw?.rid)}
                          value={`${withdraw?.rid}`}
                        />
                        <Popover content="Copied" trigger="click">
                          <Button
                            shape="circle"
                            target="_blank"
                            icon={<CopyOutlined />}
                            style={{ marginLeft: "10px" }}
                            onClick={() => navigator.clipboard.writeText(withdraw?.rid)}
                          />
                        </Popover>
                      </div>
                    ) : withdraw.state === "accepted" ? (
                      <Input.Search placeholder="rid" allowClear enterButton="Load" size="large" onSearch={onLoad} />
                    ) : null}
                  </List>
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
      </PageHeader>
    </>
  );
}
