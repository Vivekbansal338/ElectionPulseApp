import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colorData";

const Divider = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  text: {
    marginHorizontal: 10,
    color: "gray",
  },
});

export default Divider;
