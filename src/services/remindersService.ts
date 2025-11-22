//src/app/services/reminderService.ts
import { InsertReminder, UpdateReminder } from "@/utils/types";
import { Platform } from "react-native";

const API_URL =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_API_URL_MOBILE
    : process.env.EXPO_PUBLIC_API_URL;

export async function getReminders() {
  const response = await fetch(`${API_URL}/reminders`);

  if (!response.ok) {
    throw new Error("Failed to fetch reminders!!!");
  }

  return response.json();
}

export async function completeReminder(id: number, isCompleted: boolean) {
  const response = await fetch(`${API_URL}/reminders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: !isCompleted }),
  });
  if (!response.ok) {
    throw new Error("Failed to update the reminder!!!");
  }
  return response.json();
}

export async function createReminder(newReminder: InsertReminder) {
  const response = await fetch(`${API_URL}/reminders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReminder),
  });
  if (!response.ok) {
    throw new Error("Failed to create a new reminder!");
  }
  return response.json();
}

export async function getReminderById(id: number) {
  const response = await fetch(`${API_URL}/reminders/${id}`);

  if (!response.ok) {
    throw new Error("Failed to get the reminder!");
  }
  return response.json();
}

export async function updateOldReminder(
  id: number,
  updateReminder: UpdateReminder
) {
  const response = await fetch(`${API_URL}/reminders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateReminder),
  });
  if (!response.ok) {
    throw new Error("Failed to update the reminder!!!");
  }
  return response.json();
}

export async function deleteReminder(id: number) {
  const response = await fetch(`${API_URL}/reminders/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete the reminder!");
  }
  return response.json();
}
