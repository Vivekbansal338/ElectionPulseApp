import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { getHomeHeaderData } from "../../utils/headerData";
import { colors } from "../../utils/colorData";
import { Ionicons } from "@expo/vector-icons";

const HomeHeader = ({ activeTab, setActiveTab, scrollViewRef }) => {
  const handleTabPress = (tab) => {
    if (tab === activeTab) return;
    if (tab === "Upcoming") {
      scrollViewRef.current?.scrollTo({ x: 0, animated: true });
    } else if (tab === "Ongoing") {
      scrollViewRef.current?.scrollTo({ x: 100, animated: true });
    } else {
      scrollViewRef.current?.scrollTo({ x: 200, animated: true });
    }
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        ref={scrollViewRef}
      >
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Upcoming" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("Upcoming")}
        >
          <Ionicons
            name={getHomeHeaderData("Upcoming").icon}
            size={24}
            color={getHomeHeaderData("Upcoming").color}
          />
          {/* <Animatedicon
            source={require("../../assets/icons/clock.json")}
            width={24}
            height={24}
            autoPlay={activeTab === "Upcoming" ? true : false}
          /> */}
          <Text
            style={[
              styles.tabText,
              activeTab === "Upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Ongoing" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("Ongoing")}
        >
          <Ionicons
            name={getHomeHeaderData("Ongoing").icon}
            size={24}
            color={getHomeHeaderData("Ongoing").color}
          />
          {/* <Animatedicon
            source={require("../../assets/icons/arrowrounded.json")}
            width={24}
            height={24}
            autoPlay={activeTab === "Ongoing"}
          /> */}
          <Text
            style={[
              styles.tabText,
              activeTab === "Ongoing" && styles.activeTabText,
            ]}
          >
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Completed" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("Completed")}
        >
          <Ionicons
            name={getHomeHeaderData("Completed").icon}
            size={24}
            color={getHomeHeaderData("Completed").color}
          />
          {/* <Animatedicon
            source={require("../../assets/icons/checked.json")}
            width={24}
            height={24}
            autoPlay={activeTab === "Completed"}
          /> */}
          <Text
            style={[
              styles.tabText,
              activeTab === "Completed" && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 5,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  tabButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: colors.secondary,
  },
  tabText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  activeTabText: {
    color: "white",
  },
});
