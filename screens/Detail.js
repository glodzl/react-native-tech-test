import React from "react";
import { useColorScheme, StyleSheet, View, ScrollView } from "react-native";
import { Text } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";

export const DetailScreen = () => {
  const theme = useColorScheme();
  const route = useRoute();
  const { item, scale } = route.params;
  const styles = stylesFunc(scale);

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.container,
        { backgroundColor: theme == "dark" ? "#8A8A8A" : "white" },
      ]}
    >
      <Header item={item} scale={scale} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: scale(3),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: scale(10),
            }}
          >
            <Text style={styles.ratingText}>
              {item.total_time.substring(2)}
            </Text>
            <Ionicons
              name="md-time"
              size={scale(18)}
              color={theme == "dark" ? "white" : "black"}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.ratingText}>{item.serves}</Text>
            <Ionicons
              name="md-people"
              size={scale(18)}
              color={theme == "dark" ? "white" : "black"}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: scale(12),
            textAlign: "center",
            marginHorizontal: scale(10),
          }}
        >
          {item.tags.map((e) => "#" + e + " ")}
        </Text>
        <Text
          style={{
            margin: scale(10),
            fontSize: scale(13),
            fontWeight: "500",
          }}
        >
          {item.introduction}
        </Text>
        <Text
          style={{
            marginHorizontal: scale(10),
            alignSelf: "flex-start",
            fontWeight: "bold",
            fontSize: scale(13),
          }}
        >
          Ingredients:
        </Text>
        <View
          style={{
            alignSelf: "flex-start",
            marginHorizontal: scale(12),
            marginBottom: scale(3),
          }}
        >
          {item.ingredients.map((recipe, index) => (
            <View>
              {recipe.component != "main" ? (
                <Text style={{ fontWeight: "600", fontSize: scale(12) }}>
                  {recipe.component}:{" "}
                </Text>
              ) : null}
              <View>
                {recipe.ingredients.map((ingredient) => (
                  <Text style={{ fontSize: scale(12) }}>•{ingredient}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        <Text
          style={{
            marginHorizontal: scale(10),
            marginTop: scale(5),
            alignSelf: "flex-start",
            fontWeight: "bold",
            fontSize: scale(14),
          }}
        >
          Steps:
        </Text>
        {item.method.map((recipe, index1) =>
          recipe.steps.map((step, index2) => (
            <Text
              key={index1 + index2}
              style={{
                marginHorizontal: scale(12),
                alignSelf: "flex-start",
                fontSize: scale(12),
              }}
            >
              •{step}
            </Text>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesFunc = (scale) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContainer: {
      alignItems: "center",
      paddingBottom: scale(15),
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
      margin: scale(3),
      fontSize: scale(14),
      fontWeight: "500",
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
