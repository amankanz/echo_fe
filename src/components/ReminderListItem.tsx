// src/components/ReminderListItem
import { useState } from "react";
import { ReminderItem } from "@/utils/types";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { completeReminder } from "@/services/remindersService";
// import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

interface ReminderItemProps {
  reminderItem: ReminderItem;
}

export default function ReminderListItem({ reminderItem }: ReminderItemProps) {
  const [isCompleted, setIsCompleted] = useState<boolean>(
    reminderItem.completed
  );

  // const { mutate: completedTask } = useMutation({
  //   mutationFn: (isReminderCompleted: boolean) =>
  //     completeReminder(reminderItem.id, isReminderCompleted),

  //   onSuccess: () => {},

  //   onError: (error) => {
  //     Alert.alert("Error", error.message);
  //   },
  // });

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Pressed!");
        // completedTask(isCompleted);
      }}
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        marginBottom: 20,
        borderBottomColor: "grey",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 10,
      }}
    >
      {isCompleted ? (
        <MaterialCommunityIcons
          name="circle-slice-8"
          size={22}
          color="#FF8C00"
          style={{ alignSelf: "flex-start" }}
        />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-circle-outline"
          size={22}
          color="grey"
          style={{ alignSelf: "flex-start" }}
        />
      )}

      <View style={{ gap: 5, flexShrink: 1 }}>
        <Text style={{ fontSize: 16 }}>{reminderItem.reminder}</Text>

        {/* Double Negation */}
        {/* {!!reminderItem.notes && (
          <Text style={{ fontSize: 12, color: "gray" }}>
            {reminderItem.notes || "No notes available!"}
          </Text>
        )} */}

        <Text style={{ fontSize: 14, color: "gray" }}>
          {reminderItem.notes || "No notes available!"}
        </Text>
      </View>

      <AntDesign
        name="infocirlceo"
        size={17}
        color="#FF8C00"
        style={{ marginLeft: "auto", marginRight: 10, alignSelf: "flex-start" }}
        onPress={() => console.log("Navigate to edit")}
      />
    </TouchableOpacity>
  );
}
