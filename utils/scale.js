import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// The "base" width and height (it will count the scaled values from these)
// 2 => tablet, 1 => phone

const guidelineBaseWidth = (deviceType) => deviceType == 2 ? 550 : 350;

export const scale = (size, deviceType) => {
  return (width / guidelineBaseWidth(deviceType)) * size;
};
