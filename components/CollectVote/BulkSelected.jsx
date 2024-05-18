import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/colorData";
import * as Location from "expo-location";
import VoteSubmitModal from "./VoteSubmitModal";
import Toast from "react-native-toast-message";

const BulkSelected = ({
  selectedParties,
  setSelectedParties,
  setActiveTab,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const partiesWithCount = selectedParties.reduce((acc, party) => {
    if (acc[party._id]) {
      acc[party._id].count += 1;
    } else {
      acc[party._id] = { ...party, count: 1 };
    }
    return acc;
  }, {});

  const checkLocationPermissionAndStatus = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          text1: "Location Permission Denied",
          text2: "Please grant location permission to submit your vote.",
          type: "error",
        });
        return;
      }
      const locationStatus = await Location.getProviderStatusAsync();
      console.log("Location Services Status:", locationStatus);
      if (!locationStatus.locationServicesEnabled) {
        Toast.show({
          text1: "Location Services Disabled",
          text2: "Please enable location services to submit your vote.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error checking location permission and status:", error);
    }
  };

  const handleSubmit = async (party) => {
    await checkLocationPermissionAndStatus();
    setModalVisible(true);
  };

  const submitDone = () => {
    setSelectedParties([]);
    setActiveTab("Quick Vote");
  };

  // const handleSubmit = async (partiesWithCount) => {
  //   const location = await getLocationAndStore();
  //   const formdata = {
  //     party: Object.values(partiesWithCount).map((party) => ({
  //       id: party._id,
  //       count: party.count,
  //     })),
  //     collector: myId,
  //     electionSeat: id,
  //     voteType: "Bulk",
  //     location: location,
  //   };

  //   console.log(formdata);
  //   setSelectedParties([]);
  //   setActiveTab("Quick Vote");
  // };

  return (
    <View style={styles.noselectedcontainer}>
      {Object.values(partiesWithCount).map((party) => {
        return (
          <View key={party._id} style={styles.partywithcount}>
            <Text style={styles.counttext}>{party.shortName}</Text>
            <Text style={styles.counttext}>{party.count}</Text>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit(partiesWithCount)}
      >
        <Text style={styles.buttonText}>Submit Vote</Text>
      </TouchableOpacity>

      <VoteSubmitModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        partyData={Object.values(partiesWithCount).map((party) => ({
          id: party._id,
          count: party.count,
        }))}
        submitDone={submitDone}
        type="Bulk"
      />
    </View>
  );
};

export default BulkSelected;

const styles = StyleSheet.create({
  noselectedcontainer: {
    minHeight: 200,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  partywithcount: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  counttext: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colors.backbottom,
    padding: 15,
    borderRadius: 15,
    margin: 15,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
