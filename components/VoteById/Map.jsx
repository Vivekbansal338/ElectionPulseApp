import React, { useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Marker, Geojson } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { calculateRegionCenter } from "../../utils/HelperFunctions";
import { useLocalSearchParams } from "expo-router";
import {
  useElectionSeatInfoById,
  useElectionSeatVoteLocationsById,
} from "../../Services/Query/electionSeatQuery";
import { useSelector } from "react-redux";

const Map = () => {
  const { id } = useLocalSearchParams();
  const mapRef = useRef(null);
  // const locations = useSelector((state) => state.Location.locations);
  const { data, isError, error, isPending } = useElectionSeatInfoById(id);
  const {
    data: voteLocations,
    isPending: isPendingVoteLocations,
    isError: isErrorVoteLocations,
    error: errorVoteLocations,
  } = useElectionSeatVoteLocationsById(id);

  // Calculate initial region directly if data is available
  const initialRegion = calculateRegionCenter(
    data.data.seat.boundary.coordinates,
    data.data.seat.boundary.type
  );

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

  const renderCluster = (cluster, onPress) => (
    console.log("---------", cluster),
    (
      <Marker
        coordinate={{
          latitude: cluster.geometry.coordinates[1],
          longitude: cluster.geometry.coordinates[0],
        }}
        onPress={onPress}
        key={cluster.id}
      >
        <View style={styles.customMarker}>
          <Text style={styles.customMarkerText}>Test</Text>
        </View>
      </Marker>
    )
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        // renderCluster={renderCluster}
      >
        <Geojson geojson={myPlace} />

        {!isPendingVoteLocations &&
          voteLocations?.data?.map((marker, index) => (
            <Marker key={index} coordinate={marker.location}>
              <View style={styles.customMarker}>
                <Text style={styles.customMarkerText}>1</Text>
              </View>
            </Marker>
          ))}
      </MapView>
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
    width: 30,
    height: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
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
    fontWeight: "bold",
  },
});

export default Map;
