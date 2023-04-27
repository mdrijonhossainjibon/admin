import { useRef } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { UserFilterBridge, UserFilterData, UserFilterSchema } from "./UserFilterBridge";
import { AutoForm, AutoField } from "uniforms-antd";
import { UserRole, UserState } from "../../../../../constants/user";
import { Button, Row } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  loading: boolean;
  onSubmit: (values?: UserFilterData) => void;
}

export default function UserFilterForm({ onSubmit, loading }: Props) {
  const formRef = useRef<typeof AutoForm>(null);

  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.users.filter.${id}`);

  const handleSubmit = (values: UserFilterSchema) => {
    const variables: UserFilterData = {
      ...values,
      from: values.from && String(Math.floor(new Date(values.from).getTime() / 1000)),
      to: values.to && String(Math.floor(new Date(values.to).getTime() / 1000)),
    };

    Object.keys(variables).forEach((key) => {
      const k = key as keyof UserFilterData;
      if (variables[k] === "") variables[k] = undefined;
    });

    onSubmit(variables);
  };

  const handleReset = () => {
    formRef?.current?.reset();
    onSubmit();
  };

  const roleOptions = Object.values(UserRole).map((role) => ({
    value: role,
    label: role,
  }));

  const stateOptions = Object.values(UserState).map((state) => ({
    label: t(`state.${state}`),
    value: state,
  }));

  return (
    <AutoForm
      ref={formRef}
      className="setter-form"
      style={{ minWidth: "320px" }}
      schema={UserFilterBridge}
      onSubmit={handleSubmit}
    >
      <AutoField name="uid" label={t("uid")} />
      <AutoField name="email" label={t("email")} />
      <AutoField name="role" label={t("role")} options={roleOptions} />
      <AutoField name="first_name" label={t("firstName")} />
      <AutoField name="last_name" label={t("lastName")} />
      <AutoField name="country" label={t("country")} />
      <AutoField name="level" label={t("level")} />
      <AutoField name="state" label={t("state.title")} options={stateOptions} />
      <AutoField name="from" label="From" showTime={false} />
      <AutoField name="to" label="To" showTime={false} />
      <Row>
        <Button style={{ margin: 0 }} htmlType="submit" type="primary" loading={loading}>
          {t("submit")}
        </Button>
        <Button style={{ marginLeft: "auto" }} onClick={handleReset} icon={<ReloadOutlined />}>
          {t("reset")}
        </Button>
      </Row>
    </AutoForm>
  );
}
