"use client";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import ActionButton from "./ActionButton";

export default function ActionButtons({ onCreateFolder, onCreateFile }) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ActionButton
        icon={<Ionicons name="folder-open" size={22} color="#fff" />}
        label="New Folder"
        onPress={onCreateFolder}
        backgroundColor="#4CAF50"
      />

      <ActionButton
        icon={<Ionicons name="document-text" size={22} color="#fff" />}
        label="New File"
        onPress={onCreateFile}
        backgroundColor="#2196F3"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
