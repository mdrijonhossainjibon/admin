import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { AdminPermissions_adminPermissions_result } from "../../../../../graphql/queries/AdminPermissions";
import { AutoForm, AutoField, SubmitField, ErrorsField } from "uniforms-antd";
import { PermissionBridge, PermissionData } from "./PermissionBridge";
import { useTranslation } from "react-i18next";
import {
  CreatePermission_adminCreatePermission,
  CreatePermissionVariables,
} from "../../../../../graphql/mutations/CreatePermission";
import {
  UpdatePermission_adminUpdatePermission,
  UpdatePermissionVariables,
} from "../../../../../graphql/mutations/UpdatePermission";
import { CreatePermissionGQL, UpdatePermissionGQL } from "../../../../../graphql/Mutations";
import { useMutation } from "../../../../../graphql/hooks";
// import CurrencyOptionForm from "./CurrencyOptionForm";
import { renderRows } from "../../../../../utils/component-utils";
import { UserPermissionAction, UserPermissionVerb } from "../../../../../constants/userPermissions";
import { UserRole } from "../../../../../constants/user";

export interface PermissionOption {
  key: string;
  value: string;
}

interface Props {
  initialData?: AdminPermissions_adminPermissions_result;
  onCompleted?: () => void;
}

export default function PermissionForm({ initialData, onCompleted }: Props) {
  // const [optionFields, setOptionFields] = useState<CurrencyOption[]>(initialData?.options || []);
  const [userPermissionAction, setUserPermissionAction] = useState<string | undefined>(undefined);

  const isAudit = userPermissionAction === "AUDIT";
  const { t: translate } = useTranslation();

  const isUpdating = !!initialData;

  const t = (id: string) => translate(`setter.layouts.devops.userPermissions.${id}`);

  useEffect(() => {
    if (initialData?.action) {
      setUserPermissionAction(initialData.action);
    }
  }, []);

  const handleFormChange = (key: string, value: any) => {
    if (key === "action") {
      setUserPermissionAction(value);
    }
  };

  const [updatePermission, { loading: loadingUpdate }] = useMutation<
    UpdatePermission_adminUpdatePermission,
    UpdatePermissionVariables
  >(UpdatePermissionGQL, {
    onCompleted,
    successMessage: t("form.updatedSuccess"),
  });

  const [createPermission, { loading: loadingCreate }] = useMutation<
    CreatePermission_adminCreatePermission,
    CreatePermissionVariables
  >(CreatePermissionGQL, {
    onCompleted,
    successMessage: t("form.createdSuccess"),
  });

  const handleSubmit = (values: PermissionData) => {
    const variables: CreatePermissionVariables | UpdatePermissionVariables = {
      id: values.id,
      role: values.role,
      verb: values.verb,
      path: values.path,
      action: values.action,
    };
    if (values.topic) {
      variables.topic = values.topic;
    }
    if (isUpdating) updatePermission({ variables });
    else createPermission({ variables });
  };

  const generalRows = [
    [
      <AutoField
        allowedValues={Object.values(UserRole)}
        name="role"
        label={t("form.role")}
        getPopupContainer={(node: any) => node.parentNode}
      />,
      <AutoField
        allowedValues={Object.values(UserPermissionAction)}
        name="action"
        label={t("form.action")}
        getPopupContainer={(node: any) => node.parentNode}
      />,
    ],
    [
      <AutoField name="path" label={t("form.path")} />,
      <AutoField
        allowedValues={Object.values(UserPermissionVerb)}
        name="verb"
        label={t("form.verb")}
        getPopupContainer={(node: any) => node.parentNode}
      />,
    ],
  ];

  return (
    <>
      <AutoForm
        className="setter-form"
        onChange={handleFormChange}
        schema={PermissionBridge}
        model={initialData}
        onSubmit={handleSubmit}
      >
        <Row gutter={24}>
          <Col span={24} className="form-section">
            {renderRows(generalRows)}
          </Col>
        </Row>
        {isAudit && (
          <Row>
            <Col span={24} className="form-section">
              <AutoField name="topic" label={t("form.topic")} />
            </Col>
          </Row>
        )}
        <ErrorsField />
        <SubmitField
          disabled={loadingCreate || loadingUpdate}
          value={isUpdating ? t("form.update") : t("form.create")}
        />
      </AutoForm>
    </>
  );
}
