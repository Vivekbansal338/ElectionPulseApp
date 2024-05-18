import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { colors } from "../../utils/colorData";
import { useLocalSearchParams } from "expo-router";
import { useCastVote } from "../../Services/Query/voteQuery";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import {
  AddVoteWithLocation,
  AddVoteWithoutLocation,
} from "../../Store/VoteCart";
import { SetLastLocationCoords } from "../../Store/Locations";
import { useDispatch } from "react-redux";
import Animatedicon from "../common/Animatedicon";

const VoteSubmitModal = ({
  modalVisible,
  setModalVisible,
  partyData,
  type,
  submitDone,
  otherData,
}) => {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const myId = useSelector((state) => state.Auth.userId);
  const [isLocationPending, setIsLocationPending] = useState(false);
  const [isLocationError, setLocationError] = useState(false);
  const { mutate, isPending, isError, error, isSuccess } = useCastVote();
  const [voteSuccess, setVoteSuccess] = useState(false);
  const lastLocation = useSelector(
    (state) => state.Location.lastLocationCoords
  );
  const isLastLocationAvailable =
    lastLocation.latitude !== 0 && lastLocation.longitude !== 0;

  useEffect(() => {
    if (modalVisible) {
      handleSubmit(partyData, type, "current");
    }
  }, [modalVisible]);

  const getLocationAndStore = async () => {
    setIsLocationPending(true);
    const location = await new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("Location request timed out"));
      }, 10000);
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      })
        .then((location) => {
          clearTimeout(timeoutId);
          resolve(location);
        })
        .catch(reject);
    }).catch(() => {
      return null;
    });
    setIsLocationPending(false);
    if (location) {
      dispatch(
        SetLastLocationCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
    }
    return location
      ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      : null;
  };

  // time = current/past  past-> last location
  const handleSubmit = async (party, type, time) => {
    setVoteSuccess(false);
    let location = null;
    if (time === "current") {
      location = await getLocationAndStore();
      if (!location) {
        setLocationError(true);
        return;
      }
    } else {
      location = lastLocation;
    }
    let formdata = {
      party: party,
      collector: myId,
      electionSeat: id,
      voteType: type,
      location: location,
    };
    if (type === "Detailed") {
      formdata = {
        ...formdata,
        ...otherData,
      };
    }
    console.log(formdata);
    mutate(
      { data: formdata },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Vote Submitted",
            text2: "Your vote has been submitted successfully",
          });
          submitDone();
          setVoteSuccess(true);
          setModalVisible(false);
        },
      },
      {
        onError: () => {},
      }
    );
  };

  const handleRetry = async () => {
    await handleSubmit(partyData, type, "current");
  };

  const handleSaveVote = () => {
    setVoteSuccess(false);
    let formdata = {
      party: partyData,
      collector: myId,
      electionSeat: id,
      voteType: type,
      location: {},
    };
    if (type === "Detailed") {
      formdata = {
        ...formdata,
        ...otherData,
      };
    }
    if (isLastLocationAvailable) {
      formdata.location = lastLocation;
      dispatch(AddVoteWithLocation(formdata));
    } else {
      dispatch(AddVoteWithoutLocation(formdata));
    }
    Toast.show({
      type: "info",
      text1: "Vote Saved",
      text2: "Your vote has been saved locally",
    });
    submitDone();
    setModalVisible(false);
    setVoteSuccess(true);
  };

  const handleUseLastLocation = () => {
    handleSubmit(partyData, type, "past");
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.stage}>
            <Text style={styles.modalText}>
              {isLocationPending && "Getting Location..."}
              {isLocationError && !isLocationPending && "Location Error"}
              {!isLocationPending && !isLocationError && "Location Received"}
            </Text>
            {isLocationPending && (
              <Animatedicon
                source={require("../../assets/icons/location-pin.json")}
                width={24}
                height={24}
                autoPlay={true}
              />
            )}
            {isLocationError && !isLocationPending && (
              <Animatedicon
                source={require("../../assets/icons/error.json")}
                width={24}
                height={24}
                autoPlay={true}
              />
            )}
            {!isLocationPending && !isLocationError && (
              <Animatedicon
                source={require("../../assets/icons/checked.json")}
                width={24}
                height={24}
                autoPlay={true}
              />
            )}
          </View>
          {(isLocationPending || isPending) && (
            <View style={styles.stage}>
              <Text style={styles.modalText}>Submitting Vote...</Text>

              <Animatedicon
                source={require("../../assets/icons/vote-elections.json")}
                width={24}
                height={24}
                autoPlay={true}
              />
            </View>
          )}

          {!isLocationPending && isLocationError && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity style={[styles.button]} onPress={handleRetry}>
                  <Text style={styles.buttonText}>Retry Location</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={[styles.button]}
                  onPress={handleSaveVote}
                >
                  <Text style={styles.buttonText}>Save Locally</Text>
                </TouchableOpacity> */}
              </View>
              {isLastLocationAvailable && (
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={handleUseLastLocation}
                >
                  <Text style={styles.buttonText}>
                    Submit With Last Available Location
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {!isLocationPending &&
            !isLocationError &&
            !isPending &&
            isSuccess && (
              <View style={styles.stage}>
                <Text style={styles.modalText}>Vote Submitted</Text>
                <Animatedicon
                  source={require("../../assets/icons/checked.json")}
                  width={24}
                  height={24}
                  autoPlay={true}
                />
              </View>
            )}

          {!isLocationPending && !isLocationError && !isPending && isError && (
            <View style={styles.stage}>
              <Text style={styles.modalText}>Vote Submission Failed</Text>
              <Animatedicon
                source={require("../../assets/icons/error.json")}
                width={24}
                height={24}
                autoPlay={true}
              />
            </View>
          )}

          {!isLocationPending && !isLocationError && !isPending && isError && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={handleSaveVote}
                >
                  <Text style={styles.buttonText}>Save Locally</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button]}
            disabled={isPending || isLocationPending}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VoteSubmitModal;

const styles = StyleSheet.create({
  noselectedcontainer: {
    minHeight: 200,
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    paddingHorizontal: 10,
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
    margin: 5,
    minWidth: 140,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
    paddingHorizontal: 20,
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
