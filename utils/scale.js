import { Dimensions } from "react-native";
import * as Device from "expo-device";

const { width } = Dimensions.get("window");

console.log(Device.DeviceType);

// The "base" width and height (it will count the scaled values from these)
const guidelineBaseWidth = 525;

export const scale = (size) => (width / guidelineBaseWidth) * size;
