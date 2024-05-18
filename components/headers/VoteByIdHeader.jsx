import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { colors, color2 } from "../../utils/colorData";
import { Ionicons } from "@expo/vector-icons";
import { getVoteHeaderData } from "../../utils/headerData";

const VoteByIdHeader = ({
  scrollViewRef,
  activeTab,
  setActiveTab,
  handleTabPress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        ref={scrollViewRef}
      >
        {["Vote", "Info", "Stats", "Map", "Chats"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(tab)}
          >
            <Ionicons
              name={getVoteHeaderData(tab).icon}
              size={24}
              color={getVoteHeaderData(tab).color}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default VoteByIdHeader;

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
