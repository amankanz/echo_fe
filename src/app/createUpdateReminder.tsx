//arc/app/createUpdateReminder.tsx
import {
  createReminder,
  deleteReminder,
  getReminderById,
  updateOldReminder,
} from "@/services/remindersService";
import { InsertReminder } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function createUpdateReminder() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const reminderId = parseInt(id);

  const [reminder, setReminder] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  console.log(id);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["reminder", reminderId],
    queryFn: () => getReminderById(reminderId),
    enabled: !!reminderId,
  });

  useEffect(() => {
    if (data) {
      setReminder(data.reminder);
      setNotes(data.notes);
    }
  }, [data]);

  console.log("Data:", data);

  const { mutate: saveReminder, isPending } = useMutation({
    mutationFn: () => {
      let newReminder: InsertReminder = {
        reminder,
        userId: 1,
      };
      if (notes) {
        newReminder.notes = notes;
      }
      return createReminder(newReminder);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      router.back();
    },

    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const { mutate: updateReminder } = useMutation({
    mutationFn: () => {
      const newReminder = {
        reminder,
        notes: notes ? notes : null,
      };

      return updateOldReminder(reminderId, newReminder);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      router.back();
    },

    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const { mutate: removeReminder } = useMutation({
    mutationFn: () => deleteReminder(reminderId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      router.back();
    },

    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

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

  const isSaveButtonDisabled = () => isPending || !reminder;

  const onDonePressed = () => {
    if (reminderId) {
      return updateReminder();
    }

    return saveReminder();
  };

  console.log(isSaveButtonDisabled);
  console.log("Pending...", isPending);
  return (
    <>
      <Stack.Screen
        // name="createUpdateReminder"
        options={{
          headerRight: () => (
            <Text
              disabled={isSaveButtonDisabled()}
              style={{ color: "#0E7AFE" }}
              onPress={() => onDonePressed()}
            >
              Done
            </Text>
          ),
        }}
      />

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Title"
          value={reminder}
          onChangeText={setReminder}
          multiline
        />

        <View style={styles.divider} />

        <TextInput
          placeholder="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>
      {!!reminderId && (
        <Pressable onPress={() => removeReminder()} style={styles.inputBox}>
          <Text style={{ color: "crimson" }}>Delete</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgrey",
  },

  inputBox: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
});
