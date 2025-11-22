//src/app/index.tsx
import ReminderListItem from "@/components/ReminderListItem";
import { getReminders } from "@/services/remindersService";
import { Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
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

  // 👉 EMPTY STATE UI
  if (!data || data.length === 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#FF8C00" }}>
          No reminders yet 👀
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "gray",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          You haven’t created any reminders. Tap below to add your first one!
        </Text>

        <Link href="/createUpdateReminder" asChild>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginTop: 20,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#FF8C00",
            }}
          >
            <Entypo name="circle-with-plus" size={22} color="#FF8C00" />
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#FF8C00" }}>
              Create your first reminder
            </Text>
          </Pressable>
        </Link>
      </SafeAreaView>
    );
  }

  // 👉 When data exists

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
        ListHeaderComponent={
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
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Add new Echos */}
      <Link href="/createUpdateReminder" asChild>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginTop: 15,
            // backgroundColor: "grey",
          }}
        >
          <Entypo name="circle-with-plus" size={24} color="#FF8C00" />

          <Text style={{ fontWeight: 600, color: "#FF8C00" }}>
            Add new reminders
          </Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}
