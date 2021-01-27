import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, PanResponder, Animated, Image } from "react-native";
import { randomColor } from "randomcolor";

const boxArrays = Array.from(Array(10), () => [...Array(10).keys()]);
const boxSize = 50;
const playerSource = require("../../assets/chicken.png");

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

function Player() {
  return <Image style={{ resizeMode: "center", height: "100%", width: "100%" }} source={playerSource} />;
}

function Box(props: IProps) {
  const { playerLocation, location } = props;
  const isPlayerOnBox = checkSameLocation(playerLocation, location);
  return <View style={{ backgroundColor: randomColor(), height: boxSize, width: boxSize }}>{isPlayerOnBox && <Player />}</View>;
}

function ManyBoxes(props: IProps) {
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

export default function GameScreen(props: IProps) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [playerLocation, setPlayerLocation] = useState({ x: 2, y: 3 });
  props = { ...props, playerLocation: playerLocation };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View>
      <Text>Banner area</Text>
      <View style={{ zIndex: -10 }}>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}>
          <ManyBoxes {...props} />
        </Animated.View>
      </View>
    </View>
  );
}
