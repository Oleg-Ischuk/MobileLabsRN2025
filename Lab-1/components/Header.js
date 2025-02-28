import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = () => (
  <View style={styles.headerContainer}>
    <Image
      source={require("../assets/logo.png")}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.appTitle}>FirstMobileApp</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 40,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logo: { width: 100, height: 30, marginLeft: 10 },
  appTitle: { fontSize: 24, fontWeight: "500", color: "#000", marginRight: 20 },
});

export default Header;
