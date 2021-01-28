import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import DraggableFlatList from "react-native-draggable-flatlist";

const buttonSize = 75;
const iconSize = buttonSize - 15;

export default function Inventory(props: any) {
  return (
    <View style={{ backgroundColor: "#bfbfbf", height: "100%", borderWidth: 2, flexDirection: "row", borderColor: "grey" }}>
      <View style={{ flexDirection: "column", width: "50%", justifyContent: "space-between" }}>
        <FireButton {...props} />
        <EggButton {...props} />
        <ToiletButton {...props} />
      </View>
      <View style={{ flexDirection: "column", width: "50%" }}>
        <SettingsButton {...props} />
      </View>
    </View>
  );
}

function FireButton(props) {
  return (
    <TouchableOpacity style={[{ backgroundColor: "#ff4747" }, styles.buttonStyle]}>
      <FontAwesome5 name="fire-alt" size={iconSize} color="black" />
    </TouchableOpacity>
  );
}

function EggButton(props) {
  return (
    <TouchableOpacity style={[{ backgroundColor: "#ffff8f" }, styles.buttonStyle]}>
      <FontAwesome5 name="egg" size={iconSize} color="black" />
    </TouchableOpacity>
  );
}

function ToiletButton(props) {
  return (
    <TouchableOpacity style={[{ backgroundColor: "#c94b0c" }, styles.buttonStyle]}>
      <FontAwesome5 name="toilet" size={iconSize} color="black" />
    </TouchableOpacity>
  );
}

function SettingsButton(props) {
  return (
    <TouchableOpacity style={[{ backgroundColor: "transparent" }, styles.buttonStyle]}>
      <Feather name="settings" size={iconSize} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: buttonSize,
    height: buttonSize,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 0,
  },
});
