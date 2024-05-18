import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, color2 } from "../../utils/colorData";
import { Ionicons } from "@expo/vector-icons";

const PartyCard = ({
  party,
  isSelected,
  onSelect,
  onMultiSelect,
  activeTab,
  bulk = false,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [activeTab]);

  const handlePress = () => {
    onSelect(party);
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    onMultiSelect(party, "plus");
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
      onMultiSelect(party, "minus");
    }
  };

  const containerStyles = [
    styles.container,
    isSelected && styles.selectedContainer,
  ];
  const nameStyles = [styles.name, isSelected && styles.selectedName];
  const shortNameStyles = [
    styles.shortName,
    isSelected && styles.selectedShortName,
  ];
  const detailsTextStyles = [
    styles.detailsText,
    isSelected && styles.selectedDetailsText,
  ];

  return (
    <TouchableOpacity onPress={handlePress} style={containerStyles}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={nameStyles}>{party.name}</Text>
          <Text style={shortNameStyles}>{party.shortName}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={color2.primary}
            />
            <Text style={detailsTextStyles}>{party.founded || "N/A"}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons name="globe-outline" size={16} color={color2.help} />
            <Text style={detailsTextStyles}>{party.area}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons
              name="checkmark-circle-outline"
              size={16}
              color={color2.success}
            />
            <Text style={detailsTextStyles}>{party.status}</Text>
          </View>
        </View>
      </View>
      {bulk && (
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={[styles.counterButton, styles.decrementButton]}
            onPress={handleDecrement}
          >
            <Ionicons name="remove" size={24} color={color2.danger} />
          </TouchableOpacity>
          <Text style={styles.counterText}>{count}</Text>
          <TouchableOpacity
            style={[styles.counterButton, styles.incrementButton]}
            onPress={handleIncrement}
          >
            <Ionicons name="add" size={24} color={color2.success} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 4,
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
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  selectedName: {
    color: "white",
  },
  shortName: {
    fontSize: 16,
    color: colors.secondary,
  },
  selectedShortName: {
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
  counterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  counterButton: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  decrementButton: {
    marginRight: 8,
  },
  incrementButton: {
    marginLeft: 8,
  },
  counterButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  counterText: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default PartyCard;
