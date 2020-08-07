import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const client = new ApolloClient({
    uri: "https://next.riverford.co.uk/graphql",
    cache: new InMemoryCache(),
  });

  client
    .query({
      query: gql`
        query getRecipes {
          recipe_search(q: "app") {
            hits {
              recipe {
                cook_time
                introduction
              }
              score
            }
            total_hits
          }
        }
      `,
    })
    .then((result) => console.log(result));

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
