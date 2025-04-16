"use client";

import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminderTime, setReminderTime] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Please enter a task title");
      return;
    }
    const newTask = {
      title,
      description,
      reminderTime,
      completed: false,
    };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setReminderTime(new Date());
    setError("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        multiline
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
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dateButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4a6ea9",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default TaskForm;
