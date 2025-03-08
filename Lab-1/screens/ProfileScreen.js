import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const ProfileScreen = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    firstName: "",
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Форма відправлена:", form);
    setForm({
      email: "",
      password: "",
      confirmPassword: "",
      lastName: "",
      firstName: "",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Реєстрація</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Електронна пошта"
          style={styles.input}
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          placeholder="Пароль"
          secureTextEntry
          style={styles.input}
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        <TextInput
          placeholder="Пароль (ще раз)"
          secureTextEntry
          style={styles.input}
          value={form.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
        />
        <TextInput
          placeholder="Прізвище"
          style={styles.input}
          value={form.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
        />
        <TextInput
          placeholder="Ім'я"
          style={styles.input}
          value={form.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
          <Text style={styles.registerButtonText}>Зареєструватися</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 15 },
  registerButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  registerButtonText: { color: "#fff", fontSize: 16 },
});

export default ProfileScreen;
