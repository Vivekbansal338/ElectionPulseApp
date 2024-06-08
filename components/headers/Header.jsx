import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animatedicon from "../common/Animatedicon";
import * as Network from "expo-network";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { AddLocation } from "../../Store/Locations";
import {
  useUnstableGlobalHref,
  usePathname,
  useGlobalSearchParams,
  useLocalSearchParams,
  useSegments,
} from "expo-router";

const Header = () => {
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(true);
  const [isLocationAvailable, setIsLocationAvailable] = useState(false);
  const dispatch = useDispatch();

  const globalHref = useUnstableGlobalHref();
  const pathname = usePathname();
  const globalSearchParams = useGlobalSearchParams();
  const localSearchParams = useLocalSearchParams();
  const segments = useSegments();

  console.log("globalHref", globalHref); //globalHref /vote/66618aba3a758a73632a6c1d?status=Ongoing
  console.log("pathname", pathname); //pathname /vote/66618aba3a758a73632a6c1d
  console.log("globalSearchParams", globalSearchParams); //globalSearchParams {"id": "66618aba3a758a73632a6c1d", "status": "Ongoing"}
  console.log("localSearchParams", localSearchParams); //localSearchParams {"id": "66618aba3a758a73632a6c1d", "status": "Ongoing"}
  console.log("segments", segments); //segments ["vote", "[id]"]

  // check if current route is /vote/:id
  const isVoteById = pathname.includes("/vote/");
  let electionSeatId = "";
  let electionSeatStatus = "";
  if (isVoteById) {
    electionSeatStatus = localSearchParams.status;
    electionSeatId = localSearchParams.id;
  }
  console.log("isVoteById", isVoteById, electionSeatId, electionSeatStatus);

  console.log("==============================================================");

  useEffect(() => {
    const checkNetworkStatus = async () => {
      const networkState = await Network.getNetworkStateAsync();
      setIsNetworkAvailable(networkState.isInternetReachable);
    };

    const checkLocationStatus = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Required",
          "Please grant location permission in the app settings.",
          [{ text: "OK" }]
        );
      } else {
        const isLocationEnabled = await Location.hasServicesEnabledAsync();
        if (!isLocationEnabled) {
          Alert.alert(
            "Location Services Disabled",
            "Please enable location services in your device settings.",
            [{ text: "OK" }]
          );
        } else {
          setIsLocationAvailable(true);
        }
      }
    };

    const getLocationAndStore = async () => {
      console.log("Getting location...");
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });
      console.log(location);
      dispatch(AddLocation(location));
    };

    checkNetworkStatus();
    checkLocationStatus();
    const intervalId = setInterval(getLocationAndStore, 60000 * 10); // 10 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/Designer.png")}
        style={styles.logo}
      />
      <View style={styles.statusIndicators}>
        <Animatedicon
          source={require("../../assets/icons/alarm-clock.json")}
          width={24}
          height={24}
          autoPlay={isNetworkAvailable}
        />
        <Animatedicon
          source={require("../../assets/icons/wireless-connection.json")}
          width={24}
          height={24}
          autoPlay={isNetworkAvailable}
        />
        <Animatedicon
          source={require("../../assets/icons/location-pin.json")}
          width={24}
          height={24}
          autoPlay={isLocationAvailable}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    // elevation: 2,
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  statusIndicators: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default Header;
