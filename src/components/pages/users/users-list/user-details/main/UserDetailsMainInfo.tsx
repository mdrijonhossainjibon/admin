import { useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Empty, Row, List, Select, Modal, Switch, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDate } from "../../../../../../utils/hooks";
import { Routes } from "../../../../../../constants/routes";
import { ProfileState, UserRole, UserState } from "../../../../../../constants/user";
import { useQuery, useMutation } from "../../../../../../graphql/hooks";
import {
  UpdateUserAttributesGQL,
  UpdateUserRoleGQL,
  UpdateUserProfileGQL,
  SetUserGroupGQL,
} from "../../../../../../graphql/Mutations";
import {
  UpdateUserAttributes,
  UpdateUserAttributesVariables,
} from "../../../../../../graphql/mutations/UpdateUserAttributes";
import { UpdateUserProfile, UpdateUserProfileVariables } from "../../../../../../graphql/mutations/UpdateUserProfile";
import { UpdateUserRole, UpdateUserRoleVariables } from "../../../../../../graphql/mutations/UpdateUserRole";
import { SetUserGroup, SetUserGroupVariables } from "../../../../../../graphql/mutations/SetUserGroup";
import { AdminMemberGQL, AdminTradingFeesGQL } from "../../../../../../graphql/Queries";
import { AdminMemberVariables, AdminMember } from "../../../../../../graphql/queries/AdminMember";
import { AdminTradingFees, AdminTradingFeesVariables } from "../../../../../../graphql/queries/AdminTradingFees";
import { AdminUser_adminUser_profiles } from "../../../../../../graphql/queries/AdminUser";
import UserLabels from "../labels/UserLabels";
import ProfileForm from "./form/ProfileForm";
import { UserDetailsProps } from "../UserDetailsLayout";
import KYCVerification from "../kyc/KYCVerification";
import { BlockProps } from "antd/lib/typography/Base";

const profileStateColors: { [key in ProfileState]: BlockProps["type"] } = {
  [ProfileState.Verified]: "success",
  [ProfileState.Rejected]: "danger",
  [ProfileState.Submitted]: "warning",
  [ProfileState.Drafted]: undefined,
};

