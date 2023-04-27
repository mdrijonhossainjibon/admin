import React from "react";
import { Badge, Button, Descriptions, List, PageHeader, Skeleton } from "antd";
import { DepositDetailsRouteParams, RouteParams, Routes } from "../../../../../constants/routes";
import { EllipsisOutlined, LinkOutlined, ReloadOutlined } from "@ant-design/icons";
import DepositType from "../DepositType";
import DepositStateCell from "../DepositState";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "../../../../../graphql/hooks";
import { AdminSingleDepositGQL } from "../../../../../graphql/Queries";
import { DepositActionGQL } from "../../../../../graphql/Mutations";
import { AdminSingleDeposit, AdminSingleDepositVariables } from "../../../../../graphql/queries/AdminSingleDeposit";
import { DepositAction, DepositActionVariables } from "../../../../../graphql/mutations/DepositAction";
import UserStatus from "../../../users/UserStatus/UserStatus";

export default function DepositDetails() {
  const history = useHistory();

  const goToCurrencyDetails = (code: string) => {
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  };
  const goToBlockchainDetails = (id: number) => {
    history.push(Routes.withParams.BlockchainsDetails({ id }));
  };

  const goToUserDetails = (uid: string) => {
    history.push(Routes.withParams.UsersDetails({ uid }));
  };

  const { t: translate } = useTranslation();
  const t = (id: string) => translate(`setter.layouts.operations.deposits.${id}`);

  const { tid } = useParams<RouteParams<DepositDetailsRouteParams>>();

  const { data: adminDeposit, loading, refetch } = useQuery<AdminSingleDeposit, AdminSingleDepositVariables>(
    AdminSingleDepositGQL,
    {
      variables: { tid: String(tid) },
    }
  );

  const [depositAction] = useMutation<DepositAction, DepositActionVariables>(DepositActionGQL);

  const deposit = adminDeposit?.adminDeposit;

  const skeleton = (content: React.ReactNode, rows: number = 9) =>
    loading ? <Skeleton paragraph={{ rows }} active /> : content;

  // const renderDescriptionItem = (label: string, value: any) =>
  //     value && <Descriptions.Item label={label}>{value}</Descriptions.Item>;

  // @ts-ignore
  // @ts-ignore
  // const { email } = deposit;
  // @ts-ignore
  console.log(deposit);
  const currencyPrecision = deposit?.currency?.precision || 2;
  const currencyCode = deposit?.currency?.code?.toLocaleUpperCase() || "";
  const isCoin = deposit?.type === "coin";
  const onReject = () => {
    deposit && depositAction({ variables: { id: deposit.id, action: "reject" } });
    refetch();
  };
  const onApprove = () => {
    if (deposit && deposit.type === "coin") {
      depositAction({ variables: { id: deposit.id, action: "dispatch" } });
    }
    if (deposit && deposit.type === "fiat") {
      depositAction({ variables: { id: deposit.id, action: "accept" } });
    }
    refetch();
  };
  return (
    <PageHeader
      ghost={false}
      onBack={() => history.goBack()}
      title={t("details.title")}
      extra={[
        <Button
          key={1}
          loading={loading}
          icon={<ReloadOutlined />}
          onClick={() => {
            if (refetch) refetch();
          }}
        >
          {t("table.reload")}
        </Button>,
      ]}
    >
      {" "}
      {deposit && (
        <>
          {skeleton(
            <Descriptions bordered column={{ lg: 2, md: 1 }}>
              <Descriptions.Item label={"Type"}>
                <List>
                  <List.Item>
                    <List.Item.Meta title={deposit.tid} description={<DepositType type={deposit.type} />} />
                  </List.Item>
                </List>
              </Descriptions.Item>
              <Descriptions.Item label={t("details.deposit.state")}>
                <List>
                  {deposit?.state === "submitted" ? (
                    <List.Item
                      actions={[
                        <Button type="primary" danger onClick={() => onReject()}>
                          {t("details.deposit.reject")}
                        </Button>,
                        <Button type="primary" onClick={() => onApprove()}>
                          {t("details.deposit.approve")}
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta title={<DepositStateCell deposit={deposit} />} />
                    </List.Item>
                  ) : (
                    <List.Item>
                      <List.Item.Meta title={<DepositStateCell deposit={deposit} />} />
                    </List.Item>
                  )}
                </List>
              </Descriptions.Item>

              <Descriptions.Item label={t("details.deposit.amount")}>{`${deposit?.amount?.toFixed(
                currencyPrecision
              )} ${currencyCode}`}</Descriptions.Item>
              <Descriptions.Item label={t("details.deposit.fee")}>{`${deposit?.fee?.toFixed(
                currencyPrecision
              )} ${currencyCode}`}</Descriptions.Item>
              <Descriptions.Item label={t("details.user.title")}>
                <List
                  itemLayout="horizontal"
                  dataSource={[{ ...deposit.member }]}
                  renderItem={(c: any) => (
                    <List.Item
                      extra={
                        <Button
                          shape="circle"
                          icon={<EllipsisOutlined />}
                          onClick={() => goToUserDetails(c.user?.uid)}
                        />
                      }
                    >
                      <List.Item.Meta
                        title={`${c.user?.email} (${c.user?.uid})`}
                        description={<UserStatus state={c.user?.state} />}
                      />
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
              {deposit?.currency && (
                <Descriptions.Item label={t("details.deposit.currency")}>
                  <List
                    itemLayout="horizontal"
                    dataSource={[{ ...deposit?.currency }]}
                    renderItem={(c: any) => (
                      <List.Item
                        extra={
                          <Button
                            shape="circle"
                            icon={<EllipsisOutlined />}
                            onClick={() => goToCurrencyDetails(c.code)}
                          />
                        }
                      >
                        <List.Item.Meta
                          title={<Badge status={c.visible ? "success" : "error"} text={`${c.name} (${c.code})`} />}
                        />
                      </List.Item>
                    )}
                  />
                </Descriptions.Item>
              )}
              {isCoin && [
                <Descriptions.Item label={t("details.deposit.blockchain")}>
                  <List
                    itemLayout="horizontal"
                    dataSource={[{ ...deposit?.currency?.blockchain }]}
                    renderItem={(c: any) => (
                      <List.Item
                        extra={
                          <Button
                            shape="circle"
                            icon={<EllipsisOutlined />}
                            onClick={() => goToBlockchainDetails(c.id)}
                          />
                        }
                      >
                        <List.Item.Meta
                          title={<Badge status={c.enabled ? "success" : "error"} text={`${c.name} (${c.key})`} />}
                        />
                      </List.Item>
                    )}
                  />
                </Descriptions.Item>,
                <Descriptions.Item label={t("details.deposit.txid")}>
                  <List
                    itemLayout="horizontal"
                    dataSource={[{ txid: deposit?.txid }]}
                    renderItem={(c: any) => (
                      <List.Item>
                        <List.Item.Meta title={`${c.txid}`} />
                        <Button
                          shape="circle"
                          target="_blank"
                          icon={<LinkOutlined />}
                          href={deposit.currency?.explorer_transaction?.replace("#{txid}", c.txid)}
                        />
                      </List.Item>
                    )}
                  />
                </Descriptions.Item>,
                <Descriptions.Item label={t("details.deposit.txout")}>{`${deposit?.txout}`}</Descriptions.Item>,
                <Descriptions.Item
                  label={t("details.deposit.block_number")}
                >{`${deposit?.block_number}`}</Descriptions.Item>,
              ]}

              {/*<Descriptions.Item label={t("user.created")}>{formatDate(deposit?.user.created_at)}</Descriptions.Item>*/}
            </Descriptions>
          )}
        </>
      )}
    </PageHeader>
  );
}
