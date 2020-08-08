import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useColorScheme,
} from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput } from "../components/Themed";
import { RecipeItem } from "../components/RecipeItem";
import { addFavourite, removeFavourite } from "../actions";
import { FETCH_RECIPES } from "../services";
import { scale } from "../utils";
import * as Device from "expo-device";

function SearchScreen({ addFavourite, removeFavourite, favourites }) {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [recipeList, setRecipeList] = useState(null);
  const [canFetch, setCanFetch] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [deviceType, setDeviceType] = useState(1);

  const newScale = (size) => scale(size, deviceType);
  const styles = stylesFunc(newScale);

  const { data, error } = useQuery(FETCH_RECIPES, {
    variables: { searchText, page },
    skip: !canFetch,
  });

  useEffect(async () => {
    const deviceType = await Device.getDeviceTypeAsync();
    setDeviceType(deviceType);
  }, []);

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

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.container,
        { backgroundColor: theme == "dark" ? "#8A8A8A" : "white" },
      ]}
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={searchText}
          placeholder="Search for recipes"
          autoFocus
          autoCapitalize="none"
          onChangeText={(val) => {
            setSearchText(val);
          }}
          style={styles.textInput}
          autoCorrect={false}
        />
        {!!searchText && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setSearchText("")}
          >
            <Ionicons
              name="ios-close-circle-outline"
              size={newScale(22)}
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
            navigate={() => navigation.navigate("DetailScreen", { item })}
            favourites={favourites}
            addFavourite={() => addFavourite(item)}
            removeFavourite={() => removeFavourite(item.slug)}
            deviceType={deviceType}
          />
        )}
      />
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => ({
  favourites: state.favourites,
});

export default connect(mapStateToProps, { addFavourite, removeFavourite })(
  SearchScreen
);

const stylesFunc = (newScale) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    inputContainer: {
      flexDirection: "row",
      marginHorizontal: newScale(15),
      marginBottom: newScale(5),
      marginTop: newScale(10),
    },
    textInput: {
      width: "100%",
      height: "100%",
      paddingLeft: newScale(5),
      paddingBottom: newScale(4),
      fontSize: newScale(16),
      borderBottomWidth: newScale(1.5),
      borderBottomColor: "black",
    },
    icon: {
      position: "absolute",
      right: newScale(5),
      bottom: Platform.OS === "ios" ? newScale(3) : newScale(5),
    },
    list: {
      flex: 1,
      width: "100%",
    },
  });
