import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Text } from "./Themed";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { addFavourite, removeFavourite } from "../actions";

const Header = ({ item, favourites, addFavourite, removeFavourite, scale }) => {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const isFavourite =
    favourites.filter((recipe) => recipe.slug === item.slug).length > 0;
  const favouritePress = () =>
    isFavourite ? removeFavourite(item.slug) : addFavourite(item);
  const backPress = () => navigation.goBack();
  const styles = stylesFunc(scale);

  return (
    <View style={styles.headerButtonContainer}>
      <TouchableOpacity
        onPress={backPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <AntDesign
          name="left"
          size={scale(24)}
          color={theme == "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle} ellipsizeMode="tail">
        {item.name}
      </Text>
      <TouchableOpacity
        onPress={favouritePress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons
          name={isFavourite ? "md-heart" : "md-heart-empty"}
          size={scale(24)}
          color={theme == "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  favourites: state.favourites,
});

export default connect(mapStateToProps, { addFavourite, removeFavourite })(
  Header
);

const stylesFunc = (scale) =>
  StyleSheet.create({
    headerTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: scale(16),
      marginHorizontal: scale(5),
      fontWeight: "600",
    },
    headerButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: scale(10),
      marginVertical: scale(5),
    },
  });
