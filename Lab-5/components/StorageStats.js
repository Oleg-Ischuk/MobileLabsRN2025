"use client";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function StorageStats({ stats }) {
  const { theme } = useTheme();

  if (!stats) return null;

  // Calculate percentage of used space
  const usedPercentage =
    (Number.parseFloat(stats.used) / Number.parseFloat(stats.total)) * 100;

  // Format numbers to be shorter
  const formatSize = (size) => {
    const num = Number.parseFloat(size);
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + " GB";
    }
    return num.toFixed(2) + " MB";
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.statsBackground }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>Storage</Text>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${usedPercentage}%`,
              backgroundColor: usedPercentage > 90 ? "#FF5252" : "#4CAF50",
            },
          ]}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="disc-outline" size={16} color={theme.textSecondary} />
          <Text
            style={[styles.statText, { color: theme.textSecondary }]}
            numberOfLines={1}
          >
            Total: {formatSize(stats.total)}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons
            name="folder-outline"
            size={16}
            color={theme.textSecondary}
          />
          <Text
            style={[styles.statText, { color: theme.textSecondary }]}
            numberOfLines={1}
          >
            Used: {formatSize(stats.used)}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons
            name="checkmark-circle-outline"
            size={16}
            color={theme.textSecondary}
          />
          <Text
            style={[styles.statText, { color: theme.textSecondary }]}
            numberOfLines={1}
          >
            Free: {formatSize(stats.free)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  progressContainer: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBar: {
    height: "100%",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 4,
  },
  statText: {
    fontSize: 12,
    marginLeft: 4,
    flexShrink: 1,
  },
});
