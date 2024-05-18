import { StyleSheet, Text, View } from "react-native";
import Animatedicon from "../common/Animatedicon";
import { colors } from "../../utils/colorData";
import React from "react";

const NoSelected = ({ title = "No Party Selected" }) => {
  return (
    <View style={styles.noselectedcontainer}>
      <Animatedicon
        source={require("../../assets/icons/basket-empty2.json")}
        width={100}
        height={100}
        autoPlay={true}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default NoSelected;

const styles = StyleSheet.create({
  noselectedcontainer: {
    minHeight: 200,
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "900",
    color: colors.primary,
  },
});
