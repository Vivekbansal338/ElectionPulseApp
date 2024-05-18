import { StyleSheet, Text, View } from "react-native";
import Animatedicon from "../common/Animatedicon";
import React from "react";
import { colors } from "../../utils/colorData";

const HomeNoData = () => {
  return (
    <View style={styles.container}>
      <Animatedicon
        source={require("../../assets/icons/bin.json")}
        width={100}
        height={100}
        autoPlay={true}
      />
      <Text style={styles.title}>No Data Found</Text>
    </View>
  );
};

export default HomeNoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 36,
    height: 300,
    width: 250,
  },
  title: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "900",
    color: colors.primary,
  },
});
