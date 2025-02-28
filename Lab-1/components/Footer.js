import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Іщук Олег Сергійович ІПЗ-23-1</Text>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    width: "100%",
  },
  footerText: { color: "#666", fontSize: 14 },
});

export default Footer;
