import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from "react-native";
import LoginScreen from "./src/components/login";
import MainMenuScreen from "./src/components/mainmenu";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { createStackNavigator } from "@react-navigation/stack";
import GameScreen from "./src/components/game";

interface IProp {}

let initialRender = true;
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ height: "100%" }}>
        <Stack.Navigator initialRouteName="TheGoodChickenDrawer">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TheGoodChickenDrawer" component={DrawerContainer} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

function DrawerContainer() {
  return (
    <Drawer.Navigator
      initialRouteName="Game"
      drawerType="slide"
      drawerContent={(props) => {
        // If you don't cancel the initial render, the drawer will flash on the screen
        if (initialRender) {
          initialRender = false;
          return null;
        }
        return (
          <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, flexDirection: "column", justifyContent: "space-between", paddingTop: 50 }}>
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
              <DrawerItem labelStyle={[{}]} label="Main Menu" onPress={() => props.navigation.navigate("MainMenu")} icon={() => <Feather name="monitor" size={30} color="black" />} />
              <DrawerItem labelStyle={[{}]} label="Game" onPress={() => props.navigation.navigate("Game")} icon={() => <Feather name="monitor" size={30} color="black" />} />
              <DrawerItem
                labelStyle={[{}]}
                label="Logout"
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate("Login");
                }}
                icon={() => <AntDesign name="logout" size={30} />}
              />
            </View>
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="MainMenu">{(props: IProp) => <MainMenuScreen {...props} />}</Drawer.Screen>
      <Drawer.Screen name="Game">{(props: any) => <GameScreen {...props} />}</Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});

export default App;
