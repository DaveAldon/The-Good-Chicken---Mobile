import React from "react";
import { View, Text } from "react-native";
import { FlingGestureHandler, Directions, State } from "react-native-gesture-handler";
import { DirectionEnum } from "../../game";
import Feather from "react-native-vector-icons/Feather";

interface IProp {
  movementHandler: (dir: DirectionEnum) => {};
}

export default function Controller(props: IProp) {
  const { movementHandler } = props;
  const chevronSize = 40;
  const chevronColor = "black";

  function rightFling({ nativeEvent }) {
    if (nativeEvent.state === State.ACTIVE) {
      movementHandler(DirectionEnum.RIGHT);
    }
  }
  function leftFling({ nativeEvent }) {
    if (nativeEvent.state === State.ACTIVE) {
      movementHandler(DirectionEnum.LEFT);
    }
  }
  function upFling({ nativeEvent }) {
    if (nativeEvent.state === State.ACTIVE) {
      movementHandler(DirectionEnum.UP);
    }
  }
  function downFling({ nativeEvent }) {
    if (nativeEvent.state === State.ACTIVE) {
      movementHandler(DirectionEnum.DOWN);
    }
  }
  return (
    <View style={{ height: "100%" }}>
      <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={rightFling}>
        <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={leftFling}>
          <FlingGestureHandler direction={Directions.UP} onHandlerStateChange={upFling}>
            <FlingGestureHandler direction={Directions.DOWN} onHandlerStateChange={downFling}>
              <View style={{ backgroundColor: "#bfbfbf", height: "100%", width: "100%", justifyContent: "space-between" }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <Feather name="chevrons-up" size={chevronSize} color={chevronColor} />
                </View>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                  <Feather name="chevrons-left" size={chevronSize} color={chevronColor} />
                  <Feather name="chevrons-right" size={chevronSize} color={chevronColor} />
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <Feather name="chevrons-down" size={chevronSize} color={chevronColor} />
                </View>
              </View>
            </FlingGestureHandler>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </View>
  );
}
