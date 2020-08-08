import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import SearchScreen from "../screens/Search";
import FavouritesScreen from "../screens/Favourites";
import { DetailScreen } from "../screens/Detail";

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Search"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-search" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-bookmark" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const StackNavigator = createStackNavigator();

export default function MainNavigator() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="SearchScreen"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
    </StackNavigator.Navigator>
  );
}
