import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import TaskItem from "../components/TaskItem";
import { useGame } from "../components/GameContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UpgradeItem = ({
  title,
  description,
  level,
  cost,
  onPress,
  icon,
  color,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.upgradeItem, disabled && styles.upgradeItemDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[styles.upgradeIconContainer, { backgroundColor: color + "20" }]}
      >
        <Icon name={icon} size={24} color={color} />
      </View>
      <View style={styles.upgradeContent}>
        <Text style={styles.upgradeTitle}>{title}</Text>
        <Text style={styles.upgradeDescription}>{description}</Text>
        <Text style={styles.upgradeLevel}>Рівень: {level}</Text>
      </View>
      <View style={styles.upgradeCost}>
        <Text
          style={[
            styles.upgradeCostText,
            disabled && styles.upgradeCostTextDisabled,
          ]}
        >
          {cost}
        </Text>
        <Image
          source={require("../assets/hamster.png")}
          style={styles.coinImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const TasksScreen = () => {
  const { tasks, tapUpgrades, upgradeTap, score } = useGame();

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const getProgressColor = (percentage) => {
    if (percentage === 0) return "#FF0000";
    if (percentage < 25) return "#FF0000";
    if (percentage < 50) return "#FF8000";
    if (percentage < 75) return "#FFFF00";
    if (percentage < 100) return "#00FF00";
    return "#8BC34A";
  };

  const singleTapCost = tapUpgrades.singleTapLevel * 10;
  const doubleTapCost = tapUpgrades.doubleTapLevel * 20;
  const longPressCost = tapUpgrades.longPressLevel * 30;
  const criticalClickCost = tapUpgrades.criticalClickLevel * 75;
  const comboClickCost = tapUpgrades.comboClickLevel * 100;
  const swipeUpgradeCost = tapUpgrades.swipeUpgradeLevel * 40;
  const pinchUpgradeCost = tapUpgrades.pinchUpgradeLevel * 60;

  const canUpgradeSingleTap = score >= singleTapCost;
  const canUpgradeDoubleTap = score >= doubleTapCost;
  const canUpgradeLongPress = score >= longPressCost;
  const canUpgradeCriticalClick = score >= criticalClickCost;
  const canUpgradeComboClick = score >= comboClickCost;
  const canUpgradeSwipe = score >= swipeUpgradeCost;
  const canUpgradePinch = score >= pinchUpgradeCost;

  const handleUpgrade = (type) => {
    upgradeTap(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Завдання</Text>
        <View style={styles.scoreContainer}>
          <Image
            source={require("../assets/hamster.png")}
            style={styles.coinImage}
            resizeMode="contain"
          />
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.upgradesContainer}>
          <Text style={styles.upgradesTitle}>Покращення</Text>

          <UpgradeItem
            title="Одиночний клік"
            description={`+${(tapUpgrades.singleTap + 0.5).toFixed(
              1
            )} очків за клік`}
            level={tapUpgrades.singleTapLevel}
            cost={singleTapCost}
            icon="gesture-tap"
            color="#2196F3"
            onPress={() => handleUpgrade("singleTap")}
            disabled={!canUpgradeSingleTap}
          />

          <UpgradeItem
            title="Подвійний клік"
            description={`+${(tapUpgrades.doubleTap + 1).toFixed(
              1
            )} очків за подвійний клік`}
            level={tapUpgrades.doubleTapLevel}
            cost={doubleTapCost}
            icon="gesture-tap-hold"
            color="#03A9F4"
            onPress={() => handleUpgrade("doubleTap")}
            disabled={!canUpgradeDoubleTap}
          />

          <UpgradeItem
            title="Довге натискання"
            description={`+${(tapUpgrades.longPress + 1.5).toFixed(
              1
            )} очків за утримання`}
            level={tapUpgrades.longPressLevel}
            cost={longPressCost}
            icon="timer-outline"
            color="#9C27B0"
            onPress={() => handleUpgrade("longPress")}
            disabled={!canUpgradeLongPress}
          />

          <UpgradeItem
            title="Критичний клік"
            description={`${
              tapUpgrades.criticalClickChance
            }% шанс x${tapUpgrades.criticalClickMultiplier.toFixed(1)} очків`}
            level={tapUpgrades.criticalClickLevel}
            cost={criticalClickCost}
            icon="flash"
            color="#FF9800"
            onPress={() => handleUpgrade("criticalClick")}
            disabled={!canUpgradeCriticalClick}
          />

          <UpgradeItem
            title="Комбо клік"
            description={`+${tapUpgrades.comboClickBonus.toFixed(
              1
            )} очків за кожен клік у комбо`}
            level={tapUpgrades.comboClickLevel}
            cost={comboClickCost}
            icon="numeric"
            color="#E91E63"
            onPress={() => handleUpgrade("comboClick")}
            disabled={!canUpgradeComboClick}
          />

          <UpgradeItem
            title="Покращення свайпу"
            description={`+${tapUpgrades.swipeUpgradeValue.toFixed(
              1
            )} очків за свайп`}
            level={tapUpgrades.swipeUpgradeLevel}
            cost={swipeUpgradeCost}
            icon="gesture-swipe"
            color="#673AB7"
            onPress={() => handleUpgrade("swipeUpgrade")}
            disabled={!canUpgradeSwipe}
          />

          <UpgradeItem
            title="Покращення щипка"
            description={`+${tapUpgrades.pinchUpgradeValue.toFixed(
              1
            )} очків за щипок`}
            level={tapUpgrades.pinchUpgradeLevel}
            cost={pinchUpgradeCost}
            icon="gesture-spread"
            color="#009688"
            onPress={() => handleUpgrade("pinchUpgrade")}
            disabled={!canUpgradePinch}
          />
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.mainTasksTitle}>Основні завдання</Text>
          <Text style={styles.subtitle}>
            Виконуйте завдання, щоб отримати досягнення
          </Text>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progressPercentage}%`,
                  backgroundColor: getProgressColor(progressPercentage),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {completedTasks}/{totalTasks} виконано
          </Text>
        </View>

        <FlatList
          data={tasks}
          renderItem={({ item }) => <TaskItem task={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
          nestedScrollEnabled={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
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
    color: "#333",
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
  coinImage: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF8F00",
  },
  upgradesContainer: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  upgradesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  upgradeItem: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: "center",
  },
  upgradeItemDisabled: {
    opacity: 0.7,
  },
  upgradeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  upgradeContent: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  upgradeDescription: {
    fontSize: 14,
    color: "#666",
  },
  upgradeLevel: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  upgradeCost: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
  },
  upgradeCostText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginRight: 4,
  },
  upgradeCostTextDisabled: {
    color: "#999",
  },
  progressSection: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  mainTasksTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  progressContainer: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  listContent: {
    padding: 16,
  },
});

export default TasksScreen;
