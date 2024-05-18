import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import MapViewComponent from "../../components/common/MapViewComponent";
import ProfileHeader from "../../components/headers/ProfileHeader";
import React, { useRef, useState } from "react";
import { getProfileHeaderData } from "../../utils/headerData";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import PersonalDetails from "../../components/Profile/PersonalDetails";
import { useGetEmployeeProfile } from "../../Services/Query/profileQuery";

const Profile = () => {
  const { data, isLoading, isError, error } = useGetEmployeeProfile();
  const [activeTab, setActiveTab] = useState("PersonalDetails");
  const scrollViewRef = useRef(null);

  const handleTabPress = (tab) => {
    scrollViewRef.current.scrollTo({
      x: getProfileHeaderData(tab).scrollx,
      y: 0,
    });
    setActiveTab(tab);
  };

  const onSwipeLeft = (currentTab) => {
    const nextTab = getProfileHeaderData(currentTab).next;
    setActiveTab(nextTab);
    scrollViewRef.current?.scrollTo({
      x: getProfileHeaderData(nextTab).scrollx,
      animated: true,
    });
  };

  const onSwipeRight = (currentTab) => {
    const prevTab = getProfileHeaderData(currentTab).prev;
    setActiveTab(prevTab);
    scrollViewRef.current?.scrollTo({
      x: getProfileHeaderData(prevTab).scrollx,
      animated: true,
    });
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  console.log(data);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ProfileHeader
        scrollViewRef={scrollViewRef}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleTabPress={handleTabPress}
      />
      <GestureRecognizer
        onSwipeLeft={() => onSwipeLeft(activeTab)}
        onSwipeRight={() => onSwipeRight(activeTab)}
        config={config}
        style={{
          flex: 1,
        }}
      >
        {activeTab === "PersonalDetails" && (
          <PersonalDetails profileData={data?.data} />
        )}
      </GestureRecognizer>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDetails: {
    flexDirection: "column",
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  detailsValue: {
    fontSize: 14,
    flex: 1,
  },
});
