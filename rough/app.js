// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!hihi</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //   const [loaded, error] = useFonts({
  //     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  //     ...FontAwesome.font,
  //   });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  //   useEffect(() => {
  //     if (error) throw error;
  //   }, [error]);

  //   useEffect(() => {
  //     if (loaded) {
  //       SplashScreen.hideAsync();
  //     }
  //   }, [loaded]);

  //   if (!loaded) {
  //     return null;
  //   }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <RootLayoutNav />
    </SafeAreaView>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
