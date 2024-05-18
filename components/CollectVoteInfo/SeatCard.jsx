import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, color2 } from "../../utils/colorData";
import { Ionicons } from "@expo/vector-icons";

const SeatCard = ({ seat }) => {
  const {
    name,
    state,
    status,
    seatType,
    reservedCategory,
    reservedGender,
    totalPopulation,
    populationByGender,
    populationByReligion,
    populationByCategory,
    populationByCaste,
  } = seat;

  console.log(seat);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.state}>{state}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons name="flag-outline" size={16} color={color2.primary} />
            <Text style={styles.detailsText}>{status}</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="clipboard-outline" size={16} color={color2.help} />
            <Text style={styles.detailsText}>{seatType}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons name="people-outline" size={16} color={color2.success} />
            <Text style={styles.detailsText}>
              {"Category : " + reservedCategory}
            </Text>
          </View>
          <View style={styles.badge}>
            <Ionicons
              name="male-female-outline"
              size={16}
              color={color2.warning}
            />
            <Text style={styles.detailsText}>{reservedGender}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons
              name="people-circle-outline"
              size={16}
              color={color2.danger}
            />
            <Text style={styles.detailsText}>
              {"Total Population : " +
                (totalPopulation !== undefined ? totalPopulation : "Unknown")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    marginVertical: 12,
    elevation: 1,
  },
  header: {
    flexDirection: "column",
    // alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginRight: 8,
  },
  state: {
    fontSize: 16,
    color: colors.secondary,
  },
  details: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: "white",
    marginLeft: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
});

export default SeatCard;
