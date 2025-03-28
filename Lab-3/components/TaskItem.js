"use client";

import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TaskItem = ({ task }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const progressPercentage = (task.progress / task.required) * 100;
  const backgroundColor = task.completed ? "#E8F5E9" : "#F5F5F5";

  const getProgressColor = (percentage) => {
    if (percentage === 0) return "#FF0000";
    if (percentage < 25) return "#FF0000";
    if (percentage < 50) return "#FF8000";
    if (percentage < 75) return "#FFFF00";
    if (percentage < 100) return "#00FF00";
    return "#8BC34A";
  };

  const getTaskIcon = (taskId) => {
    const icons = {
      1: "fingerprint",
      2: "gesture-tap-hold",
      3: "timer-outline",
      4: "gesture-swipe",
      5: "gesture-swipe-right",
      6: "gesture-swipe-left",
      7: "gesture-spread",
      8: "trophy-outline",
    };
    return icons[taskId] || "check-circle-outline";
  };

  const getIconBackgroundColor = (taskId) => {
    const colors = {
      1: "#E3F2FD",
      2: "#E1F5FE",
      3: "#F3E5F5",
      4: "#E8F5E9",
      5: "#FFF3E0",
      6: "#E1F5FE",
      7: "#FCE4EC",
      8: "#FFF9C4",
    };
    return colors[taskId] || "#E0E0E0";
  };

  const getIconColor = (taskId) => {
    const colors = {
      1: "#2196F3",
      2: "#03A9F4",
      3: "#9C27B0",
      4: "#4CAF50",
      5: "#FF9800",
      6: "#03A9F4",
      7: "#E91E63",
      8: "#FFC107",
    };
    return colors[taskId] || "#9E9E9E";
  };

  const getInstructions = (taskId) => {
    const instructions = {
      1: "Натисніть на синє коло 10 разів, щоб виконати це завдання.",
      2: "Швидко натисніть двічі (подвійний клік) на синє коло 5 разів, щоб виконати це завдання.",
      3: "Натисніть і утримуйте палець на синьому колі протягом 3 секунд, не відпускаючи, щоб виконати це завдання.",
      4: "Торкніться і перетягніть синє коло по екрану, щоб виконати це завдання.",
      5: "Швидко проведіть пальцем вправо по синьому колу, щоб виконати це завдання.",
      6: "Швидко проведіть пальцем вліво по синьому колу, щоб виконати це завдання.",
      7: "Розмістіть ДВА пальці на екрані та зведіть або розведіть їх, щоб змінити розмір синього кола та виконати це завдання.",
      8: "Виконуйте інші завдання, щоб заробити очки. Наберіть загалом 100 очок, щоб виконати це завдання.",
    };
    return instructions[taskId] || "Виконайте це завдання, щоб заробити очки.";
  };

  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  const instructionsHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 70],
  });

  const arrowRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: getIconBackgroundColor(task.id) },
        ]}
      >
        <Icon
          name={getTaskIcon(task.id)}
          size={22}
          color={getIconColor(task.id)}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{task.title}</Text>
          <TouchableOpacity
            onPress={toggleExpanded}
            style={styles.expandButton}
          >
            <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
              <Icon name="chevron-down" size={20} color="#666" />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{task.description}</Text>

        <Animated.View
          style={[
            styles.instructionsContainer,
            { height: instructionsHeight, opacity: animation },
          ]}
        >
          <Text style={styles.instructions}>{getInstructions(task.id)}</Text>
        </Animated.View>

        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progressPercentage}%`,
                backgroundColor: getProgressColor(progressPercentage),
              },
            ]}
          />
          <Text style={styles.progressText}>
            {task.progress}/{task.required}
          </Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        {task.completed ? (
          <View style={styles.completedCircle}>
            <Icon name="check" size={16} color="white" />
          </View>
        ) : (
          <View style={styles.incompleteCircle} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  expandButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  instructionsContainer: {
    overflow: "hidden",
    marginBottom: 8,
  },
  instructions: {
    fontSize: 13,
    color: "#555",
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#FF6B6B",
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    position: "absolute",
    right: 0,
    top: 8,
    fontSize: 12,
    color: "#666",
  },
  statusContainer: {
    marginLeft: 12,
  },
  completedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "white",
    fontWeight: "bold",
  },
  incompleteCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
});

export default TaskItem;
