import React from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { Text } from "../components/Themed";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

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
        <View style={styles.detailContainer}>
          <View
            style={[
              styles.detailSubContainer,
              {
                marginRight: scale(10),
              },
            ]}
          >
            <Text style={styles.detailText}>
              {item.total_time.substring(2)}
            </Text>
            <Ionicons
              name="md-time"
              size={scale(18)}
              color={theme == "dark" ? "white" : "black"}
            />
          </View>
          <View style={styles.detailSubContainer}>
            <Text style={styles.detailText}>{item.serves}</Text>
            <Ionicons
              name="md-people"
              size={scale(18)}
              color={theme == "dark" ? "white" : "black"}
            />
          </View>
        </View>
        <Text style={styles.hashTagText}>
          {item.tags.map((e) => "#" + e + " ")}
        </Text>
        <Text style={styles.introduction}>{item.introduction}</Text>
        <Text style={styles.ingredientsTitle}>Ingredients:</Text>
        <View style={styles.ingredientsContainer}>
          {item.ingredients.map((recipe, index) => (
            <View>
              {recipe.component != "main" ? (
                <Text key={index} style={styles.ingredientsSubTitle}>
                  {recipe.component}:{" "}
                </Text>
              ) : null}
              <View>
                {recipe.ingredients.map((ingredient, index) => (
                  <Text key={index} style={styles.ingredientItem}>
                    •{ingredient}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.stepsTitle}>Steps:</Text>
        {item.method.map((recipe, index1) =>
          recipe.steps.map((step, index2) => (
            <Text key={index1 + index2} style={styles.stepItem}>
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
    detailText: {
      margin: scale(3),
      fontSize: scale(14),
      fontWeight: "500",
    },
    detailContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: scale(3),
    },
    detailSubContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    hashTagText: {
      fontSize: scale(12),
      textAlign: "center",
      marginHorizontal: scale(10),
    },
    introduction: {
      margin: scale(10),
      fontSize: scale(13),
      fontWeight: "500",
    },
    ingredientsTitle: {
      marginHorizontal: scale(10),
      alignSelf: "flex-start",
      fontWeight: "bold",
      fontSize: scale(13),
    },
    ingredientsContainer: {
      alignSelf: "flex-start",
      marginHorizontal: scale(12),
      marginBottom: scale(3),
    },
    ingredientsSubTitle: { fontWeight: "600", fontSize: scale(12) },
    ingredientItem: { fontSize: scale(12) },
    stepsTitle: {
      marginHorizontal: scale(10),
      marginTop: scale(5),
      alignSelf: "flex-start",
      fontWeight: "bold",
      fontSize: scale(13),
    },
    stepItem: {
      marginHorizontal: scale(12),
      alignSelf: "flex-start",
      fontSize: scale(12),
    },
  });
