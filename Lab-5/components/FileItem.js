"use client";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useTheme } from "../context/ThemeContext";

export default function FileItem({ item, onPress, onDelete }) {
  const { theme } = useTheme();

  const getFileIcon = () => {
    if (item.isDirectory) {
      return <Ionicons name="folder" size={24} color="#FFD700" />;
    }

    if (item.name.endsWith(".txt")) {
      return <Ionicons name="document-text" size={24} color="#4FC3F7" />;
    }

    return <Ionicons name="document" size={24} color="#E0E0E0" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const showFileDetails = async () => {
    try {
      const info = await FileSystem.getInfoAsync(item.path);

      const fileName = item.name;
      const fileType = fileName.includes(".")
        ? fileName.split(".").pop()
        : "unknown";
      const size = formatFileSize(info.size || 0);

      // Format date with leading zeros
      const modDate = info.modificationTime
        ? new Date(info.modificationTime * 1000)
        : null;
      const formattedDate = modDate
        ? `${String(modDate.getDate()).padStart(2, "0")}/${String(
            modDate.getMonth() + 1
          ).padStart(2, "0")}/${modDate.getFullYear()} ${String(
            modDate.getHours()
          ).padStart(2, "0")}:${String(modDate.getMinutes()).padStart(2, "0")}`
        : "unknown";

      Alert.alert(
        "File Information",
        `📄 Name: ${fileName}\n📁 Type: ${fileType}\n📦 Size: ${size}\n🕒 Modified: ${formattedDate}`,
        [{ text: "OK" }],
        {
          titleStyle: { textAlign: "center" },
          messageStyle: { textAlign: "left" },
        }
      );
    } catch (error) {
      console.error("Error getting file details:", error);
      Alert.alert("Error", "Failed to get file details");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>{getFileIcon()}</View>
        <View style={styles.textContainer}>
          <Text
            style={[styles.fileName, { color: theme.text }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          {!item.isDirectory && (
            <Text style={[styles.fileInfo, { color: theme.textSecondary }]}>
              {formatFileSize(item.size)}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        {!item.isDirectory && (
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.infoButtonBackground },
            ]}
            onPress={showFileDetails}
          >
            <Ionicons
              name="information-circle"
              size={22}
              color={theme.infoButtonText}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.deleteButtonBackground },
          ]}
          onPress={onDelete}
        >
          <Ionicons name="trash" size={22} color={theme.deleteButtonText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: "500",
  },
  fileInfo: {
    fontSize: 12,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
});
