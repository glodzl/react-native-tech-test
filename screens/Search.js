import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput } from "../components/Themed";
import { RecipeItem } from "../components/RecipeItem";
import { FETCH_RECIPES } from "../services";
import colors from "../themes/colors";
import { scale } from "../utils";
import { useQuery } from "@apollo/react-hooks";
import { Ionicons } from "@expo/vector-icons";

function SearchScreen() {
  const theme = useColorScheme();
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [recipeList, setRecipeList] = useState(null);
  const [canFetch, setCanFetch] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { data, error } = useQuery(FETCH_RECIPES, {
    variables: { searchText, page },
    skip: !canFetch,
  });

  useEffect(() => {
    clearTimeout(searchTimeout);
    setPage(1);
    setCanFetch(false);
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

  console.log("searchText", searchText);
  console.log("page", page);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme == "dark" ? "#8A8A8A" : "white" },
      ]}
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={searchText}
          placeholder="Search for recipes by name"
          autoFocus
          autoCapitalize="none"
          onChangeText={(val) => {
            setSearchText(val);
          }}
          style={styles.textInput}
        />
        {!!searchText && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setSearchText("")}
          >
            <Ionicons
              name="ios-close-circle-outline"
              size={25}
              style={{ marginRight: scale(5) }}
              color={theme == "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        style={styles.list}
        data={recipeList}
        keyExtractor={(item) => item.slug}
        onEndReached={() => {
          if (dataLoaded) {
            setPage(page + 1);
          }
        }}
        renderItem={({ item }) => (
          <RecipeItem
            item={item}
            //onPress={() => this.props.navigation.navigate("details", { item })}
            //addFavourite={() => this.props.addFavourite(item)}
            //removeFavourite={() => this.props.removeFavourite(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default SearchScreen;

/*
const mapStateToProps = (state) => ({
  favourites: state.favourites
});

export default connect(mapStateToProps, { addFavourite, removeFavourite })(
  Search
);
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: scale(15),
    marginBottom: scale(5),
    marginTop: Platform.OS === "ios" ? scale(20) : scale(5),
  },
  textInput: {
    width: "100%",
    height: "100%",
    paddingLeft: scale(5),
    paddingBottom: scale(4),
    fontSize: scale(16),
    borderBottomWidth: scale(1.5),
    borderBottomColor: colors.darkBlue,
  },
  icon: {
    position: "absolute",
    right: 0,
    bottom: Platform.OS === "ios" ? scale(3) : scale(5),
  },
  list: {
    flex: 1,
    width: "100%",
  },
});
