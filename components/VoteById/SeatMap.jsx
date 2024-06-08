import React, { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Geojson } from "react-native-maps";
import { calculateRegionCenter } from "../../utils/HelperFunctions";

const SeatMap = ({ boundary }) => {
  if (!boundary) return null;

  const { type, coordinates } = boundary;
  const mapRef = useRef(null);

  const myPlace = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          // fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          fill: "rgba(0, 0, 0, 0.2) ",
        },
        geometry: {
          type: type,
          coordinates: coordinates,
        },
      },
    ],
  };

  useEffect(() => {
    if (mapRef.current && coordinates.length > 0) {
      const { longitude, latitude, latitudeDelta, longitudeDelta } =
        calculateRegionCenter(coordinates, type);

      const region = {
        latitude,
        longitude,
        latitudeDelta, // Dynamic zoom level
        longitudeDelta, // Dynamic zoom level
      };

      mapRef.current.animateToRegion(region, 1000); // Animate to the region smoothly
    }
  }, [coordinates, type]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map}>
        <Geojson geojson={myPlace} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
});

export default SeatMap;
