import { Dimensions } from "react-native";
import { store } from "../config/setupStore";

const { width } = Dimensions.get("window");

// The "base" width and height (it will count the scaled values from these)
// 2 => tablet, 1 => phone

const guidelineBaseWidth = store.getState().deviceType == 2 ? 550 : 350;

export const scale = (size) => (width / guidelineBaseWidth) * size;
