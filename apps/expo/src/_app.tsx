import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { TRPCProvider } from "./utils/trpc";
import { supabase } from "./utils/supabase";
import { AuthScreens } from "./screens/auth";
import { SessionProvider } from "./utils/session";
import { HomeScreen } from "./screens/home";

SplashScreen.preventAutoHideAsync();

export const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  console.log(session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      SplashScreen.hideAsync();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          {session ? (
            <SessionProvider value={session}>
              <HomeScreen />
            </SessionProvider>
          ) : (
            <AuthScreens />
          )}
          <StatusBar />
        </NavigationContainer>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};
