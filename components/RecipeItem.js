import React from "react";
import { Image, StyleSheet, useColorScheme } from "react-native";
import { Text, View, TouchableOpacity } from "./Themed";
import { connect } from "react-redux";
import { scale } from "../utils";
import colors from "../themes/colors";
import { Ionicons } from "@expo/vector-icons";

export const RecipeItem = ({ item, onPress }) => {
  const theme = useColorScheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.detailContainer}>
        <View style={styles.titleContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text
              style={{ fontSize: scale(10) }}
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
                size={18}
                color={theme == "dark" ? "white" : "black"}
              />
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{item.serves}</Text>
              <Ionicons
                name="md-people"
                size={18}
                color={theme == "dark" ? "white" : "black"}
              />
            </View>
          </View>
        </View>
        {item.short_description ? (
          <Text style={styles.overview} numberOfLines={5} ellipsizeMode="tail">
            {item.short_description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

/*

const mapStateToProps = (state) => ({ favourites: state.favourites });

export default connect(mapStateToProps)(MovieItem);

*/

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginVertical: scale(10),
    marginHorizontal: scale(15),
    borderRadius: scale(10),
    shadowColor: colors.black,
    shadowOffset: { width: scale(2), height: scale(3) },
    shadowRadius: scale(5),
    shadowOpacity: 0.21,
    elevation: scale(3),
  },
  imageContainer: {
    borderTopLeftRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    overflow: "hidden",
  },
  image: {
    height: scale(200),
    width: scale(80),
    resizeMode: "cover",
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
  ratingContainer: {
    flexDirection: "row",
  },
  ratingText: {
    marginHorizontal: scale(3),
    fontSize: scale(12),
  },
  genreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  genreText: {
    flex: 1,
    fontSize: scale(12),
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(-1),
  },
  dateText: {
    marginHorizontal: scale(3),
    fontSize: scale(12),
  },
  overview: {
    marginBottom: scale(5),
  },
  favourite: {
    position: "absolute",
    bottom: scale(10),
    right: 0,
  },
});
