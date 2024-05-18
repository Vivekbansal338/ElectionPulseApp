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

{
  /* <MapViewComponent /> */
}
{
  /* <View style={styles.container}>
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
      </View> */
}
