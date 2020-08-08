import React from "react";
import { FlatList, StyleSheet, Platform, useColorScheme } from "react-native";
import { Text } from "../components/Themed";
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
    edges={['top']}
      style={[
        styles.container,
        { backgroundColor: theme == "dark" ? "#8A8A8A" : "white" },
      ]}
    >
      {favourites.length ? (
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
      ) : (
        <Text style={styles.placeholderText}>Add favourites to the list</Text>
      )}
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({ favourites: state.favourites });

export default connect(mapStateToProps)(FavouriteScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  placeholderText: { marginTop: scale(10) },
});
