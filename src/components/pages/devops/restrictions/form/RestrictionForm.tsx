import { Col, Row } from "antd";
import { AdminRestrictions_adminRestrictions_result } from "../../../../../graphql/queries/AdminRestrictions";
import { AutoForm, AutoField, SubmitField, ErrorsField } from "uniforms-antd";
import { RestrictionBridge, RestrictionData } from "./RestrictionBridge";
import { useTranslation } from "react-i18next";
import {
  CreateRestriction_adminCreateRestriction,
  CreateRestrictionVariables,
} from "../../../../../graphql/mutations/CreateRestriction";
import {
  UpdateRestriction_adminUpdateRestriction,
  UpdateRestrictionVariables,
} from "../../../../../graphql/mutations/UpdateRestriction";
import { CreateRestrictionGQL, UpdateRestrictionGQL } from "../../../../../graphql/Mutations";
import { useMutation } from "../../../../../graphql/hooks";
// import CurrencyOptionForm from "./CurrencyOptionForm";
import { renderRows } from "../../../../../utils/component-utils";
import { RestrictionCategory, RestrictionScope, RestrictionState } from "../../../../../constants/restrictions";

export interface RestictionOption {
  key: string;
  value: string;
}

interface Props {
  initialData?: AdminRestrictions_adminRestrictions_result;
  onCompleted?: () => void;
}

export default function RestrictionForm({ initialData, onCompleted }: Props) {
  const { t: translate } = useTranslation();

  const isUpdating = !!initialData;

  const t = (id: string) => translate(`setter.layouts.devops.restrictions.${id}`);

  const [updateRestriction, { loading: loadingUpdate }] = useMutation<
    UpdateRestriction_adminUpdateRestriction,
    UpdateRestrictionVariables
  >(UpdateRestrictionGQL, {
    onCompleted,
    successMessage: t("form.updatedSuccess"),
  });

  const [createRestriction, { loading: loadingCreate }] = useMutation<
    CreateRestriction_adminCreateRestriction,
    CreateRestrictionVariables
  >(CreateRestrictionGQL, {
    onCompleted,
    successMessage: t("form.createdSuccess"),
  });

  const handleSubmit = (values: RestrictionData) => {
    const variables: CreateRestrictionVariables | UpdateRestrictionVariables = {
      id: values.id,
      category: values.category,
      scope: values.scope,
      state: values.state,
      value: values.value,
    };
    if (isUpdating) updateRestriction({ variables });
    else createRestriction({ variables });
  };

  const generalRows = [
    [
      <AutoField
        allowedValues={Object.values(RestrictionCategory)}
        name="category"
        label={t("form.category")}
        getPopupContainer={(node: any) => node.parentNode}
      />,
    ],
    [
      <AutoField
        allowedValues={Object.values(RestrictionScope)}
        name="scope"
        label={t("form.scope")}
        getPopupContainer={(node: any) => node.parentNode}
      />,
    ],
    [<AutoField name="value" label={t("form.value")} />],
    [
      <AutoField
        allowedValues={Object.values(RestrictionState)}
        name="state"
        label={t("form.state")}
        getPopupContainer={(node: any) => node.parentNode}
      />,
    ],
  ];

  return (
    <>
      <AutoForm className="setter-form" schema={RestrictionBridge} model={initialData} onSubmit={handleSubmit}>
        <Row gutter={24}>
          <Col span={24} className="form-section">
            {renderRows(generalRows)}
          </Col>
        </Row>
        <ErrorsField />
        <SubmitField
          disabled={loadingCreate || loadingUpdate}
          value={isUpdating ? t("form.update") : t("form.create")}
        />
      </AutoForm>
    </>
  );
}
