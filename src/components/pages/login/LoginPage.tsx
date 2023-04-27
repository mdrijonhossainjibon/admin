import { useState } from "react";
import { AutoField, AutoForm, ErrorsField, SubmitField } from "uniforms-antd";
import { Card } from "antd";
import { LoginBridge, LoginData } from "./LoginBridge";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context/auth-context";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const authContext = useAuthContext();

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    await authContext.loginUser(data);
    setLoading(false);
  };

  return (
    <div className="setter-container-layout">
      <img src="/setter.svg" style={{ bottom: 0, left: 0, position: "fixed" }} />
      <Card className="setter-card-layout">
        <AutoForm schema={LoginBridge} onSubmit={handleLogin}>
          <h4>{t("setter.login.form.header")}</h4>
          <AutoField name="email" label={t("setter.login.form.email")} placeholder={t("setter.login.form.ph.email")} />
          <AutoField
            name="password"
            label={t("setter.login.form.password")}
            placeholder={t("setter.login.form.ph.password")}
          />
          <AutoField name="otp_code" label={t("setter.login.form.otp")} placeholder={t("setter.login.form.ph.otp")} />
          <ErrorsField />
          <SubmitField loading={loading} value={t("setter.login.form.login") as string} />
        </AutoForm>
      </Card>
    </div>
  );
}
