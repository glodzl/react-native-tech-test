import React from "react";
import {
  View,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addFavourite, removeFavourite } from "../actions";
import { scale } from "../utils";

const Detail = ({ favourites, addFavourite, removeFavourite }) => {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const isFavourite =
    favourites.filter((recipe) => recipe.slug === item.slug).length > 0;
  const favouritePress = () =>
    isFavourite ? removeFavourite(item.slug) : addFavourite(item);
  const backPress = () => navigation.goBack();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme == "dark" ? "#8A8A8A" : "white" },
      ]}
    >
      <View style={styles.headerButtonContainer}>
        <TouchableOpacity
          onPress={backPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AntDesign
            name="left"
            size={24}
            color={theme == "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <TouchableOpacity
          onPress={favouritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isFavourite ? "md-heart" : "md-heart-empty"}
            size={24}
            color={theme == "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  favourites: state.favourites,
});

export default connect(mapStateToProps, { addFavourite, removeFavourite })(
  Detail
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    zIndex: 1,
  },
  headerContainer: {
    position: "absolute",
    flex: 0,
    zIndex: 2,
    height: scale(200),
    width: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  headerPlaceholder: {
    flex: 0,
    height: scale(200),
    width: "100%",
    marginTop: scale(10),
  },
  headerBackground: {
    position: "absolute",
    top: -5,
    flex: 0,
    height: scale(200),
    width: "100%",
    backgroundColor: "black",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerImage: {
    height: scale(200),
    width: "100%",
    resizeMode: "cover",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: scale(16),
    marginHorizontal: scale(5),
    color: "white",
  },
  headerButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainContainer: {
    marginHorizontal: scale(15),
  },
  subContainer: {
    flexDirection: "row",
    marginBottom: scale(30),
  },
  image: {
    height: scale(180),
    width: scale(120),
    resizeMode: "cover",
  },
  title: {
    fontSize: scale(18),
    marginBottom: scale(10),
  },
  genre: {
    marginVertical: scale(5),
  },
  ratingText: {
    marginVertical: scale(5),
  },
  detailContainer: {
    flex: 1,
    marginLeft: scale(10),
    marginTop: scale(15),
  },
  detailSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scale(5),
  },
  detailText: {
    marginRight: scale(3),
  },
  youtube: {
    width: scale(320),
    marginBottom: scale(80),
    alignSelf: "center",
  },
  overview: {
    fontSize: scale(14),
    marginBottom: scale(40),
  },
});
