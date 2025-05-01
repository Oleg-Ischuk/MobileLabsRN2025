"use client";

import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { BASE_PATH } from "../App";
import Header from "./Header";
import ActionButtons from "./ActionButtons";
import FileItem from "./FileItem";
import StorageStats from "./StorageStats";
import CreateFolderModal from "./modals/CreateFolderModal";
import CreateFileModal from "./modals/CreateFileModal";
import { useTheme } from "../context/ThemeContext";

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState(BASE_PATH);
  const [items, setItems] = useState([]);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [storageStats, setStorageStats] = useState(null);
  const navigation = useNavigation();
  const { theme } = useTheme();

  useEffect(() => {
    loadDirectory(BASE_PATH);
    updateStorageStats();
  }, []);

  const updateStorageStats = async () => {
    const stats = await getStorageStats();
    setStorageStats(stats);
  };

  const getDirectorySize = async (path) => {
    let size = 0;
    try {
      const items = await FileSystem.readDirectoryAsync(path);
      const sizes = await Promise.all(
        items.map(async (name) => {
          const fullPath = path + name;
          const info = await FileSystem.getInfoAsync(fullPath);
          if (info.isDirectory) {
            return getDirectorySize(fullPath + "/");
          }
          return info.size || 0;
        })
      );
      size = sizes.reduce((acc, curr) => acc + curr, 0);
    } catch (error) {
      console.error("Error calculating directory size:", error);
    }
    return size;
  };

  const getStorageStats = async () => {
    try {
      const info = await FileSystem.getFreeDiskStorageAsync();
      const used = await getDirectorySize(BASE_PATH);
      const total = info + used;

      return {
        total: (total / (1024 * 1024)).toFixed(2),
        free: (info / (1024 * 1024)).toFixed(2),
        used: (used / (1024 * 1024)).toFixed(2),
      };
    } catch (error) {
      console.error("Error getting storage stats:", error);
      return null;
    }
  };

  const loadDirectory = async (path) => {
    try {
      const contents = await FileSystem.readDirectoryAsync(path);
      const itemsWithInfo = await Promise.all(
        contents.map(async (name) => {
          const fullPath = path + name;
          const info = await FileSystem.getInfoAsync(fullPath);
          return {
            name,
            isDirectory: info.isDirectory,
            path: fullPath,
            size: info.size || 0,
            modificationTime: info.modificationTime,
          };
        })
      );

      // Sort directories first, then files
      const sortedItems = itemsWithInfo.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });

      setItems(sortedItems);
      setCurrentPath(path);
    } catch (error) {
      console.error("Error reading directory:", error);
    }
  };

  const enterFolder = (folderName) => {
    const newPath = currentPath + folderName + "/";
    loadDirectory(newPath);
  };

  const goBack = () => {
    if (currentPath === BASE_PATH) return;
    const parentPath = currentPath.split("/").slice(0, -2).join("/") + "/";
    loadDirectory(parentPath);
  };

  const createFolder = async (folderName) => {
    if (!folderName.trim()) return;
    const path = currentPath + folderName.trim() + "/";
    try {
      await FileSystem.makeDirectoryAsync(path, { intermediates: true });
      loadDirectory(currentPath);
      updateStorageStats();
      setShowFolderModal(false);
    } catch (error) {
      Alert.alert("Error Creating Folder", error.message);
    }
  };

  const createTextFile = async (fileName, content) => {
    if (!fileName.trim()) return;
    const filePath = currentPath + fileName.trim() + ".txt";
    try {
      await FileSystem.writeAsStringAsync(filePath, content);
      loadDirectory(currentPath);
      updateStorageStats();
      setShowFileModal(false);
    } catch (error) {
      Alert.alert("Error Creating File", error.message);
    }
  };

  const deleteItem = (item) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(item.path, { idempotent: true });
              loadDirectory(currentPath);
              updateStorageStats();
            } catch (error) {
              console.error("Error deleting item:", error);
              Alert.alert("Error", "Failed to delete the item");
            }
          },
        },
      ]
    );
  };

  const openFile = (filePath) => {
    navigation.navigate("FileViewer", { filePath });
  };

  const handleItemPress = (item) => {
    if (item.isDirectory) {
      enterFolder(item.name);
    } else if (item.name.endsWith(".txt")) {
      openFile(item.path);
    } else {
      Alert.alert("Unsupported File", "Only text files can be opened.");
    }
  };

  const getBreadcrumb = () => {
    const relativePath = currentPath.replace(BASE_PATH, "");
    if (relativePath === "") return "Home";

    const parts = relativePath.split("/").filter(Boolean);
    return parts.join(" / ");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        title={getBreadcrumb()}
        showBackButton={currentPath !== BASE_PATH}
        onBackPress={goBack}
      />

      <ActionButtons
        onCreateFolder={() => setShowFolderModal(true)}
        onCreateFile={() => setShowFileModal(true)}
      />

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="folder-open-outline"
            size={64}
            color={theme.textSecondary}
          />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            This folder is empty
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.path}
          renderItem={({ item }) => (
            <FileItem
              item={item}
              onPress={() => handleItemPress(item)}
              onDelete={() => deleteItem(item)}
              currentPath={currentPath}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <StorageStats stats={storageStats} />

      <CreateFolderModal
        visible={showFolderModal}
        onClose={() => setShowFolderModal(false)}
        onCreate={createFolder}
      />

      <CreateFileModal
        visible={showFileModal}
        onClose={() => setShowFileModal(false)}
        onCreate={createTextFile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
  },
});
