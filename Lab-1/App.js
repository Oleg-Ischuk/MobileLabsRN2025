import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomTabBar from "./components/CustomTabBar";
import HomeScreen from "./screens/HomeScreen";
import GalleryScreen from "./screens/GalleryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import GestureRecognizer from "react-native-swipe-gestures";
import { StatusBar } from "react-native";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "gallery":
        return <GalleryScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const handleSwipeLeft = () => {
    if (activeTab === "home") setActiveTab("gallery");
    else if (activeTab === "gallery") setActiveTab("profile");
  };

  const handleSwipeRight = () => {
    if (activeTab === "profile") setActiveTab("gallery");
    else if (activeTab === "gallery") setActiveTab("home");
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <GestureRecognizer
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        style={styles.appContainer}
      >
        <Header />
        <CustomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderScreen()}
        <Footer />
      </GestureRecognizer>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: "#fff" },
});

export default App;
