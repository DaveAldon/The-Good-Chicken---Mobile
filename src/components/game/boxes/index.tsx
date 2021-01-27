import React from "react";
import { View, Text, Image } from "react-native";

const boxArrays = Array.from(Array(10), () => [...Array(10).keys()]);
const boxSize = 50;
const playerSource = require("../../../assets/chicken.png");

interface IProps {
  playerLocation: ILocation;
  location: ILocation;
}

interface ILocation {
  x: number;
  y: number;
}

function checkSameLocation(loc1: ILocation, loc2: ILocation) {
  return loc1.x === loc2.x && loc1.y === loc2.y;
}

function calcBoxColor(location: ILocation) {
  const color1 = "#b0ffc5";
  const color2 = "#6a9c77";
  if (location.x % 2) {
    if (location.y % 2) {
      return color1;
    } else return color2;
  } else {
    if (location.y % 2) {
      return color2;
    } else return color1;
  }
}

function Player() {
  return <Image style={{ resizeMode: "center", height: "100%", width: "100%" }} source={playerSource} />;
}

function Box(props: IProps) {
  const { playerLocation, location } = props;
  const isPlayerOnBox = checkSameLocation(playerLocation, location);
  return <View style={{ backgroundColor: calcBoxColor(location), height: boxSize, width: boxSize }}>{isPlayerOnBox && <Player />}</View>;
}

export default function BoxGrid(props: IProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      {boxArrays.map((row, xindex) => {
        return (
          <View key={xindex} style={{ flexDirection: "column" }}>
            <Text>Row</Text>
            {row.map((box, yindex) => {
              const location = { x: xindex, y: yindex };
              props = { ...props, location: location };
              return <Box {...props} key={yindex} />;
            })}
          </View>
        );
      })}
    </View>
  );
}
