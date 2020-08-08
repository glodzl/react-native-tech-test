import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "./Themed";
import { scale } from "../utils";

export const RecipeItem = React.memo(
  ({
    item,
    favourites,
    addFavourite,
    removeFavourite,
    navigate,
    deviceType,
  }) => {
    const theme = useColorScheme();
    const isFavourite =
      favourites.filter((recipe) => recipe.slug === item.slug).length > 0;
    const favouritePress = () =>
      isFavourite ? removeFavourite(item) : addFavourite(item);

    const newScale = (size) => scale(size, deviceType);
    const styles = stylesFunc(newScale);

    return (
      <TouchableOpacity onPress={navigate} style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.titleContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text
                style={{ fontSize: newScale(10) }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.tags.map((e) => "#" + e + " ")}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>
                  {item.total_time.substring(2)}
                </Text>
                <Ionicons
                  name="md-time"
                  size={newScale(18)}
                  color={theme == "dark" ? "white" : "black"}
                />
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.serves}</Text>
                <Ionicons
                  name="md-people"
                  size={newScale(18)}
                  color={theme == "dark" ? "white" : "black"}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: addFavourite ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {addFavourite ? (
              <TouchableOpacity
                style={styles.favourite}
                onPress={favouritePress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={isFavourite ? "md-heart" : "md-heart-empty"}
                  size={newScale(24)}
                  color={theme == "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            ) : null}
            {item.short_description ? (
              <Text
                style={styles.overview}
                numberOfLines={5}
                ellipsizeMode="tail"
              >
                {item.short_description}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

const stylesFunc = (newScale) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
      marginVertical: newScale(10),
      marginHorizontal: newScale(15),
      borderRadius: newScale(10),
      shadowColor: "black",
      shadowOffset: { width: newScale(2), height: newScale(3) },
      shadowRadius: newScale(5),
      shadowOpacity: 0.21,
      elevation: newScale(3),
    },
    imageContainer: {
      borderTopLeftRadius: newScale(10),
      borderBottomLeftRadius: newScale(10),
      overflow: "hidden",
    },
    image: {
      height: newScale(200),
      width: newScale(80),
      resizeMode: "cover",
    },
    detailContainer: {
      flex: 1,
      marginHorizontal: newScale(10),
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: newScale(5),
      marginBottom: newScale(5),
    },
    title: {
      flex: 1,
      fontSize: newScale(16),
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      marginHorizontal: newScale(3),
      fontSize: newScale(12),
      fontWeight: "500",
    },
    genreContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    genreText: {
      flex: 1,
      fontSize: newScale(12),
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: newScale(-1),
    },
    dateText: {
      marginHorizontal: newScale(3),
      fontSize: newScale(12),
    },
    overview: {
      marginBottom: newScale(5),
      flex: 1,
      marginRight: newScale(5),
      fontSize: newScale(13),
    },
    favourite: {
      alignSelf: "flex-end",
      marginBottom: newScale(5),
    },
  });
