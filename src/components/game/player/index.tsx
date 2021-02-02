import React from "react";
import { View, Text, Image } from "react-native";

const playerSource = require("../../../assets/chicken.png");

interface IProps {
  playerDirection: DirectionEnum;
}

export enum DirectionEnum {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}

export default function Player(props: IProps) {
  const { playerDirection } = props;
  return <Image style={{ resizeMode: "center", height: "100%", width: "100%", transform: [{ scaleX: PlayerDirection(playerDirection) }] }} source={playerSource} />;
}

function PlayerDirection(dir: DirectionEnum) {
  switch (dir) {
    case DirectionEnum.LEFT:
      return -1;
    default:
      return 1;
  }
}
