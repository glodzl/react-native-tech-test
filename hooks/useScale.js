import * as React from "react";
import * as Device from "expo-device";
import { scale } from "../utils";

export default function useScale() {
  const [deviceType, setDeviceType] = React.useState(null);
  React.useLayoutEffect(() => {
    async function getDevice() {
      const deviceType = await Device.getDeviceTypeAsync();
      setDeviceType(deviceType);
    }
    getDevice();
  }, []);
  if (deviceType) {
    return scale(deviceType);
  }
}
