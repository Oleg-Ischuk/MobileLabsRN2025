"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

const lightTheme = {
  dark: false,
  background: "#F5F7FA",
  cardBackground: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#757575",
  primary: "#2196F3",
  border: "#E0E0E0",
  headerBackground: "#EDEDED",
  statsBackground: "#FFFFFF",
  modalBackground: "#FFFFFF",
  inputBackground: "#F5F7FA",
  deleteButtonBackground: "#FFEBEE",
  deleteButtonText: "#F44336",
  infoButtonBackground: "#E3F2FD",
  infoButtonText: "#2196F3",
  successButtonBackground: "#4CAF50",
  cancelButtonBackground: "#F44336",
};

const darkTheme = {
  dark: true,
  background: "#121212",
  cardBackground: "#1E1E1E",
  text: "#FFFFFF",
  textSecondary: "#AAAAAA",
  primary: "#2196F3",
  border: "#333333",
  headerBackground: "#1E1E1E",
  statsBackground: "#1E1E1E",
  modalBackground: "#1E1E1E",
  inputBackground: "#2C2C2C",
  deleteButtonBackground: "#3E2723",
  deleteButtonText: "#FF5252",
  infoButtonBackground: "#0D47A1",
  infoButtonText: "#64B5F6",
  successButtonBackground: "#388E3C",
  cancelButtonBackground: "#C62828",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState(
    deviceTheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    setTheme(deviceTheme === "dark" ? darkTheme : lightTheme);
  }, [deviceTheme]);

  const toggleTheme = () => {
    setTheme(theme.dark ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
