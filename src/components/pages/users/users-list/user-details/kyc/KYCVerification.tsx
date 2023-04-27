import { useDate } from "../../../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { useMutation } from "../../../../../../graphql/hooks";
import { DeleteUserLabel, DeleteUserLabelVariables } from "../../../../../../graphql/mutations/DeleteUserLabel";
import { CreateUserLabelGQL, DeleteUserLabelGQL } from "../../../../../../graphql/Mutations";
import { CreateUserLabel, CreateUserLabelVariables } from "../../../../../../graphql/mutations/CreateUserLabel";
import { LabelKey, LabelScope, LabelValue } from "../../../../../../constants/user";
import { Descriptions, Space, Switch, Typography } from "antd";
import { AdminSimpleUser_adminUserWithoutActivities } from "../../../../../../graphql/queries/AdminSimpleUser";

export default function KYCVerification({ user }: { user: AdminSimpleUser_adminUserWithoutActivities }) {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

  const t = (id: string, vars?: object) => translate(`setter.layouts.users.details.kyc.verification.${id}`, vars);

  const [deleteLabel, { loading: loadingDelete }] = useMutation<DeleteUserLabel, DeleteUserLabelVariables>(
    DeleteUserLabelGQL
  );
  const [createLabel, { loading: loadingCreate }] = useMutation<CreateUserLabel, CreateUserLabelVariables>(
    CreateUserLabelGQL
  );

  const isLabelVerified = (key: LabelKey) => {
    return user.labels.find(
      (label) => label.key === key && label.scope === LabelScope.Private && label.value === LabelValue.Verified
    );
  };

  const handleDelete = (key: LabelKey) => {
    deleteLabel({ variables: { key, uid: user.uid, scope: LabelScope.Private } });
  };

  const handleVerify = (key: LabelKey) => {
    createLabel({ variables: { key, uid: user.uid, scope: LabelScope.Private, value: LabelValue.Verified } });
  };

  const handleToggle = (key: LabelKey) => (value: boolean) => {
    if (!value) {
      handleDelete(key);
    } else {
      handleVerify(key);
    }
  };

  const loading = loadingDelete || loadingCreate;

  const kycItems = [
    { name: `${t("email")} (${t("level", { level: 1 })})`, key: LabelKey.Email },
    { name: `${t("phone")} (${t("level", { level: 2 })})`, key: LabelKey.Phone },
    { name: `${t("document")} (${t("level", { level: 3 })})`, key: LabelKey.Document },
  ];

  return (
    <Descriptions
      title={
        <Space align="baseline">
          <div>{t("title")}</div>
          <Typography.Text type="secondary">{t("level", { level: user.level })}</Typography.Text>
        </Space>
      }
      column={1}
      bordered
    >
      {kycItems.map((item) => {
        const label = isLabelVerified(item.key);
        const checked = !!label;
        const onChange = handleToggle(item.key);

        const labelText = (
          <>
            <div>{item.name}</div>
            <Typography.Text type="secondary" style={{ fontWeight: 400 }}>
              {label ? t("verified", { date: formatDate(label.updated_at) }) : t("notVerified")}
            </Typography.Text>
          </>
        );

        return (
          <Descriptions.Item key={item.key} label={labelText} style={{ width: "70%" }}>
            <Switch {...{ loading, checked, onChange }} />
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
}
