import * as React from "react";
import * as Device from "expo-device";
import { scale } from "../utils";

export default function useScale() {
  const [deviceType, setDeviceType] = React.useState(1);
  React.useEffect(() => {
    async function getDevice() {
      const deviceType = await Device.getDeviceTypeAsync();
      setDeviceType(deviceType);
    }
    getDevice();
  }, []);

  return scale(deviceType);
}
