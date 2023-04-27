import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ApolloProvider } from "@apollo/client";
import { SetterApolloClient } from "./graphql/ApolloClient";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { ThemeContextProvider } from "./components/context/theme-context";

countries.registerLocale(en);

ReactDOM.render(
  <ThemeContextProvider>
    <ApolloProvider client={SetterApolloClient}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ApolloProvider>
  </ThemeContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
