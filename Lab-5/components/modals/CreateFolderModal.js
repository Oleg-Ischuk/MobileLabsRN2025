"use client";

import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

export default function CreateFolderModal({ visible, onClose, onCreate }) {
  const [folderName, setFolderName] = useState("");
  const { theme } = useTheme();

  const handleCreate = () => {
    if (folderName.trim()) {
      onCreate(folderName);
      setFolderName("");
      Keyboard.dismiss();
    }
  };

  const handleClose = () => {
    setFolderName("");
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: theme.modalBackground },
              ]}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
              >
                <TouchableWithoutFeedback>
                  <View>
                    <View style={styles.modalHeader}>
                      <Ionicons name="folder" size={24} color="#FFD700" />
                      <Text style={[styles.modalTitle, { color: theme.text }]}>
                        Create New Folder
                      </Text>
                    </View>

                    <TextInput
                      style={[
                        styles.input,
                        {
                          color: theme.text,
                          backgroundColor: theme.inputBackground,
                          borderColor: theme.border,
                        },
                      ]}
                      placeholder="Folder name"
                      placeholderTextColor={theme.textSecondary}
                      value={folderName}
                      onChangeText={setFolderName}
                      autoFocus
                      returnKeyType="done"
                      blurOnSubmit={true}
                      onSubmitEditing={handleCreate}
                    />

                    <View style={styles.modalActions}>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          styles.cancelButton,
                          { borderColor: theme.border },
                        ]}
                        onPress={handleClose}
                      >
                        <Text
                          style={[styles.buttonText, { color: theme.text }]}
                        >
                          Cancel
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.button, styles.createButton]}
                        onPress={handleCreate}
                        disabled={!folderName.trim()}
                      >
                        <Text style={styles.buttonText}>Create</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoidingView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    width: "80%",
    maxHeight: "100%",
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollContent: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    borderWidth: 1,
  },
  createButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});
