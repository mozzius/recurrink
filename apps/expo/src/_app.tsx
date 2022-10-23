import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { TRPCProvider } from "./utils/trpc";
import { HomeScreen } from "./screens/home";
import { supabase } from "../utils/supabase";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {});

  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <HomeScreen />
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
};
