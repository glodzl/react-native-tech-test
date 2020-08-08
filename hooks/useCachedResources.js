import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { store } from "../config/setupStore";
import * as Device from "expo-device";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Set device type
        const deviceType = await Device.getDeviceTypeAsync();
        store.dispatch({
          type: "SET_DEVICE",
          payload: deviceType,
        });

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
