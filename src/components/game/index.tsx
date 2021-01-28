import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text, PanResponder, Animated } from "react-native";
import BoxGrid from "./boxes";
import { Controller, Inventory } from "./controller";

interface ILocation {
  x: number;
  y: number;
}

interface IProps {
  playerLocation: ILocation;
  location: ILocation;
  movementHandler: any;
}

export enum DirectionEnum {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}

export default function GameScreen(props: IProps) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [playerLocation, setPlayerLocation] = useState({ x: 2, y: 3 });

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

  function movementHandler(dir: DirectionEnum) {
    switch (dir) {
      case DirectionEnum.UP:
        setPlayerLocation({ ...playerLocation, y: playerLocation.y - 1 });
        break;
      case DirectionEnum.DOWN:
        setPlayerLocation({ ...playerLocation, y: playerLocation.y + 1 });
        break;
      case DirectionEnum.RIGHT:
        setPlayerLocation({ ...playerLocation, x: playerLocation.x + 1 });
        break;
      case DirectionEnum.LEFT:
        setPlayerLocation({ ...playerLocation, x: playerLocation.x - 1 });
        break;
    }
  }

  props = { ...props, playerLocation, movementHandler };

  return (
    <View style={{ height: "100%", justifyContent: "space-between" }}>
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
      <View style={{ height: "30%", flexDirection: "row" }}>
        <View style={{ width: "60%" }}>
          <Controller {...props} />
        </View>
        <View style={{ width: "40%" }}>
          <Inventory {...props} />
        </View>
      </View>
    </View>
  );
}
