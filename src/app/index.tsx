//src/app/index.tsx
import ReminderListItem from "@/components/ReminderListItem";
import { getReminders } from "@/services/remindersService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => getReminders(),
  });

  console.log("Fetched data is here:", data);

  if (isLoading) {
    return <ActivityIndicator size={"large"} style={{ marginTop: "20%" }} />;
  }

  if (error) {
    return (
      <Text
        style={{
          marginTop: "20%",
          color: "red",
          fontWeight: "bold",
          alignSelf: "center",
        }}
      >
        {error.message}
      </Text>
    );
  }

  // const reminderItem = data[2];

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <Text
        style={{
          fontSize: 27,
          fontWeight: "bold",
          letterSpacing: 0.5,
          color: "#FF8C00",
          marginBottom: 15,
        }}
      >
        Echo 📣
      </Text>

      {/* <ReminderListItem reminderItem={data[0]} />
      <ReminderListItem reminderItem={data[2]} />
      <ReminderListItem reminderItem={data[4]} /> */}
      <FlatList
        data={data}
        renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
      />
    </SafeAreaView>
  );
}
