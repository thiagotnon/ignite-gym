import { StatusBar } from "react-native";
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Loading } from "@components/Loading";
import { Routes } from "./src/routes";
import { AuthProvider } from "@contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });

  return (
    <GluestackUIProvider config={config}>
      <StatusBar barStyle="default" backgroundColor="transparent" translucent />
      {fontsLoaded ? (
        <AuthProvider>
          <Routes />
        </AuthProvider>
      ) : (
        <Loading />
      )}
    </GluestackUIProvider>
  );
}
