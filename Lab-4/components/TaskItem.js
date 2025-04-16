import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Trash } from "lucide-react-native";

const TaskItem = ({ task, onDelete }) => {
  const formattedTime = new Date(task.reminderTime).toLocaleString();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : null}
        <Text style={styles.time}>Reminder: {formattedTime}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
      >
        <Trash size={20} color="#ff4d4f" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
});

export default TaskItem;
