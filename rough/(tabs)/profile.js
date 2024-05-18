import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import MapViewComponent from "../../components/common/MapViewComponent";
import React from "react";

const Profile = () => {
  const locations = useSelector((state) => state.Location.locations);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <MapViewComponent />
      {/* <View style={styles.container}>
        <Text style={styles.title}>Locations</Text>
        {locations.map((location, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Location {index + 1}</Text>
            <View style={styles.cardDetails}>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Latitude:</Text>
                <Text style={styles.detailsValue}>
                  {location.coords.latitude}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Longitude:</Text>
                <Text style={styles.detailsValue}>
                  {location.coords.longitude}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Accuracy:</Text>
                <Text style={styles.detailsValue}>
                  {location.coords.accuracy}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Altitude:</Text>
                <Text style={styles.detailsValue}>
                  {location.coords.altitude}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Heading:</Text>
                <Text style={styles.detailsValue}>
                  {location.coords.heading}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Speed:</Text>
                <Text style={styles.detailsValue}>{location.coords.speed}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Timestamp:</Text>
                <Text style={styles.detailsValue}>
                  {formatTimestamp(location.timestamp)}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Mocked:</Text>
                <Text style={styles.detailsValue}>
                  {location.mocked ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View> */}
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
