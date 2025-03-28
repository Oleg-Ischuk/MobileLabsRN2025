import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import MainScreen from "./screens/MainScreen";
import TasksScreen from "./screens/TasksScreen";
import { GameProvider } from "./components/GameContext";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        translucent={false}
      />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <GameProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  if (route.name === "Клікер") {
                    return (
                      <Icon name="gesture-tap" size={size} color={color} />
                    );
                  } else if (route.name === "Завдання") {
                    return (
                      <Icon
                        name="view-grid-outline"
                        size={size}
                        color={color}
                      />
                    );
                  }
                },
                tabBarActiveTintColor: "#2196F3",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
              })}
            >
              <Tab.Screen name="Клікер" component={MainScreen} />
              <Tab.Screen name="Завдання" component={TasksScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </GameProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
