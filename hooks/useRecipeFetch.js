import { useState, useEffect } from "react";
import { FETCH_RECIPES } from "../services";
import { useQuery } from "@apollo/client";

export default function useTimeout({ searchText, page }) {
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [canFetch, setCanFetch] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [recipeList, setRecipeList] = useState(null);

  useEffect(() => {
    clearTimeout(searchTimeout);
    setCanFetch(false);
    setDataLoaded(false);
    if (!!searchText) {
      const search = setTimeout(() => {
        setCanFetch(true);
      }, 1000);
      setSearchTimeout(search);
    }
  }, [searchText]);

  useEffect(() => {
    if (page > 1) {
      setCanFetch(true);
      setDataLoaded(false);
    }
  }, [page]);

  const { data, error } = useQuery(FETCH_RECIPES, {
    variables: { searchText, page },
    skip: !canFetch,
  });

  useEffect(() => {
    setCanFetch(false);
    if (data) {
      const newRecipes = data.recipe_search.hits.map((elem) => elem.recipe);
      const newRecipeList =
        page == 1 ? newRecipes : [...recipeList, ...newRecipes];
      setRecipeList(newRecipeList);
      console.log("newRecipeList", newRecipeList);
      setDataLoaded(true);
    }
    if (error) {
      console.log("error");
    }
  }, [data, error]);

  return { recipeList, dataLoaded };
}
