import React from "react";
import { FlatList, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../components/Themed";
import { RecipeItem } from "../components/RecipeItem";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import useScale from "../hooks/useScale";

function FavouriteScreen({ favourites }) {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const scale = useScale();
  const styles = scale && stylesFunc(scale);
  if (scale) {
    return (
      <SafeAreaView
        edges={["top"]}
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
                navigate={() =>
                  navigation.navigate("DetailScreen", { item, scale })
                }
                favourites={favourites}
                scale={scale}
              />
            )}
          />
        ) : (
          <Text style={styles.placeholderText}>Add favourites to the list</Text>
        )}
      </SafeAreaView>
    );
  } else return <View />;
}

const mapStateToProps = (state) => ({ favourites: state.favourites });

export default connect(mapStateToProps)(FavouriteScreen);

const stylesFunc = (scale) =>
  StyleSheet.create({
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
