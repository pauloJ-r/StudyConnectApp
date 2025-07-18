import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./splashScreen";
import OnboardingScreen from "./onboarding";
import LoginScreen from "./login"; // ou SignupScreen, adapte se o nome for diferente

const Stack = createStackNavigator();

export default function UnauthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
