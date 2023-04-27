import { useState } from "react";
import { CurrencyType } from "../../../../constants/currencies";
import { TagProps } from "antd/lib/tag";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";
import { AdminWithdraws_adminWithdraws_result } from "../../../../graphql/queries/AdminWithdraws";
import { WithdrawState } from "../../../../constants/withdraws";
import { AdminWithdraw_adminWithdraw } from "../../../../graphql/queries/AdminWithdraw";

const depositStateColors: {
  [key in CurrencyType]: {
    [key in WithdrawState]?: TagProps["color"];
  };
} = {
  [CurrencyType.Fiat]: {
    [WithdrawState.Prepared]: "processing",
    [WithdrawState.Submitted]: "processing",
    [WithdrawState.Processing]: "processing",
    [WithdrawState.Canceled]: "warning",
    [WithdrawState.Failed]: "warning",
    [WithdrawState.Accepted]: "warning",
    [WithdrawState.Succeed]: "success",
    [WithdrawState.Confirming]: "processing",
    [WithdrawState.Errored]: "error",
    [WithdrawState.Rejected]: "error",
    [WithdrawState.Skipped]: "error",
  },
  [CurrencyType.Coin]: {
    [WithdrawState.Prepared]: "processing",
    [WithdrawState.Submitted]: "processing",
    [WithdrawState.Processing]: "processing",
    [WithdrawState.Canceled]: "warning",
    [WithdrawState.Failed]: "warning",
    [WithdrawState.Accepted]: "warning",
    [WithdrawState.Succeed]: "success",
    [WithdrawState.Confirming]: "processing",
    [WithdrawState.Errored]: "error",
    [WithdrawState.Rejected]: "error",
    [WithdrawState.Skipped]: "error",
  },
};

export default ({ withdrawal }: { withdrawal: AdminWithdraws_adminWithdraws_result | AdminWithdraw_adminWithdraw }) => {
  const { t: translate } = useTranslation();
  const t = (id: string) => translate(`setter.layouts.operations.withdrawals.${id}`);

  const [withdrawalState] = useState<WithdrawState>(withdrawal.state as WithdrawState);

  const colorType: TagProps["color"] =
    depositStateColors[withdrawal.type as CurrencyType][withdrawalState as WithdrawState] || "default";

  return <Tag color={colorType}>{t(`table.state.${withdrawalState}`)}</Tag>;
};
