import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useColorScheme,
} from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput } from "../components/Themed";
import { RecipeItem } from "../components/RecipeItem";
import { addFavourite, removeFavourite } from "../actions";
import useScale from "../hooks/useScale";
import useRecipeFetch from "../hooks/useRecipeFetch";

function SearchScreen({ addFavourite, removeFavourite, favourites }) {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const scale = useScale();
  const styles = stylesFunc(scale);

  const { dataLoaded, recipeList } = useRecipeFetch({
    searchText,
    page,
  });

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
            if (page != 1) {
              setPage(1);
            }
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
              size={scale(22)}
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
            navigate={() =>
              navigation.navigate("DetailScreen", { item, scale })
            }
            favourites={favourites}
            addFavourite={() => addFavourite(item)}
            removeFavourite={() => removeFavourite(item.slug)}
            scale={scale}
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

const stylesFunc = (scale) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    inputContainer: {
      flexDirection: "row",
      marginHorizontal: scale(15),
      marginBottom: scale(5),
      marginTop: scale(10),
    },
    textInput: {
      width: "100%",
      height: "100%",
      paddingLeft: scale(5),
      paddingBottom: scale(4),
      fontSize: scale(16),
      borderBottomWidth: scale(1.5),
      borderBottomColor: "black",
    },
    icon: {
      position: "absolute",
      right: scale(5),
      bottom: Platform.OS === "ios" ? scale(3) : scale(5),
    },
    list: {
      flex: 1,
      width: "100%",
    },
  });
