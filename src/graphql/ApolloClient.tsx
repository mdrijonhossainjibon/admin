import { ApolloClient, InMemoryCache } from "@apollo/client";
import { config } from "../config";

export const SetterApolloClient = new ApolloClient({
  uri: `${config.API_URL}/api/v2/admin/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
});
