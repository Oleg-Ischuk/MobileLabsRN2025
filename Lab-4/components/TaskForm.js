"use client";

import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminderTime, setReminderTime] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const newTask = {
      title,
      description,
      reminderTime: reminderTime.toISOString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);

    // Reset form
    setTitle("");
    setDescription("");
    setReminderTime(new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Reminder Time</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setDatePickerOpen(true)}
      >
        <Text style={styles.dateButtonText}>
          {reminderTime.toLocaleString()}
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={datePickerOpen}
        date={reminderTime}
        onConfirm={(date) => {
          setDatePickerOpen(false);
          setReminderTime(date);
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
        minimumDate={new Date()}
        androidVariant="nativeAndroid"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4a6da7",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TaskForm;
