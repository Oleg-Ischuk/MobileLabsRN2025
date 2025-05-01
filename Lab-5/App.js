"use client";

import { useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import * as FileSystem from "expo-file-system";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FileExplorer from "./components/FileExplorer";
import FileViewer from "./components/FileViewer";
import { ThemeProvider } from "./context/ThemeContext";

export const BASE_PATH = FileSystem.documentDirectory + "AppData/";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const dirInfo = await FileSystem.getInfoAsync(BASE_PATH);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(BASE_PATH, {
            intermediates: true,
          });
        }
      } catch (error) {
        console.error("Initialization failed:", error);
      }
    };

    initializeApp();
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="FileExplorer"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="FileExplorer" component={FileExplorer} />
            <Stack.Screen name="FileViewer" component={FileViewer} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
