// import React, { useEffect, useState } from "react";
import React from "react";
import { AutoForm, AutoField, SubmitField } from "uniforms-antd";
import { LabelBridge, LabelData } from "./LabelBridge";
// import { useMutation, useQuery } from "../../../../../../graphql/hooks";
import { useMutation } from "../../../../../../graphql/hooks";
import { CreateUserLabelGQL, UpdateUserLabelGQL } from "../../../../../../graphql/Mutations";
import { CreateUserLabel, CreateUserLabelVariables } from "../../../../../../graphql/mutations/CreateUserLabel";
import {
  AdminSimpleUser_adminUserWithoutActivities,
  AdminSimpleUser_adminUserWithoutActivities_labels,
} from "../../../../../../graphql/queries/AdminSimpleUser";
import { UpdateUserLabel, UpdateUserLabelVariables } from "../../../../../../graphql/mutations/UpdateUserLabel";
// import { AdminLabels, AdminLabelsVariables } from "../../../../../../graphql/queries/AdminLabels";
// import { AdminLabelsGQL } from "../../../../../../graphql/Queries";
import { useTranslation } from "react-i18next";

interface Props {
  user: AdminSimpleUser_adminUserWithoutActivities;
  initialData?: AdminSimpleUser_adminUserWithoutActivities_labels;
  onCompleted: () => void;
}

export default function LabelForm({ onCompleted, user, initialData }: Props) {
  const { t: translate } = useTranslation();
  // const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);
  const formRef = React.useRef<typeof AutoForm>(null);

  const t = (id: string) => translate(`setter.layouts.users.details.labels.form.${id}`);

  const isUpdating = !!initialData;

  const [createLabel, { loading: loadingCreate }] = useMutation<CreateUserLabel, CreateUserLabelVariables>(
    CreateUserLabelGQL,
    { onCompleted }
  );
  const [updateLabel, { loading: loadingUpdate }] = useMutation<UpdateUserLabel, UpdateUserLabelVariables>(
    UpdateUserLabelGQL,
    { onCompleted }
  );

  // const { data: labels } = useQuery<AdminLabels, AdminLabelsVariables>(AdminLabelsGQL);

  // useEffect(() => {
  //   if (initialData) {
  //     setSelectedKey(initialData.key);
  //   }
  // }, [labels]);

  const handleFormChange = (key: keyof LabelData) => {
    //, value: string) => {
    if (key === "key") {
      // setSelectedKey(value);
      formRef?.current?.change("value", undefined);
    }
  };

  const handleSubmit = (values: LabelData) => {
    const variables = {
      uid: user.uid,
      ...values,
    };

    if (isUpdating) updateLabel({ variables });
    else createLabel({ variables });
  };

  // const keyOptions = [...new Set(labels?.adminLabels?.map((label) => label.key))];
  // const valueOptions =
  //   labels?.adminLabels?.filter((label) => label.key === selectedKey).map((label) => label.value) || [];
  const scopeOptions = ["private", "public"].map((value) => ({ label: t(`scope.${value}`), value }));

  return (
    <AutoForm
      onChange={handleFormChange}
      className="setter-form"
      model={initialData}
      schema={LabelBridge}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <AutoField
        name="key"
        // allowedValues={keyOptions}
        getPopupContainer={(node: any) => node.parentNode}
        disabled={isUpdating}
        label={t("key")}
      />
      <AutoField
        name="value"
        // allowedValues={valueOptions}
        label={t("value")}
        getPopupContainer={(node: any) => node.parentNode}
      />
      <AutoField
        name="scope"
        options={scopeOptions}
        disabled={isUpdating}
        label={t("scope.label")}
        getPopupContainer={(node: any) => node.parentNode}
      />
      <SubmitField value={isUpdating ? t("edit") : t("create")} disabled={loadingCreate || loadingUpdate} />
    </AutoForm>
  );
}
