import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function ActionButton({
  icon,
  label,
  onPress,
  backgroundColor,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});
