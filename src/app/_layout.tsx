//src/app/_layout.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { Text } from "react-native";

const queryClient = new QueryClient();

export default function RouteLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="createUpdateReminder"
          options={{
            presentation: "modal",
            headerTitle: "New Echo",
            headerLeft: () => (
              <Text
                style={{ color: "#0E7AFE", fontSize: 15 }}
                onPress={() => router.back()}
              >
                Cancel
              </Text>
            ),

            // headerRight: () => (
            //   <Text
            //     style={{ color: "#0E7AFE", fontSize: 15 }}
            //     onPress={() => console.log("Pressed!")}
            //   >
            //     Done
            //   </Text>
            // ),
          }}
        />

        {/* <Stack.Screen
          name="createUpdateReminder"
          options={{
            headerRight: () => <Text
                style={{ color: "#0E7AFE", fontSize: 15 }}
                onPress={() => console.log("Pressed!")}
              >
                Done
              </Text>,
          }}
        /> */}
      </Stack>
      ;
    </QueryClientProvider>
  );
}
