import { AutoForm, AutoField, SubmitField } from "uniforms-antd";
import { ProfileBridge, ProfileData } from "./ProfileBridge";
import { AdminUser_adminUser_profiles } from "../../../../../../../graphql/queries/AdminUser";
import { ProfileState } from "../../../../../../../constants/user";
import countries from "i18n-iso-countries";
import { useTranslation } from "react-i18next";
import { useMutation } from "../../../../../../../graphql/hooks";
import { UpdateUserProfileGQL } from "../../../../../../../graphql/Mutations";
import {
  UpdateUserProfileVariables,
  UpdateUserProfile,
} from "../../../../../../../graphql/mutations/UpdateUserProfile";

interface Props {
  uid: string;
  initialValues: AdminUser_adminUser_profiles;
  onCompleted: () => void;
}

export default function ProfileForm({ initialValues, uid, onCompleted }: Props) {
  const { i18n, t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.users.details.main.profile.${id}`);

  const [updateProfile, { loading }] = useMutation<UpdateUserProfile, UpdateUserProfileVariables>(
    UpdateUserProfileGQL,
    {
      onCompleted,
    }
  );

  const handleSubmit = (values: ProfileData) => {
    updateProfile({
      variables: {
        ...values,
        uid,
        dob: values.dob.toISOString(),
        metadata: JSON.stringify({ nationality: values.nationality }),
      },
    });
  };

  const _initialValues: ProfileData = {
    ...initialValues,
    dob: new Date(initialValues.dob),
    nationality: JSON.parse(initialValues.metadata || "{}")?.nationality,
  };

  const stateOptions = Object.values(ProfileState).map((state) => ({
    value: state,
    label: t(`state.${state}`),
  }));

  const countryOptions = Object.entries(countries.getNames(i18n.language.split("-")[0] || "en")).map(
    ([alpha2, name]) => ({
      label: `${alpha2} (${name})`,
      value: alpha2,
    })
  );

  return (
    <AutoForm className="setter-form" schema={ProfileBridge} onSubmit={handleSubmit} model={_initialValues}>
      <AutoField name="first_name" label={t("first_name")} />
      <AutoField name="last_name" label={t("last_name")} />
      <AutoField name="dob" label={t("dob")} showTime={false} getPopupContainer={(node: any) => node.parentNode} />
      <AutoField name="address" label={t("address")} />
      <AutoField name="postcode" label={t("postcode")} />
      <AutoField name="city" label={t("city")} />
      <AutoField
        name="country"
        label={t("country")}
        getPopupContainer={(node: any) => node.parentNode}
        showSearch
        options={countryOptions}
        filterOption={(value: string, option: any) => option.label.toLowerCase().includes(value.toLowerCase())}
      />
      <AutoField
        name="state"
        label={t("state.title")}
        options={stateOptions}
        getPopupContainer={(node: any) => node.parentNode}
      />
      <AutoField name="nationality" label={t("nationality")} />
      <SubmitField value={t("edit")} loading={loading} />
    </AutoForm>
  );
}
