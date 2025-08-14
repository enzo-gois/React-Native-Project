import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const [isReady, setReady] = useState(false);

  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setAuth(false);
      } catch (e) {
      } finally {
        setReady(true);
      }
    };

    checkAuth();
  }, []); 

  useEffect(() => {
    if (!isReady) {
      return; 
    }

    if (!isAuth) {
      router.replace("/auth");
    }
    else {
      router.replace("/(tabs)");
    }
  }, [isReady, isAuth]); 

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
