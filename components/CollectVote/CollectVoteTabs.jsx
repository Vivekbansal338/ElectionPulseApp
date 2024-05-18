import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../../utils/colorData";
import React from "react";

const tabs = ["Quick Vote", "Bulk Votes", "Detailed Vote"];

const CollectVoteTabs = ({ activeTab, handleChangeTab }) => {
  const handleSelect = (tab) => {
    handleChangeTab(tab);
  };

  return (
    <View style={styles.toptypecontainer}>
      {tabs.map((tab, index) => (
        <React.Fragment key={tab}>
          <TouchableOpacity
            style={
              activeTab === tab ? styles.activetypeButton : styles.typeButton
            }
            onPress={() => handleSelect(tab)}
          >
            <Text
              style={
                activeTab === tab ? styles.activetypeText : styles.typeText
              }
            >
              {tab}
            </Text>
          </TouchableOpacity>
          {index < tabs.length - 1 && <View style={styles.verticaldivider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default CollectVoteTabs;
const styles = StyleSheet.create({
  toptypecontainer: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  verticaldivider: {
    height: 50,
    width: 1.5,
    backgroundColor: "grey",
  },
  typeText: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
  activetypeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  typeButton: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activetypeButton: {
    backgroundColor: colors.secondary,
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
