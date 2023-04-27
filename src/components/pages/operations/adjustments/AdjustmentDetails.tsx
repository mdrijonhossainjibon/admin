import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AdjustmentRouteParams, RouteParams } from "../../../../constants/routes";
import { useMutation, useQuery } from "../../../../graphql/hooks";
import { AdminAdjustmentGQL } from "../../../../graphql/Queries";
import { AdminAdjustment, AdminAdjustmentVariables } from "../../../../graphql/queries/AdminAdjustment";
import { Button, Card, Descriptions, Empty, PageHeader, Skeleton, Space } from "antd";
import { useDate } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { AdjustmentAction, AdjustmentState } from "../../../../constants/adjustments";
import { AdjustmentActionGQL } from "../../../../graphql/Mutations";
import {
  AdjustmentAction as AdjustmentActionMutation,
  AdjustmentActionVariables,
} from "../../../../graphql/mutations/AdjustmentAction";

export default function AdjustmentDetails() {
  const { formatDate } = useDate();
  const { id } = useParams<RouteParams<AdjustmentRouteParams>>();
  const { t: translate } = useTranslation();
  const history = useHistory();

  const t = (id: string) => translate(`setter.layouts.operations.adjustments.${id}`);

  const { data, loading } = useQuery<AdminAdjustment, AdminAdjustmentVariables>(AdminAdjustmentGQL, {
    variables: { id: Number(id) },
  });

  const adjustment = data?.adminAdjustment;

  return (
    <>
      <Card className="setter-details-card">
        <PageHeader
          ghost={false}
          onBack={() => history.goBack()}
          title={t("details.title")}
          style={{ padding: "1.5rem 0" }}
          extra={adjustment?.state === AdjustmentState.Pending && <AdjustmentActionButtons t={t} />}
        />
        {adjustment || loading ? (
          <>
            <Skeleton paragraph={{ rows: 9 }} loading={loading} active>
              <Descriptions column={1} bordered>
                <Descriptions.Item label={t("details.reason")}>{adjustment?.reason}</Descriptions.Item>
                <Descriptions.Item label={t("details.state")}>{t(`state.${adjustment?.state}`)}</Descriptions.Item>
                <Descriptions.Item label={t("details.created")}>{formatDate(adjustment?.created_at)}</Descriptions.Item>
                <Descriptions.Item label={t("details.updated")}>{formatDate(adjustment?.updated_at)}</Descriptions.Item>
                <Descriptions.Item label={t("details.currency")}>
                  {adjustment?.currency?.code?.toUpperCase()}
                </Descriptions.Item>
                <Descriptions.Item label={t("details.category")}>
                  {t(`category.${adjustment?.category}`)}
                </Descriptions.Item>
                <Descriptions.Item label={t("details.amount")}>{adjustment?.amount}</Descriptions.Item>
                <Descriptions.Item label={t("details.assetAccountCode")}>
                  {adjustment?.asset_account_code}
                </Descriptions.Item>
              </Descriptions>
            </Skeleton>
            <Skeleton paragraph={{ rows: 3 }} loading={loading} active>
              <Descriptions title={t("details.receiver.title")} column={3} bordered>
                <Descriptions.Item label={t("details.receiver.uid")}>
                  {adjustment?.receiving_member?.uid}
                </Descriptions.Item>
                <Descriptions.Item label={t("details.receiver.email")}>
                  {adjustment?.receiving_member?.email}
                </Descriptions.Item>
                <Descriptions.Item label={t("details.receiver.role")}>
                  {adjustment?.receiving_member?.role}
                </Descriptions.Item>
                <Descriptions.Item label={t("details.receiver.accountCode")}>
                  {adjustment?.receiving_account_code}
                </Descriptions.Item>
              </Descriptions>
            </Skeleton>
            <Skeleton paragraph={{ rows: 3 }} loading={loading} active>
              <Descriptions title={t("details.validator.title")} column={3} bordered>
                <Descriptions.Item label={t("details.validator.uid")}>{adjustment?.validator?.uid}</Descriptions.Item>
                <Descriptions.Item label={t("details.validator.email")}>
                  {adjustment?.validator?.email}
                </Descriptions.Item>
                <Descriptions.Item label={t("details.validator.role")}>{adjustment?.validator?.role}</Descriptions.Item>
              </Descriptions>
            </Skeleton>
            <Skeleton paragraph={{ rows: 3 }} loading={loading} active>
              <Descriptions title={t("details.creator.title")} column={3} bordered>
                <Descriptions.Item label={t("details.creator.uid")}>{adjustment?.creator?.uid}</Descriptions.Item>
                <Descriptions.Item label={t("details.creator.email")}>{adjustment?.creator?.email}</Descriptions.Item>
                <Descriptions.Item label={t("details.creator.role")}>{adjustment?.creator?.role}</Descriptions.Item>
              </Descriptions>
            </Skeleton>
          </>
        ) : (
          <Empty />
        )}
      </Card>
    </>
  );
}

const AdjustmentActionButtons = ({ t }: { t: (id: string) => string }) => {
  const [loadingAction, setLoadingAction] = useState<AdjustmentAction | undefined>(undefined);
  const { id } = useParams<RouteParams<AdjustmentRouteParams>>();

  const [adjustmentAction, { data, error }] = useMutation<AdjustmentActionMutation, AdjustmentActionVariables>(
    AdjustmentActionGQL
  );

  useEffect(() => {
    if (data || error) {
      setLoadingAction(undefined);
    }
  }, [data, error]);

  const handleAdjustmentAction = (action: AdjustmentAction) => {
    setLoadingAction(action);
    adjustmentAction({ variables: { action, id: Number(id) } });
  };

  return (
    <Space>
      <Button
        type="primary"
        loading={loadingAction === AdjustmentAction.Accept}
        onClick={() => handleAdjustmentAction(AdjustmentAction.Accept)}
      >
        {t("state.accept")}
      </Button>
      <Button
        type="primary"
        loading={loadingAction === AdjustmentAction.Reject}
        onClick={() => handleAdjustmentAction(AdjustmentAction.Reject)}
        danger
      >
        {t("state.reject")}
      </Button>
    </Space>
  );
};
