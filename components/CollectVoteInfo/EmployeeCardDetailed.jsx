import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, color2 } from "../../utils/colorData";
import { Ionicons } from "@expo/vector-icons";
import Animatedicon from "../common/Animatedicon";

const EmployeeCardDetailed = ({ candidate, isSelected, party }) => {
  const containerStyles = [
    styles.container,
    isSelected && styles.selectedContainer,
  ];
  const nameStyles = [styles.name, isSelected && styles.selectedName];
  const detailsTextStyles = [
    styles.detailsText,
    isSelected && styles.selectedDetailsText,
  ];

  if (!candidate)
    return (
      <View style={containerStyles}>
        <View style={styles.header}>
          <Text style={nameStyles}>{"Candidate Details"}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Animatedicon
            source={require("../../assets/icons/man.json")}
            width={100}
            height={100}
            autoPlay={true}
          />
          <View style={styles.header}>
            <Text style={nameStyles}>Select a party to see candidates</Text>
          </View>
        </View>
      </View>
    );

  return (
    <View style={containerStyles}>
      <View style={styles.header}>
        <Text style={nameStyles}>
          {"Candidate Details (" + party.shortName + ")"}
        </Text>
      </View>
      <View style={styles.header}>
        <Animatedicon
          source={require("../../assets/icons/man.json")}
          width={26}
          height={26}
          autoPlay={true}
        />
        <Text style={nameStyles}>{candidate.name}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons
              name="male-female-outline"
              size={16}
              color={color2.primary}
            />
            <Text style={detailsTextStyles}>Gender : </Text>
            <Text style={detailsTextStyles}>{candidate.gender}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons name="moon-outline" size={16} color={color2.help} />
            <Text style={detailsTextStyles}>Religion : </Text>
            <Text style={detailsTextStyles}>{candidate.religion}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons name="people-outline" size={16} color={color2.success} />
            <Text style={detailsTextStyles}>Category : </Text>
            <Text style={detailsTextStyles}>{candidate.category}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons name="ribbon-outline" size={16} color={color2.warning} />
            <Text style={detailsTextStyles}>Caste : </Text>
            <Text style={detailsTextStyles}>{candidate.caste}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    elevation: 1,
  },
  container2: {
    minHeight: 200,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    elevation: 1,
  },
  selectedContainer: {
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  selectedName: {
    color: "white",
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
  selectedDetailsText: {
    color: "white",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default EmployeeCardDetailed;
