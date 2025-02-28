import React from "react";
import { View, ScrollView, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const GalleryScreen = () => (
  <View style={styles.screenContainer}>
    <ScrollView style={styles.container}>
      <View style={styles.galleryContainer}>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <Image
              key={index}
              source={require("../assets/panda.jpg")}
              style={styles.galleryImage}
            />
          ))}
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  container: { flex: 1, backgroundColor: "#fff" },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  galleryImage: {
    width: (width - 30) / 2,
    height: (width - 30) / 2,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default GalleryScreen;
