"use client";

import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar, View, Text } from "react-native";
import { storeData, getData, clearAll } from "./utils/storage";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

// Імпортуємо OneSignal правильно
import OneSignal from "react-native-onesignal";

// Замініть на ваші реальні ключі
const ONESIGNAL_APP_ID = "18953dae-c615-48c7-b87c-81bd3c8e767c";
const ONESIGNAL_REST_API_KEY =
  "os_v2_app_dckt3lwgcvempod4qg6tzdtwpq2rmaqn5wdehcf37i7rvfgiplbadxtawiktyacjr6iqtsbm5bvijguo7442growmloc2ssstoi33jq";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Ініціалізуємо OneSignal в useEffect
    const initOneSignal = async () => {
      try {
        // Перевіряємо, чи OneSignal доступний
        if (OneSignal) {
          console.log("Initializing OneSignal...");
          // Встановлюємо App ID
          OneSignal.setAppId(ONESIGNAL_APP_ID);
          // Запитуємо дозвіл на сповіщення
          OneSignal.promptForPushNotificationsWithUserResponse();
          console.log("OneSignal initialized successfully");
        } else {
          console.error("OneSignal is not available");
        }
      } catch (error) {
        console.error("Error initializing OneSignal:", error);
      }
    };

    initOneSignal();
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await getData("tasks");
      if (savedTasks) {
        setTasks(savedTasks);
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const taskWithId = {
        ...newTask,
        id: Date.now().toString(),
      };

      const updatedTasks = [...tasks, taskWithId];
      setTasks(updatedTasks);
      await storeData("tasks", updatedTasks);

      // Плануємо сповіщення
      scheduleNotification(taskWithId);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const taskToDelete = tasks.find((task) => task.id === taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);

      setTasks(updatedTasks);
      await storeData("tasks", updatedTasks);

      // Скасовуємо сповіщення, якщо воно існує
      if (taskToDelete && taskToDelete.notificationId) {
        cancelNotification(taskToDelete.notificationId);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const clearAllTasks = async () => {
    try {
      for (const task of tasks) {
        if (task.notificationId) {
          await cancelNotification(task.notificationId);
        }
      }

      setTasks([]);
      await clearAll();
    } catch (error) {
      console.error("Failed to clear tasks:", error);
    }
  };

  const scheduleNotification = async (task) => {
    try {
      // Перевіряємо, чи OneSignal доступний
      if (!OneSignal) {
        console.error(
          "OneSignal is not available for scheduling notifications"
        );
        return;
      }

      const reminderTime = new Date(task.reminderTime).getTime();

      // Отримуємо ID пристрою
      let deviceState = null;
      try {
        deviceState = await OneSignal.getDeviceState();
      } catch (error) {
        console.error("Failed to get device state:", error);
        return;
      }

      if (!deviceState || !deviceState.userId) {
        console.error("No OneSignal user ID available");
        return;
      }

      const userId = deviceState.userId;
      console.log("OneSignal User ID:", userId);

      // Створюємо об'єкт сповіщення
      const notificationObj = {
        headings: { en: "Task Reminder" },
        contents: { en: task.title },
        data: { taskId: task.id },
        send_after: new Date(reminderTime).toISOString(),
      };

      // Використовуємо OneSignal API для планування сповіщення
      const response = await fetch(
        "https://onesignal.com/api/v1/notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`,
          },
          body: JSON.stringify({
            app_id: ONESIGNAL_APP_ID,
            ...notificationObj,
            include_external_user_ids: [userId],
          }),
        }
      );

      const responseData = await response.json();
      console.log("Notification scheduled:", responseData);

      // Зберігаємо ID сповіщення для можливого скасування
      if (responseData.id) {
        const updatedTasks = tasks.map((t) =>
          t.id === task.id ? { ...t, notificationId: responseData.id } : t
        );
        setTasks(updatedTasks);
        await storeData("tasks", updatedTasks);
      }
    } catch (error) {
      console.error("Failed to schedule notification:", error);
    }
  };

  const cancelNotification = async (notificationId) => {
    try {
      await fetch(
        `https://onesignal.com/api/v1/notifications/${notificationId}?app_id=${ONESIGNAL_APP_ID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to cancel notification:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>To-Do Reminder</Text>
      </View>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onClearAll={clearAllTasks}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#4a6da7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
