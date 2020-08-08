import { ApolloClient, InMemoryCache } from "@apollo/client";
import { baseURL } from "../api";

export const makeApolloClient = () => {
  return new ApolloClient({ uri: baseURL, cache: new InMemoryCache() });
};
