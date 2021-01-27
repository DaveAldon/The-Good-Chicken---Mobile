import React, { useRef } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, PanResponder, Animated } from "react-native";
import { randomColor } from "randomcolor";

const boxArrays = Array.from(Array(10), () => [...Array(10).keys()]);
const boxSize = 100;

function Box() {
  return <View style={{ backgroundColor: randomColor(), height: boxSize, width: boxSize }} />;
}

function ManyBoxes() {
  return (
    <View style={{ flexDirection: "row" }}>
      {boxArrays.map((row, index) => {
        return (
          <View key={index} style={{ flexDirection: "column" }}>
            <Text>Row</Text>
            {row.map((box, index) => (
              <Box key={index} />
            ))}
          </View>
        );
      })}
    </View>
  );
}

export default function GameScreen(props: any) {
  const pan = useRef(new Animated.ValueXY()).current;

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
          <ManyBoxes />
        </Animated.View>
      </View>
    </View>
  );
}
