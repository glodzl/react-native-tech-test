import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "./Themed";

export const RecipeItem = React.memo(
  ({ item, favourites, addFavourite, removeFavourite, navigate, scale }) => {
    const theme = useColorScheme();
    const isFavourite =
      favourites.filter((recipe) => recipe.slug === item.slug).length > 0;
    const favouritePress = () =>
      isFavourite ? removeFavourite(item) : addFavourite(item);
    const styles = stylesFunc(scale);

    return (
      <TouchableOpacity onPress={navigate} style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.titleContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text
                style={styles.hashTagText}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.tags.map((e) => "#" + e + " ")}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={styles.infoText}>
                  {item.total_time.substring(2)}
                </Text>
                <Ionicons
                  name="md-time"
                  size={scale(18)}
                  color={theme == "dark" ? "white" : "black"}
                />
              </View>
              <View style={styles.infoSubContainer}>
                <Text style={styles.infoText}>{item.serves}</Text>
                <Ionicons
                  name="md-people"
                  size={scale(18)}
                  color={theme == "dark" ? "white" : "black"}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              styles.descriptionContainer,
              { flexDirection: addFavourite ? "row-reverse" : "row" },
            ]}
          >
            {addFavourite ? (
              <TouchableOpacity
                style={styles.favourite}
                onPress={favouritePress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={isFavourite ? "md-heart" : "md-heart-empty"}
                  size={scale(24)}
                  color={theme == "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            ) : null}
            {item.short_description ? (
              <Text
                style={styles.descriptionText}
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

const stylesFunc = (scale) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
      marginVertical: scale(10),
      marginHorizontal: scale(15),
      borderRadius: scale(10),
      shadowColor: "black",
      shadowOffset: { width: scale(2), height: scale(3) },
      shadowRadius: scale(5),
      shadowOpacity: 0.21,
      elevation: scale(3),
    },
    detailContainer: {
      flex: 1,
      marginHorizontal: scale(10),
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: scale(5),
      marginBottom: scale(5),
    },
    title: {
      flex: 1,
      fontSize: scale(16),
    },
    infoSubContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    infoText: {
      marginHorizontal: scale(3),
      fontSize: scale(12),
      fontWeight: "500",
    },
    descriptionText: {
      marginBottom: scale(5),
      flex: 1,
      marginRight: scale(5),
      fontSize: scale(13),
    },
    favourite: {
      alignSelf: "flex-end",
      marginBottom: scale(5),
    },
    hashTagText: {
      fontSize: scale(10),
    },
    infoContainer: { alignItems: "flex-end" },
    descriptionContainer: {
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