export default function UserDetailsMainInfo({ user }: UserDetailsProps) {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();
  const history = useHistory();

  const t = (id: string) => translate(`setter.layouts.users.details.main.${id}`);

  const [updateUserAttributes, { loading: loadingUpdate }] = useMutation<
    UpdateUserAttributes,
    UpdateUserAttributesVariables
  >(UpdateUserAttributesGQL);

  const { data: member } = useQuery<AdminMember, AdminMemberVariables>(AdminMemberGQL, {
    variables: { uid: user.uid },
  });

  const { data: tradingFees } = useQuery<AdminTradingFees, AdminTradingFeesVariables>(AdminTradingFeesGQL);

  const [updateUserProfile] = useMutation<UpdateUserProfile, UpdateUserProfileVariables>(UpdateUserProfileGQL);

  const [updateUserRole] = useMutation<UpdateUserRole, UpdateUserRoleVariables>(UpdateUserRoleGQL);

  const [setUserGroup] = useMutation<SetUserGroup, SetUserGroupVariables>(SetUserGroupGQL);

  const handleUpdate = async (variables: UpdateUserAttributesVariables) => {
    await updateUserAttributes({ variables: { ...variables, uid: user.uid } });
  };

  const profile = user.profiles ? user.profiles[user.profiles.length - 1] : null;

  const renderProfileValues = () => {
    if (profile) {
      const _profile = {
        ...profile,
        nationality: JSON.parse(profile.metadata || "{}")?.nationality,
      };

      const keys: Array<keyof typeof _profile> = [
        "state",
        "first_name",
        "last_name",
        "address",
        "city",
        "country",
        "dob",
        "nationality",
        "postcode",
      ];

      const onHandleState = (state: string) => {
        updateUserProfile({ variables: { uid: user.uid, state } });
      };

      return keys.map((key) => {
        let value: any = _profile[key];
        let label = t(`profile.${key}`);

        if (key === "dob") value = formatDate(value, "PP");

        if (key === "state") {
          if (value === "submitted") {
            value = (
              <List>
                <List.Item
                  actions={[
                    <Button type="primary" danger onClick={() => onHandleState("rejected")}>
                      {t("profile.reject")}
                    </Button>,
                    <Button type="primary" onClick={() => onHandleState("verified")}>
                      {t("profile.approve")}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    description={
                      <Typography.Text strong type={profileStateColors[value as ProfileState]}>
                        {t(`profile.state.${value}`)}
                      </Typography.Text>
                    }
                  />
                </List.Item>
              </List>
            );
          } else {
            value = (
              <Typography.Text strong type={profileStateColors[value as ProfileState]}>
                {t(`profile.state.${value}`)}
              </Typography.Text>
            );
          }
          label = t(`profile.state.title`);
        }

        return (
          <Descriptions.Item key={key} label={label}>
            {value}
          </Descriptions.Item>
        );
      });
    }

    return null;
  };

  const tradingFeesArray = () => {
    const result: string[] = [];
    tradingFees?.adminTradingFees.reduce((memo, el) => {
      if (!memo.includes(String(el.group))) {
        memo.push(String(el.group));
      }
      return memo;
    }, result);
    return result;
  };

  return (
    <>
      <Card className="setter-details-card">
        <Descriptions column={2} bordered title={t("title")}>
          <Descriptions.Item label={t("uid")}>{user.uid}</Descriptions.Item>
          <Descriptions.Item label={t("level")}>{user.level}</Descriptions.Item>
          <Descriptions.Item label={t("email")}>{user.email}</Descriptions.Item>
          <Descriptions.Item label={t("role")}>
            <EditableItem
              t={t}
              value={user.role}
              onUpdate={async (role) => {
                await updateUserRole({ variables: { role, uid: user.uid } });
              }}
              options={Object.values(UserRole)}
            />
          </Descriptions.Item>
          <Descriptions.Item label={t("referral")}>
            {user.referral_uid ? (
              <List>
                <List.Item
                  extra={
                    <Button
                      shape="circle"
                      icon={<EllipsisOutlined />}
                      onClick={() => {
                        history.push(Routes.withParams.UsersDetails({ uid: user.referral_uid }));
                      }}
                    />
                  }
                >
                  <List.Item.Meta title={user.referral_uid} />
                </List.Item>
              </List>
            ) : null}
          </Descriptions.Item>
          <Descriptions.Item label={t("feeGroup")}>
            <EditableItem
              t={t}
              value={member?.adminMember.group || ""}
              onUpdate={async (group) => {
                await setUserGroup({ variables: { group, uid: user.uid } });
              }}
              options={tradingFeesArray()}
            />
          </Descriptions.Item>
          <Descriptions.Item label={t("2fa.label")}>
            <Space>
              <Switch
                disabled={!user.otp}
                loading={loadingUpdate}
                checked={user.otp}
                onChange={(otp) => handleUpdate({ otp })}
              />
              <span>{user.otp ? t("2fa.enabled") : t("2fa.disabled")}</span>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label={t("state")}>
            <EditableItem
              t={t}
              //do not right user.state view
              value={user.state}
              onUpdate={async (state) => {
                await updateUserAttributes({ variables: { state, uid: user.uid } });
              }}
              options={Object.values(UserState)}
            />
          </Descriptions.Item>
        </Descriptions>
        <Row gutter={24}>
          <Col span={12}>
            <Descriptions
              title={
                <Space>
                  <div>{t("profile.title")}</div>
                  {profile?.state === ProfileState.Submitted && <EditProfile user={user} profile={profile} t={t} />}
                </Space>
              }
              column={1}
              bordered
            >
              {!profile ? (
                <Descriptions.Item>
                  <Empty description={t("profile.missing")} />
                </Descriptions.Item>
              ) : (
                renderProfileValues()
              )}
            </Descriptions>
          </Col>
          <Col span={12}>
            <KYCVerification user={user} />
          </Col>
        </Row>
      </Card>
      <UserLabels user={user} />
    </>
  );
}

const EditableItem = <T extends string>({
  value,
  onUpdate,
  options,
  t,
}: {
  value: T;
  onUpdate: (value: T) => Promise<void>;
  options: T[];
  t: (id: string) => string;
}) => {
  const [isEditing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (selectedValue: any) => {
    setLoading(true);
    selectedValue !== value && (await onUpdate(selectedValue));
    setEditing(false);
    setLoading(false);
  };

  return (
    <>
      {isEditing ? (
        <Select loading={loading} defaultValue={value} onSelect={handleSelect} dropdownMatchSelectWidth={false}>
          {options.map((value) => (
            <Select.Option key={value} value={value}>
              {value}
            </Select.Option>
          ))}
        </Select>
      ) : (
        value
      )}
      <Button type="link" onClick={() => setEditing(!isEditing)}>
        {isEditing ? t("close") : t("edit")}
      </Button>
    </>
  );
};

const EditProfile = ({
  t,
  profile,
  user,
}: {
  t: (id: string) => string;
  profile: AdminUser_adminUser_profiles;
} & UserDetailsProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleComplete = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        {t("profile.edit")}
      </Button>
      <Modal
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        title={t("profile.edit")}
        footer={null}
        destroyOnClose={true}
      >
        <ProfileForm initialValues={profile} uid={user.uid} onCompleted={handleComplete} />
      </Modal>
    </>
  );
};
