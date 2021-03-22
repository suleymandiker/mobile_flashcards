import React from "react";
import { Platform, StatusBar, View, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HeaderBar from "./HeaderBar"
import HomeScreen from "./Home"
import Decklist from "./Decklist"
import addDeck from "./AddDeck"
import DeckDetails from "./DeckDetails"
import AddCard from "./AddCard"
import Quiz from "./Quiz"



const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TabNavigator(props) {
    return (
        <Tab.Navigator
        initialRouteName="Home"
        activeColor="white"
        inactiveColor="white"
        barStyle={{ backgroundColor: "green" }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Decks",
            tabBarIcon: ({ tintColor }) => (
              <View>
                {Platform.OS === "ios" ? (
                  <Icon
                    style={[{ color: tintColor }]}
                    size={25}
                    name={"ios-home"}
                  />
                ) : (
                  <Icon
                    style={[{ color: tintColor }]}
                    size={25}
                    name={"md-home"}
                  />
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Add Deck"
          component={addDeck}
          options={{
            tabBarLabel: "Add Deck",
            tabBarIcon: ({ tintColor }) => (
              <View>
                {Platform.OS === "ios" ? (
                  <Icon
                    style={[{ color: tintColor }]}
                    size={25}
                    name={"ios-add"}
                  />
                ) : (
                  <Icon
                    style={[{ color: tintColor }]}
                    size={25}
                    name={"md-add"}
                  />
                )}
              </View>
            ),
          }}
        />
      </Tab.Navigator>

    )

}

function NavigationManager() {
    return(
        <View style={{ flex: 1 }}>
      <HeaderBar backgroundColor="dimgray" barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              gestureEnabled: true,
              headerStyle: {
                backgroundColor: "gray",
              },
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTintColor: "green",
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ title: "Mobile FlashCards" }}
            />
            <Stack.Screen
              name="Decklist"
              component={Decklist}
              options={{ title: "Deck List" }}
            />
            <Stack.Screen
              name="DeckDetails"
              component={DeckDetails}
              options={({ route }) => ({
                 title: route.params.deck.title
              })}
            />
            <Stack.Screen
              name="AddCard"
              component={AddCard}
              options={({ route }) => ({
                 title: "Add Card"
              })}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={({ route }) => ({
                 title: Quiz
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )

}

export default NavigationManager;