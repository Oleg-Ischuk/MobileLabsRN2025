import React, { createContext, useState, useContext, useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";

const lightTheme = {
  background: "#f5f5f5",
  cardBackground: "#ffffff",
  tabBarBackground: "#e0e0e0",
  text: "#1a1a1a",
  secondaryText: "#555555",
  accent: "#31bcfc",
  border: "#dddddd",
  online: "#00d44b",
  discount: "#00d44b",
  unread: "#31bcfc",
  isDark: false,
  activeTabIcon: "#1a1a1a",
  inactiveTabIcon: "#888888",
};

const darkTheme = {
  background: "#1c202c",
  cardBackground: "#171a24",
  tabBarBackground: "#12141C",
  activeTabIcon: "#ffffff",
  inactiveTabIcon: "#4B5664",
  text: "#ffffff",
  secondaryText: "#7b8d9d",
  accent: "#31bcfc",
  border: "#303649",
  online: "#00d44b",
  discount: "#00d44b",
  unread: "#31bcfc",
  isDark: true,
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.isDark ? lightTheme : darkTheme);
  };

  useEffect(() => {
    StatusBar.setBarStyle(theme.isDark ? "light-content" : "dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(theme.isDark ? "#12141C" : "#f5f5f5");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
