import { UserDetailsProps } from "../UserDetailsLayout";
import { Row, Collapse, Col, Descriptions, Button, Space, Image, Typography, Card } from "antd";
import countryISO from "i18n-iso-countries";
import { useMutation } from "../../../../../../graphql/hooks";
import { useDate } from "../../../../../../utils/hooks";
import { ProfileState } from "../../../../../../constants/user";
import { UpdateUserLabelGQL, UpdateUserProfileGQL } from "../../../../../../graphql/Mutations";
import { UpdateUserLabel, UpdateUserLabelVariables } from "../../../../../../graphql/mutations/UpdateUserLabel";
import { UpdateUserProfile, UpdateUserProfileVariables } from "../../../../../../graphql/mutations/UpdateUserProfile";
import { LabelKey, LabelScope, LabelValue } from "../../../../../../constants/user";
import { useTranslation } from "react-i18next";
import { BlockProps } from "antd/lib/typography/Base";

const profileStateColors: { [key in ProfileState]: BlockProps["type"] } = {
  [ProfileState.Verified]: "success",
  [ProfileState.Rejected]: "danger",
  [ProfileState.Submitted]: "warning",
  [ProfileState.Drafted]: undefined,
};

export default function UserDetailsKYC({ user }: UserDetailsProps) {
  const { i18n, t: translate } = useTranslation();
  const lang = i18n.language.split("-")[0];

  const { formatDate } = useDate();

  const t = (id: string) => translate(`setter.layouts.users.details.main.${id}`);

  const [updateLabel] = useMutation<UpdateUserLabel, UpdateUserLabelVariables>(UpdateUserLabelGQL);

  const [updateUserProfile] = useMutation<UpdateUserProfile, UpdateUserProfileVariables>(UpdateUserProfileGQL);

  const handleState = (state: string) => {
    updateUserProfile({ variables: { uid: user.uid, state } });
  };

  const handleLabel = (state: string) => {
    console.log(state);
    updateLabel({ variables: { key: LabelKey.Document, value: state, uid: user.uid, scope: LabelScope.Private } });
  };

  const documents = () => {
    if (user.documents && user.documents.length > 0) {
      return (
        <Collapse accordion defaultActiveKey={["0"]}>
          {user.documents.map((el: any, ind: number) => (
            <Collapse.Panel
              header={`${el.doc_type} #${el.doc_number} ${t("expired")} ${el.doc_expire}`}
              key={String(ind)}
            >
              <Image width="100%" alt="doc" src={el.upload.url} />
            </Collapse.Panel>
          ))}
        </Collapse>
      );
    }
    return null;
  };
  const profile = user.profiles.length > 0 ? user.profiles[0] : null;
  const profileActions = () => {
    if (profile && profile.state === "submitted") {
      return (
        <Space>
          <Button type="primary" danger onClick={() => handleState("rejected")}>
            {t("profile.reject")}
          </Button>
          <Button type="primary" onClick={() => handleState("verified")}>
            {t("profile.approve")}
          </Button>
        </Space>
      );
    }
    if (profile && profile.state === "rejected") {
      return (
        <Space>
          <Button type="primary" onClick={() => handleState("verified")}>
            {t("profile.approve")}
          </Button>
        </Space>
      );
    }
    return null;
  };
  const docActions = () => {
    const docLabel = user.labels.find((el) => el.key === "document");
    if (docLabel && docLabel.value === "pending") {
      return (
        <Space>
          <Button type="primary" danger onClick={() => handleLabel("rejected")}>
            {t("profile.reject")}
          </Button>
          <Button type="primary" onClick={() => handleLabel("verified")}>
            {t("profile.approve")}
          </Button>
        </Space>
      );
    }
    if (docLabel && docLabel.value === "rejected") {
      return (
        <Space>
          <Button type="primary" onClick={() => handleLabel(LabelValue.Submitted)}>
            {t("profile.approve")}
          </Button>
        </Space>
      );
    }
    return null;
  };
  const renderProfileValues = () => {
    if (profile) {
      const metadata = JSON.parse(profile.metadata || "{}");
      const _profile = {
        ...profile,
        ...metadata,
      };

      const keys: Array<any> = [
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

      if (metadata && metadata.nationality) {
        delete metadata.nationality;
        Object.keys(metadata).map((el) => keys.push(el));
      }

      return keys.map((key) => {
        let value: any = _profile[key];
        let label = t(`profile.${key}`);

        if (key === "dob") value = formatDate(value, "PP");

        if (key === "state") {
          value = (
            <Typography.Text strong type={profileStateColors[value as ProfileState]}>
              {t(`profile.state.${value}`)}
            </Typography.Text>
          );
          label = t(`profile.state.title`);
        }

        if (key === "country") {
          value = countryISO.getName(profile.country, lang, { select: "official" });
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
  return (
    <Row>
      <Col span={12}>
        <Card title={t("profile.title")} extra={profileActions()}>
          <Descriptions column={1}>{renderProfileValues()}</Descriptions>
        </Card>
      </Col>
      <Col span={12}>
        <Card title={t("documents")} extra={docActions()}>
          {documents()}
        </Card>
      </Col>
    </Row>
  );
}
