import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { color2, colors } from "../../utils/colorData";

const StatsItem = ({ stat }) => {
  return (
    <View style={styles.statItem}>
      <Icon name={stat.icon} size={48} color={stat.color} style={styles.icon} />
      <View>
        <Text style={styles.name}>{stat.name} </Text>
      </View>
      <Text style={styles.numbertext}>{stat.count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statItem: {
    width: "45%",
    display: "flex",
    gap: 8,
    paddingVertical: 16,
    backgroundColor: "white",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
  },
  numbertext: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default StatsItem;
