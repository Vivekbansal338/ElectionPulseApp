import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Marker, Polyline, Polygon, Geojson } from "react-native-maps";
import MapView from "react-native-map-clustering";
import TabButtons from "../common/TabButtons";
import { mapTabs as tabs } from "../../utils/headerData";
import {
  calculateRegionCenter,
  generateRandomVoteMarkers,
} from "../../utils/HelperFunctions";
import { useLocalSearchParams } from "expo-router";
import { useElectionSeatInfoById } from "../../Services/Query/electionSeatQuery";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

const Map = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const { id } = useLocalSearchParams();
  const locations = useSelector((state) => state.Location.locations);
  const { data, isError, error, isPending } = useElectionSeatInfoById(id);
  const voteMarkers = generateRandomVoteMarkers(
    data?.data?.seat?.boundary?.coordinates,
    data?.data?.seat?.boundary?.type,
    50
  );

  console.log("voteMarkers", voteMarkers);

  const mapRef = useRef(null);

  // const coordinates = locations.map((location) => ({
  //   latitude: location.coords.latitude,
  //   longitude: location.coords.longitude,
  // }));

  // const clusteredCoordinates = coordinates.reduce((acc, curr) => {
  //   const lastCoord = acc[acc.length - 1];
  //   if (
  //     lastCoord &&
  //     lastCoord.latitude === curr.latitude &&
  //     lastCoord.longitude === curr.longitude
  //   ) {
  //     lastCoord.count = (lastCoord.count || 1) + 1;
  //   } else {
  //     acc.push({ ...curr, count: 1 });
  //   }
  //   return acc;
  // }, []);

  // useEffect(() => {
  //   if (mapRef.current && coordinates.length > 0) {
  //     const initRegion = {
  //       latitude: coordinates[0].latitude,
  //       longitude: coordinates[0].longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     };
  //     mapRef.current.animateToRegion(initRegion, 1000);
  //   }
  // }, [coordinates]);

  useEffect(() => {
    const { type, coordinates } = data?.data?.seat?.boundary;
    if (
      (mapRef.current && type && coordinates.length > 0) ||
      activeTab === "Constituency"
    ) {
      const { longitude, latitude, latitudeDelta, longitudeDelta } =
        calculateRegionCenter(coordinates, type);

      const region = {
        latitude,
        longitude,
        latitudeDelta, // Dynamic zoom level
        longitudeDelta, // Dynamic zoom level
      };
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [data, activeTab]);

  if (isPending) return <Text>Loading...</Text>;

  const myPlace = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          fill: "rgba(0, 0, 0, 0.2) ",
        },
        geometry: {
          type: data?.data?.seat?.boundary?.type,
          coordinates: data?.data?.seat?.boundary?.coordinates,
        },
      },
    ],
  };

  const initRegion = {
    latitude: 28.7041,
    longitude: 77.1025,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass
      >
        <Geojson geojson={myPlace} />

        {voteMarkers.map((marker, index) => (
          <Marker key={index} coordinate={marker}>
            <View style={styles.customMarker}>
              <MaterialIcons name="location-on" size={24} color="red" />
              <Text style={styles.customMarkerText}>{5}</Text>
            </View>
          </Marker>
        ))}

        {/* <Polyline
          coordinates={coordinates}
          strokeColor="#000"
          strokeWidth={3}
          lineDashPattern={[5, 5]}
        /> */}

        {/* {clusteredCoordinates.map((coord, index) => {
          if (index === clusteredCoordinates.length - 1) {
            return (
              <Marker
                key={index}
                coordinate={coord}
                title={`Location ${index + 1}`}
                description={`Count: ${coord.count || 1}`}
              />
            );
          } else {
            const randomValue = Math.floor(Math.random() * 100) + 1;
            return (
              <Marker
                key={index}
                coordinate={coord}
                flat={true}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={styles.customMarker}>
                  <MaterialIcons name="location-on" size={24} color="red" />
                  <Text style={styles.customMarkerText}>{randomValue}</Text>
                </View>
              </Marker>
            );
          }
        })} */}
      </MapView>
      {/* <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 2,
          backgroundColor: "#fff",
        }}
      >
        <TabButtons
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  customMarker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customMarkerText: {
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default Map;
