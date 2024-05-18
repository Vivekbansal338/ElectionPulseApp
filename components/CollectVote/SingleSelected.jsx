import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../utils/colorData";
import * as Location from "expo-location";
import VoteSubmitModal from "./VoteSubmitModal";
import Toast from "react-native-toast-message";

const SingleSelected = ({ selectedParty, setSelectedParty }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
    setSelectedParty(null);
  };

  return (
    <View style={styles.noselectedcontainer}>
      <Text style={styles.title}>{selectedParty.name}</Text>
      <Text style={styles.title}>{"(" + selectedParty.shortName + ")"}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit(selectedParty)}
      >
        <Text style={styles.buttonText}>Submit Vote</Text>
      </TouchableOpacity>

      <VoteSubmitModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        partyData={selectedParty._id}
        submitDone={submitDone}
        type="Quick"
      />
    </View>
  );
};

export default SingleSelected;

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.primary,
  },
  stage: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
