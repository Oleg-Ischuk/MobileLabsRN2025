import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

const newsData = Array(10).fill({
  title: "Заголовок новини",
  date: "Дата новини",
  text: "Короткий текст новини",
});

const HomeScreen = () => (
  <View style={styles.screenContainer}>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Новини</Text>
      {newsData.map((item, index) => (
        <View key={index} style={styles.newsItem}>
          <Image
            source={require("../assets/tiger.jpg")}
            style={styles.newsImage}
          />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDate}>{item.date}</Text>
            <Text style={styles.newsText}>{item.text}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#000",
  },
  newsItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  newsImage: { width: 100, height: 100, marginRight: 10, borderRadius: 10 },
  newsContent: { flex: 1 },
  newsTitle: { fontSize: 16, fontWeight: "500", color: "#000" },
  newsDate: { fontSize: 12, color: "#666" },
  newsText: { fontSize: 14, color: "#444" },
});

export default HomeScreen;
