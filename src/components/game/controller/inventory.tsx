import React, { useRef, useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity, LogBox } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";

LogBox.ignoreLogs(["ReactNativeFiberHostComponent:", "FlatList: Calling getNode()"]);

const buttonSize = 75;
const iconSize = buttonSize - 15;

interface ISpell {
  name: string;
  color: string;
  icon: any;
  unlocked: boolean;
}

const spells: ISpell[] = [
  {
    name: "Chicken Flame",
    color: "#ff4747",
    icon: <FontAwesome5 name="fire-alt" size={iconSize} color="black" />,
    unlocked: true,
  },
  {
    name: "Egg",
    color: "#ffff8f",
    icon: <FontAwesome5 name="egg" size={iconSize} color="black" />,
    unlocked: true,
  },
  {
    name: "Toilet",
    color: "#c94b0c",
    icon: <FontAwesome5 name="toilet" size={iconSize} color="black" />,
    unlocked: true,
  },
];

export default function Inventory(props: any) {
  const [data, setData] = useState(spells);

  const renderSpell = useCallback(({ item, index, drag, isActive }: RenderItemParams<ISpell>) => {
    return (
      item.unlocked && (
        <TouchableOpacity key={index} style={[{ backgroundColor: item.color }, styles.buttonStyle]} onLongPress={drag}>
          {item.icon}
        </TouchableOpacity>
      )
    );
  }, []);

  return (
    <View style={{ backgroundColor: "#bfbfbf", height: "100%", borderWidth: 2, flexDirection: "row", borderColor: "grey" }}>
      <View style={{ flexDirection: "column", width: "50%", justifyContent: "space-between", padding: 5 }}>
        <DraggableFlatList scrollEnabled={false} data={data} renderItem={renderSpell} keyExtractor={(item, index) => `draggable-item-${item.name}`} onDragEnd={({ data }) => setData(data)} />
      </View>
      <View style={{ flexDirection: "column", width: "50%" }}>
        <SettingsButton {...props} />
      </View>
    </View>
  );
}

function Spell(props: ISpell) {
  const { color, icon } = props;
  return <TouchableOpacity style={[{ backgroundColor: color }, styles.buttonStyle]}>{icon}</TouchableOpacity>;
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
    marginBottom: 5,
  },
});
