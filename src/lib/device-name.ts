import * as Device from "expo-device";
import { Platform } from "react-native";

const platformLabels: Record<string, string> = {
  ios: "iOS",
  android: "Android",
  web: "Web",
};

export function getDeviceName(): string {
  const model = Device.modelName?.trim() || Device.deviceName?.trim() || "Mobile";
  const platform = platformLabels[Platform.OS] ?? Platform.OS;
  return `${model} (${platform})`;
}
