import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const MENU_ITEMS = [
  { name: "Головна", key: "home", icon: "home" },
  { name: "Фотогалерея", key: "gallery", icon: "photo" },
  { name: "Профіль", key: "profile", icon: "user" },
];

const CustomTabBar = ({ activeTab, setActiveTab }) => (
  <View style={styles.customTabBar}>
    {MENU_ITEMS.map((item) => (
      <TouchableOpacity
        key={item.key}
        onPress={() => setActiveTab(item.key)}
        style={[styles.tabItem, activeTab === item.key && styles.activeTabItem]}
      >
        <Icon
          name={item.icon}
          size={18}
          color={activeTab === item.key ? "#007bff" : "#666"}
        />
        <Text
          style={[
            styles.tabBarLabel,
            activeTab === item.key && styles.activeTab,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  customTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabItem: {
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarLabel: { fontSize: 16, color: "#666" },
  activeTab: { color: "#007bff", fontWeight: "bold" },
  activeTabItem: { borderBottomWidth: 2, borderBottomColor: "#007bff" },
});

export default CustomTabBar;
