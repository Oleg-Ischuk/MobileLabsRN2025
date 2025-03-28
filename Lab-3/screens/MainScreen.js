import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";
import ClickerObject from "../components/ClickerObject";
import { useGame } from "../components/GameContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MainScreen = () => {
  const { score, tapUpgrades } = useGame();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hamster</Text>
        <View style={styles.scoreContainer}>
          <View style={styles.coinContainer}>
            <Image
              source={require("../assets/hamster.png")}
              style={styles.coinImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.scoreValue}>{Math.floor(score)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <ClickerObject />

        <View style={styles.pointsInfoContainer}>
          <View style={styles.pointsInfoRow}>
            <View style={styles.pointsInfoItem}>
              <Icon name="gesture-tap" size={24} color="#2196F3" />
              <Text style={styles.pointsInfoText}>
                +{tapUpgrades.singleTap.toFixed(1)} очків
              </Text>
            </View>

            <View style={styles.pointsInfoItem}>
              <Icon name="gesture-tap-hold" size={24} color="#03A9F4" />
              <Text style={styles.pointsInfoText}>
                +{tapUpgrades.doubleTap.toFixed(1)} очків
              </Text>
            </View>

            <View style={styles.pointsInfoItem}>
              <Icon name="timer-outline" size={24} color="#9C27B0" />
              <Text style={styles.pointsInfoText}>
                +{tapUpgrades.longPress.toFixed(1)} очків
              </Text>
            </View>
          </View>

          <View style={styles.pointsInfoRow}>
            <View style={styles.pointsInfoItem}>
              <Icon name="gesture-swipe" size={24} color="#673AB7" />
              <Text style={styles.pointsInfoText}>
                +{tapUpgrades.swipeUpgradeValue.toFixed(1)} очків
              </Text>
            </View>

            <View style={styles.pointsInfoItem}>
              <Icon name="gesture-spread" size={24} color="#009688" />
              <Text style={styles.pointsInfoText}>
                +{tapUpgrades.pinchUpgradeValue.toFixed(1)} очків
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976D2",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFE082",
  },
  coinContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF8E1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    overflow: "hidden",
  },
  coinImage: {
    width: 30,
    height: 30,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF8F00",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  pointsInfoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  pointsInfoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  pointsInfoItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  pointsInfoText: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});

export default MainScreen;
