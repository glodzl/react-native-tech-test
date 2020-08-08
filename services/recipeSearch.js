import { gql } from "@apollo/client";

export const FETCH_RECIPES = gql`
  query getRecipes($searchText: String!, $page: Int!) {
    recipe_search(q: $searchText, page: $page, page_size: 25) {
      total_hits
      hits {
        recipe {
          introduction
          name
          serves
          short_description
          slug
          tags
          total_time
          ingredients {
            component
            ingredients
          }
          method {
            steps
          }
        }
      }
    }
  }
`;
