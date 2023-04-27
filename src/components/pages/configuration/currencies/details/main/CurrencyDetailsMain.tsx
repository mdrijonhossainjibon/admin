import { Descriptions, List, Button, Badge, Tag, Dropdown, Menu } from "antd";
import { EllipsisOutlined, DownOutlined } from "@ant-design/icons";
import {
  AdminCurrencySingle_adminCurrency,
  AdminCurrencySingle_adminCurrency_markets,
  AdminCurrencySingle_adminCurrency_wallets,
  AdminCurrencySingle_adminCurrency_options,
} from "../../../../../../graphql/queries/AdminCurrencySingle";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../../../../constants/routes";
import { useDate } from "../../../../../../utils/hooks";

import { useMutation } from "../../../../../../graphql/hooks";
import { CreateWallet, CreateWalletVariables } from "../../../../../../graphql/mutations/CreateWallet";
import { CreateWalletGQL } from "../../../../../../graphql/Mutations";

interface Props {
  currency: AdminCurrencySingle_adminCurrency;
  onCompleted?: () => void;
}

export default function CurrencyDetailsMain({ currency }: Props) {
  const { t: translate } = useTranslation();
  const history = useHistory();
  const { formatDate } = useDate();
  const onCompleted = () => {
    console.log("Created");
  };
  const [createWallet] = useMutation<CreateWallet, CreateWalletVariables>(CreateWalletGQL, {
    onCompleted,
    successMessage: "",
  });

  const goToMarketDetails = (marketId: string) => {
    history.push(Routes.withParams.MarketsDetails({ id: marketId }));
  };

  const goToWalletDetails = (walletId: number) => {
    history.push(Routes.withParams.WalletsDetails({ id: walletId }));
  };

  const goToBlockchainDetails = (id: number) => {
    history.push(Routes.withParams.BlockchainsDetails({ id }));
  };
  console.log(currency);

  const t = (id: string) => translate(`setter.layouts.configurations.currencies.details.${id}`);
  const currs = (currency.blockchain?.currencies || []).reduce((accumulator: any, currentValue: any) => {
    if (currentValue.wallets && currentValue.wallets.length > 0) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);

  const createWallets = (e: any) => {
    console.log(e.key, createWallet);
    const cur = currs.find((cur: any) => cur.code === e.key);
    console.log("<<<", cur.wallets);
    const wallets = cur.wallets.map((w: any) => ({
      kind: w.kind,
      address: w.address,
      name: `${currency.name} ${w.kind}`,
      blockchain_key: w.blockchain_key,
      enabled: w.enabled,
      gateway: w.gateway,
      currency: currency.code,
      settings: `{"uri": "${w.settings?.uri || ""}"}`,
    }));
    console.log("***", wallets);
    wallets.forEach((element: any) => {
      createWallet({ variables: element });
    });
  };

  const menu = (
    <Menu key="walletsCurrency" onClick={createWallets}>
      {currs.map((c: any) => (
        <Menu.Item key={c.code}>{c.name}</Menu.Item>
      ))}
    </Menu>
  );
  console.log("MENU", menu);

  return (
    <Descriptions bordered column={4}>
      <Descriptions.Item label={t("name")}>{currency.name}</Descriptions.Item>
      <Descriptions.Item label={t("code")}>{currency.code}</Descriptions.Item>
      <Descriptions.Item label={t("symbol")}>{currency.symbol}</Descriptions.Item>
      <Descriptions.Item label={t("type")}>{currency.type}</Descriptions.Item>

      <Descriptions.Item label={t("dates")}>
        <div>
          {t("createdAt")}: {formatDate(currency.created_at)}
        </div>
        <div>
          {t("updatedAt")}: {formatDate(currency.updated_at)}
        </div>
      </Descriptions.Item>
      <Descriptions.Item label={t("wallets")} span={3}>
        {currency.wallets && currency.wallets.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={currency.wallets}
            renderItem={(wallet: AdminCurrencySingle_adminCurrency_wallets) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <>
                      <Badge status={wallet.enabled ? "success" : "default"} text={`${wallet.name}`} />
                    </>
                  }
                  description={wallet.address}
                />
                <Tag>{wallet.kind.toUpperCase()}</Tag>
                <Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToWalletDetails(wallet.id)} />
              </List.Item>
            )}
          />
        ) : (
          <Dropdown overlay={menu}>
            <Button>
              {t("copyWallets")} <DownOutlined />
            </Button>
          </Dropdown>
        )}
      </Descriptions.Item>

      <Descriptions.Item label={t("withdraw.title")}>
        <Badge
          status={currency.withdrawal_enabled ? "success" : "error"}
          text={currency.withdrawal_enabled ? t("withdraw.enabled") : t("withdraw.disabled")}
        />
        <div>
          {t("withdraw.fee")}: {currency.withdraw_fee}
        </div>
        <div>
          {t("withdraw.min")}: {currency.min_withdraw_amount}
        </div>
        <div>
          {t("withdraw.limit24h")}: {currency.withdraw_limit_24h}
        </div>
        <div>
          {t("withdraw.limit72h")}: {currency.withdraw_limit_72h}
        </div>
      </Descriptions.Item>
      <Descriptions.Item label={t("deposit.title")} span={3}>
        <Badge
          status={currency.deposit_enabled ? "success" : "error"}
          text={currency.deposit_enabled ? t("deposit.enabled") : t("deposit.disabled")}
        />
        <div>
          {t("deposit.fee")}: {currency.deposit_fee}
        </div>
        <div>
          {t("deposit.min")}: {currency.min_deposit_amount}
        </div>
      </Descriptions.Item>

      {currency.options && currency.options.length > 0 ? (
        <Descriptions.Item label={t("options")} span={1}>
          <List
            itemLayout="horizontal"
            dataSource={currency.options}
            renderItem={(options: AdminCurrencySingle_adminCurrency_options) => (
              <List.Item>
                <List.Item.Meta description={options.key} />
                {options.value}
              </List.Item>
            )}
          />
        </Descriptions.Item>
      ) : null}

      <Descriptions.Item label={t("blockchain.title")} span={currency.options && currency.options.length > 0 ? 3 : 1}>
        {currency.blockchain ? (
          <List
            itemLayout="horizontal"
            dataSource={[{ ...currency.blockchain }]}
            renderItem={(c: any) => (
              <List.Item>
                <List.Item.Meta
                  title={<Badge status={c.enabled ? "success" : "error"} text={`${c.name} (${c.key})`} />}
                />
                <Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToBlockchainDetails(c.id)} />
              </List.Item>
            )}
          />
        ) : (
          t("blockchain.missing")
        )}
      </Descriptions.Item>

      <Descriptions.Item label={t("markets")} span={3}>
        <List
          itemLayout="horizontal"
          dataSource={currency.markets}
          renderItem={(market: AdminCurrencySingle_adminCurrency_markets) => (
            <List.Item>
              <List.Item.Meta
                title={<Badge status={market.enabled ? "success" : "default"} text={`${market.name.toUpperCase()}`} />}
              />
              <Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToMarketDetails(market.id)} />
            </List.Item>
          )}
        />
      </Descriptions.Item>
    </Descriptions>
  );
}
