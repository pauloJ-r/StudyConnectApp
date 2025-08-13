import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useContext, useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar, View } from "react-native"; // Adicionado View para o loading
import "react-native-reanimated";
import { AuthContext, AuthProvider } from "@/context/authContext";

function LayoutWithAuth() {
  const { user, hasOnboarded } = useContext(AuthContext);

  // Mostra uma tela em branco (ou um spinner) enquanto o estado de autenticação está sendo carregado
  if (hasOnboarded === null) {
    return <View style={{ flex: 1, backgroundColor: '#FFF' }} />; // Evita piscar a tela
  }

  // -> CORREÇÃO APLICADA AQUI
  // A lógica agora sempre aponta para um grupo de rota de primeiro nível.
  const initialRoute = user ? "(tabs)" : "(unauth)";

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack initialRouteName={initialRoute}>
        <Stack.Screen name="(unauth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(create)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  // A lógica de setupNavBar e carregamento de fontes continua a mesma
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
