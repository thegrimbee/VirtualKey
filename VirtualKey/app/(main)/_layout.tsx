import { Tabs } from "expo-router";
import { tabOptions } from "./styles";

export default function LockKeyLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen name="lock" options={tabOptions} />
      <Tabs.Screen name="key" options={tabOptions} />
    </Tabs>
  );
}