import { createStackNavigator } from "@react-navigation/stack";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";

import SplashPage from "./index";
import LoginPage from "./login";
import RegisterPage from "./register";
import HomePage from "./home";
import { Provider } from "react-redux";
import { Store } from "@/store/store";

const Stack = createStackNavigator();

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle('dark');
    }, 0);
  });

  return (
    <Provider store={Store}>
      <Stack.Navigator
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" component={SplashPage} />
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="register" component={RegisterPage} />

        <Stack.Screen name="home" component={HomePage} />
      </Stack.Navigator>
    </Provider>
  );
}
