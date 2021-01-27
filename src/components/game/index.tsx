import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text, PanResponder, Animated, Image } from "react-native";
import BoxGrid from "./boxes";

interface ILocation {
  x: number;
  y: number;
}

interface IProps {
  playerLocation: ILocation;
  location: ILocation;
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
          <BoxGrid {...props} />
        </Animated.View>
      </View>
    </View>
  );
}
