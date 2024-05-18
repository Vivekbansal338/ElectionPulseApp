import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, color2 } from "../../utils/colorData";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const EmployeeCard = ({ employee, isSelected, onSelect }) => {
  const handlePress = () => {
    onSelect(employee);
  };

  const containerStyles = [
    styles.container,
    isSelected && styles.selectedContainer,
  ];
  const nameStyles = [styles.name, isSelected && styles.selectedName];
  const detailsTextStyles = [
    styles.detailsText,
    isSelected && styles.selectedDetailsText,
  ];

  return (
    <TouchableOpacity onPress={handlePress} style={[containerStyles]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: employee.profileImage,
          }}
          placeholder={blurhash}
          contentFit="contain"
          transition={1000}
        />
      </View>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={nameStyles}>{employee.name}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons name="mail-outline" size={16} color={color2.primary} />
            <Text style={detailsTextStyles}>{employee.email}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Ionicons name="call-outline" size={16} color={color2.help} />
            <Text style={detailsTextStyles}>
              {employee.mobileNumber || "Unknown"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    backgroundColor: "white",
    borderRadius: 15,
    // padding: 16,
    marginVertical: 12,
    marginHorizontal: 4,
    elevation: 1,
    overflow: "hidden",
  },
  selectedContainer: {
    backgroundColor: colors.primary,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    marginBottom: 16,
    backgroundColor: colors.primary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  header: {
    paddingHorizontal: 16,
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
  details: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailsRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // marginRight: 16,
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: "white",
    marginLeft: 8,
    // textAlign: "right", // Add this line
    textAlign: "center",
  },
  selectedDetailsText: {
    color: "white",
    // textAlign: "right", // Add this line
    textAlign: "center",
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

export default EmployeeCard;
