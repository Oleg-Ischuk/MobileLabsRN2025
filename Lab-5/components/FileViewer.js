"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Header from "./Header";

export default function FileViewer({ route, navigation }) {
  const { filePath } = route.params;
  const [fileContent, setFileContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    loadFileContent();
  }, []);

  const loadFileContent = async () => {
    try {
      setIsLoading(true);
      const content = await FileSystem.readAsStringAsync(filePath);
      setFileContent(content);
      setOriginalContent(content);
    } catch (error) {
      Alert.alert("Error", "Failed to load file content");
      console.error("Error loading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveChanges = async () => {
    try {
      await FileSystem.writeAsStringAsync(filePath, fileContent);
      setOriginalContent(fileContent);
      setIsEditing(false);
      Alert.alert("Success", "File saved successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to save changes");
      console.error("Error saving file:", error);
    }
  };

  const handleBackPress = () => {
    if (isEditing && fileContent !== originalContent) {
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Do you want to save before leaving?",
        [
          { text: "Discard", onPress: () => navigation.goBack() },
          { text: "Cancel", style: "cancel" },
          {
            text: "Save",
            onPress: async () => {
              await saveChanges();
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const getFileName = () => {
    return filePath.split("/").pop();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        title={getFileName()}
        showBackButton={true}
        onBackPress={handleBackPress}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Loading file...
          </Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.editorContainer}
              onPress={() => {
                if (isEditing) {
                  Keyboard.dismiss();
                }
              }}
            >
              <TextInput
                style={[
                  styles.editor,
                  {
                    color: theme.text,
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.border,
                  },
                ]}
                value={fileContent}
                onChangeText={setFileContent}
                multiline
                editable={isEditing}
                scrollEnabled={true}
                textAlignVertical="top"
                blurOnSubmit={true}
                returnKeyType="done"
              />
            </TouchableOpacity>

            <View style={styles.actionBar}>
              {isEditing ? (
                <>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: theme.successButtonBackground },
                    ]}
                    onPress={saveChanges}
                  >
                    <Ionicons name="save" size={22} color="#fff" />
                    <Text style={styles.actionButtonText}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: theme.cancelButtonBackground },
                    ]}
                    onPress={() => {
                      setFileContent(originalContent);
                      setIsEditing(false);
                    }}
                  >
                    <Ionicons name="close" size={22} color="#fff" />
                    <Text style={styles.actionButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: theme.primary },
                  ]}
                  onPress={() => setIsEditing(true)}
                >
                  <Ionicons name="create" size={22} color="#fff" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  editorContainer: {
    flex: 1,
    padding: 16,
    minHeight: 300,
  },
  editor: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 300,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});
