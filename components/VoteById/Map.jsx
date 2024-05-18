import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

const Map = () => {
  const locations = useSelector((state) => state.Location.locations);
  const mapRef = useRef(null);

  const coordinates = locations.map((location) => ({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  }));

  const clusteredCoordinates = coordinates.reduce((acc, curr) => {
    const lastCoord = acc[acc.length - 1];
    if (
      lastCoord &&
      lastCoord.latitude === curr.latitude &&
      lastCoord.longitude === curr.longitude
    ) {
      lastCoord.count = (lastCoord.count || 1) + 1;
    } else {
      acc.push({ ...curr, count: 1 });
    }
    return acc;
  }, []);

  useEffect(() => {
    if (mapRef.current && coordinates.length > 0) {
      const initRegion = {
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.current.animateToRegion(initRegion, 1000);
    }
  }, [coordinates]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map}>
        <Polyline
          coordinates={coordinates}
          strokeColor="#000"
          strokeWidth={3}
          lineDashPattern={[5, 5]}
        />
        {clusteredCoordinates.map((coord, index) => {
          if (index === clusteredCoordinates.length - 1) {
            // Show default marker at the last point
            return (
              <Marker
                key={index}
                coordinate={coord}
                title={`Location ${index + 1}`}
                description={`Count: ${coord.count || 1}`}
              />
            );
          } else {
            // Show custom marker with random value
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
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
