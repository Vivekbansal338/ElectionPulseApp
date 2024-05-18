import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, color2 } from "../../utils/colorData";
import { infoTabs as tabs } from "../../utils/headerData";

const InfoTabs = ({ activeTab, setActiveTab }) => {
  const handleSelect = (tab) => {
    setActiveTab(tab.name);
  };

  return (
    <View style={styles.toptypecontainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.typeButton,
            activeTab === tab.name && styles.activetypeButton,
          ]}
          onPress={() => handleSelect(tab)}
        >
          <Ionicons name={tab.icon} size={24} color={tab.color} />
          {activeTab === tab.name && (
            <Text style={styles.activetypeText}>{tab.name}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default InfoTabs;

const styles = StyleSheet.create({
  toptypecontainer: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  typeButton: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  activetypeButton: {
    backgroundColor: colors.secondary,
    height: "100%",
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  activetypeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
