import React from "react";
import { FlatList, StyleSheet, Platform, useColorScheme } from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecipeItem } from "../components/RecipeItem";
import { scale } from "../utils";
import { useNavigation } from "@react-navigation/native";

function FavouriteScreen({ favourites }) {
  const navigation = useNavigation();
  const theme = useColorScheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme == "dark" ? "#8A8A8A" : "white" },
      ]}
    >
      <FlatList
        style={styles.list}
        data={favourites}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <RecipeItem
            item={item}
            navigate={() => navigation.navigate("DetailScreen", { item })}
            favourites={favourites}
          />
        )}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({ favourites: state.favourites });

export default connect(mapStateToProps)(FavouriteScreen);

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
    borderBottomColor: 'black',
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
