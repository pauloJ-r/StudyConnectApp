import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useContext, useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";
import "react-native-reanimated";
import { AuthContext, AuthProvider } from "@/context/authContext";

function LayoutWithAuth() {
  const { user, hasOnboarded } = useContext(AuthContext);

  if (hasOnboarded === null) {
    // ainda carregando AsyncStorage
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        initialRouteName={
          !hasOnboarded ? "(unauth)" : user ? "(tabs)" : "(unauth)/login"
        }
      >
        <Stack.Screen name="(unauth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(create)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function setupNavBar() {
      await NavigationBar.setButtonStyleAsync("dark");
    }
    setupNavBar();
  }, []);

  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <LayoutWithAuth />
    </AuthProvider>
  );
}
