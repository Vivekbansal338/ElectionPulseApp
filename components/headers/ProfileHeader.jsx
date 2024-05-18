import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { colors, color2 } from "../../utils/colorData";
import { Ionicons } from "@expo/vector-icons";
import { getProfileHeaderData } from "../../utils/headerData";

const ProfileHeader = ({
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
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "PersonalDetails" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("PersonalDetails")}
        >
          <Ionicons
            name={getProfileHeaderData("PersonalDetails").icon}
            size={24}
            color={getProfileHeaderData("PersonalDetails").color}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "PersonalDetails" && styles.activeTabText,
            ]}
          >
            Personal Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "VerificationSecurity" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("VerificationSecurity")}
        >
          <Ionicons
            name={getProfileHeaderData("VerificationSecurity").icon}
            size={24}
            color={getProfileHeaderData("VerificationSecurity").color}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "VerificationSecurity" && styles.activeTabText,
            ]}
          >
            Verification & Security
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "AccountSettings" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("AccountSettings")}
        >
          <Ionicons
            name={getProfileHeaderData("AccountSettings").icon}
            size={24}
            color={getProfileHeaderData("AccountSettings").color}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "AccountSettings" && styles.activeTabText,
            ]}
          >
            Account Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "UpdateProfile" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("UpdateProfile")}
        >
          <Ionicons
            name={getProfileHeaderData("UpdateProfile").icon}
            size={24}
            color={getProfileHeaderData("UpdateProfile").color}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "UpdateProfile" && styles.activeTabText,
            ]}
          >
            Update Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileHeader;

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
