import { lazy } from "react";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { Routes } from "../../../constants/routes";
import { DollarOutlined, ShopOutlined, WalletOutlined, BlockOutlined, PercentageOutlined } from "@ant-design/icons";
import TabbedMenuLayout from "../../TabbedMenuLayout";
import { Switch, Route, Redirect } from "react-router-dom";

const blockchains = lazy(() => import("./blockchains/Blockchains"));
const currencies = lazy(() => import("./currencies/Currencies"));
const feesSchedule = lazy(() => import("./feesSchedule/FeesSchedule"));
const markets = lazy(() => import("./markets/Markets"));
const wallets = lazy(() => import("./wallets/Wallets"));
const blockchainDetailsLayout = lazy(() => import("./blockchains/details/BlockchainDetailsLayout"));
const currenciesDetailsLayout = lazy(() => import("./currencies/details/CurrencyDetailsLayout"));
const walletsDetailsLayout = lazy(() => import("./wallets/details/WalletDetailsLayout"));
const marketsDetailsLayout = lazy(() => import("./markets/details/MarketDetailsLayout"));

export default function ConfigurationsLayouts() {
  const { Content } = Layout;
  const { t } = useTranslation();

  const menuItems = [
    {
      key: Routes.Blockchains,
      content: (
        <>
          <BlockOutlined />
          <span> {t("setter.layouts.configurations.nav.blockchains")}</span>
        </>
      ),
    },
    {
      key: Routes.Currencies,
      content: (
        <>
          <DollarOutlined />
          <span> {t("setter.layouts.configurations.nav.currencies")}</span>
        </>
      ),
    },
    {
      key: Routes.Wallets,
      content: (
        <>
          <WalletOutlined />
          <span> {t("setter.layouts.configurations.nav.wallets")}</span>
        </>
      ),
    },
    {
      key: Routes.Markets,
      content: (
        <>
          <ShopOutlined />
          <span> {t("setter.layouts.configurations.nav.markets")}</span>
        </>
      ),
    },
    {
      key: Routes.FeesSchedule,
      content: (
        <>
          <PercentageOutlined />
          <span> {t("setter.layouts.configurations.nav.feesSchedule")}</span>
        </>
      ),
    },
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems} />
      <Content>
        <Switch>
          <Route exact path={Routes.FeesSchedule} component={feesSchedule} />

          <Route exact path={Routes.Blockchains} component={blockchains} />
          <Route exact path={Routes.BlockchainsDetails} component={blockchainDetailsLayout} />
          <Route exact path={Routes.BlockchainsDetailsEdit} component={blockchainDetailsLayout} />

          <Route exact path={Routes.Currencies} component={currencies} />
          <Route exact path={Routes.CurrenciesDetails} component={currenciesDetailsLayout} />
          <Route exact path={Routes.CurrenciesDetailsEdit} component={currenciesDetailsLayout} />

          <Route exact path={Routes.Wallets} component={wallets} />
          <Route exact path={Routes.WalletsDetails} component={walletsDetailsLayout} />
          <Route exact path={Routes.WalletsDetailsEdit} component={walletsDetailsLayout} />

          <Route exact path={Routes.Markets} component={markets} />
          <Route exact path={Routes.MarketsDetails} component={marketsDetailsLayout} />
          <Route exact path={Routes.MarketsDetailsEdit} component={marketsDetailsLayout} />
          <Redirect to={Routes.Blockchains} />
        </Switch>
      </Content>
    </>
  );
}
