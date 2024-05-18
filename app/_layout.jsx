import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../Store/store";
import Toast from "react-native-toast-message";
export { ErrorBoundary } from "expo-router";
import Header from "../components/headers/Header";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StatusBar style="auto" />
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <RootLayoutNav />
          <Toast autoHide visibilityTime={3000} swipeable />
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(tabs)"
        options={{
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name="vote/[id]"
        options={{
          header: () => <Header />,
        }}
      />
    </Stack>
  );
}
