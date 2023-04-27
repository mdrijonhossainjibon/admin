import { useState } from "react";
import { CurrencyType } from "../../../../constants/currencies";
import { DepositActionMap, DepositState } from "../../../../constants/deposits";
// import { AdminDeposits_adminDeposits_result } from "../../../../graphql/queries/AdminDeposits";
import { TagProps } from "antd/lib/tag";
import { useMutation } from "../../../../graphql/hooks";
import { useTranslation } from "react-i18next";
import {
  DepositAction as DepositActionMutation,
  DepositActionVariables,
} from "../../../../graphql/mutations/DepositAction";
import { DepositActionGQL } from "../../../../graphql/Mutations";
import { Select, Tag } from "antd";

const depositStateColors: {
  [key in CurrencyType]: {
    [key in DepositState]?: TagProps["color"];
  };
} = {
  [CurrencyType.Fiat]: {
    [DepositState.Submitted]: "processing",
    [DepositState.Accepted]: "success",
    [DepositState.Collected]: "success",
    [DepositState.Rejected]: "error",
  },
  [CurrencyType.Coin]: {
    [DepositState.Submitted]: "processing",
    [DepositState.Collected]: "success",
    [DepositState.Accepted]: "warning",
    [DepositState.Skipped]: "error",
  },
};

export default ({ deposit }: { deposit: any }) => {
  const { t: translate } = useTranslation();
  const t = (id: string) => translate(`setter.layouts.operations.deposits.${id}`);

  const [depositState, setDepositState] = useState<DepositState>(deposit.state as DepositState);
  const { id } = deposit;

  const [depositAction, { loading }] = useMutation<DepositActionMutation, DepositActionVariables>(DepositActionGQL, {
    onCompleted: (data) => setDepositState((data?.actionDeposit?.state as DepositState) || depositState),
  });

  const colorType: TagProps["color"] =
    depositStateColors[deposit.type as CurrencyType][depositState as DepositState] || "default";

  return !!DepositActionMap[depositState] && deposit.type === CurrencyType.Fiat ? (
    <Select
      disabled={loading}
      loading={loading}
      value={t(`table.state.${depositState}`)}
      onSelect={(value) => depositAction({ variables: { id, action: value } })}
    >
      {DepositActionMap[depositState]?.map((value) => (
        <Select.Option key={value} value={value}>
          {t(`table.state.${value}`)}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <Tag color={colorType}>{t(`table.state.${depositState}`)}</Tag>
  );
};
