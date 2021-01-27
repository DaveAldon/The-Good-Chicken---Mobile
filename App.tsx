import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from "react-native";
import LoginScreen from "./components/login";

const App = () => {
  return (
    <SafeAreaView>
      <LoginScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
