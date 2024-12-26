import { Stack } from "expo-router";
import { screenOptions } from "./styles";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={screenOptions} />
      <Stack.Screen name="register" options={screenOptions} />
      <Stack.Screen name="(main)" options={screenOptions} />
    </Stack>
  );
}