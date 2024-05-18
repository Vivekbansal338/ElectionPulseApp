import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { colors, color2 } from "../../utils/colorData";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const PersonalDetails = ({ profileData }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={styles.container}>
        <View style={styles.profiletopcontainer}>
          <View>
            <Image
              style={styles.image}
              source={{ uri: profileData.profileImage }}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Text style={styles.title}>{profileData.name}</Text>
            <Text style={styles.title2} numberOfLines={1} ellipsizeMode="tail">
              {profileData.email}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
            padding: 10,
            paddingHorizontal: 15,
            marginTop: 20,
          }}
        >
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Account Status</Text>
            <View style={[styles.badge]}>
              <Ionicons
                name={
                  profileData.status === "Active"
                    ? "checkmark-circle-outline"
                    : "close-circle-outline"
                }
                size={16}
                color={
                  profileData.status === "Active"
                    ? color2.success
                    : color2.danger
                }
              />
              <Text style={styles.badgeText}>{profileData.status}</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Verification Status</Text>
            <View style={[styles.badge]}>
              <Ionicons
                name={
                  profileData.verificationStatus === "Verified"
                    ? "checkmark-circle-outline"
                    : "close-circle-outline"
                }
                size={16}
                color={
                  profileData.verificationStatus === "Verified"
                    ? color2.success
                    : color2.danger
                }
              />
              <Text style={styles.badgeText}>
                {profileData.verificationStatus}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
  },
  profiletopcontainer: {
    height: 150,
    backgroundColor: colors.secondary,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
  },
  title2: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
    width: "80%",
  },
  statsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  statsText: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.secondary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
  },
});
