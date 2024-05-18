import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colorData";
import { router } from "expo-router";
const getStatusData = (status) => {
  switch (status) {
    case "Upcoming":
      return {
        color: colors.upcoming,
        icon: "calendar-outline",
      };
    case "Ongoing":
      return {
        color: colors.ongoing,
        icon: "refresh-circle-outline",
      };
    case "Completed":
      return {
        color: colors.completed,
        icon: "checkmark-circle-outline",
      };
    default:
      return { color: colors.primary, icon: "alert-circle-outline" };
  }
};

const DateFormat = (date) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const ElectionCard = ({ election }) => {
  const statusData = getStatusData(election.status);

  const handleNavigation = () => {
    // if (election.status === "Ongoing") {
    router.push(`/vote/${election._id}`);
    // }
    return;
  };

  return (
    <Pressable
      onPress={() => {
        handleNavigation();
      }}
      style={[
        styles.container,
        {
          shadowColor: getStatusData(election.status).color,
          borderColor: getStatusData(election.status).color,
        },
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.title2]}>{election.election.name}</Text>
          <Text style={styles.title}>{election.seat.name}</Text>
          <Text style={styles.subtitle}>
            {election.seat.state} - {election.seat.seatType}
          </Text>
          <Text style={styles.subtitle}>
            Category - {election.seat.reservedCategory}
          </Text>
        </View>
        <Ionicons name={statusData.icon} size={24} color={statusData.color} />
      </View>

      <View style={styles.countContainer}>
        <View style={styles.countRow}>
          <Text style={styles.countLabel}>Employee Count</Text>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: getStatusData(election.status).color,
              },
            ]}
          >
            <Text style={styles.badgeText}>{election.employees.length}</Text>
          </View>
        </View>
        <View style={styles.countRow}>
          <Text style={styles.countLabel}>Party Count</Text>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: getStatusData(election.status).color,
              },
            ]}
          >
            <Text style={styles.badgeText}>{election.parties.length}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.secondary,
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            },
          ]}
        >
          <Ionicons
            name={getStatusData(election.status).icon}
            size={16}
            color={getStatusData(election.status).color}
          />
          <Text style={styles.badgeText}>{election.status}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
            <Text style={styles.badgeText}>
              {DateFormat(election.election.startDate)}
            </Text>
          </View>
          <Text style={styles.subtitle}>to</Text>
          <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
            <Text style={styles.badgeText}>
              {DateFormat(election.election.endDate)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
export default ElectionCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    borderWidth: 0.5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title2: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.secondary,
  },
  countContainer: {
    marginBottom: 16,
  },
  countRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  countLabel: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
  },
  countNote: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
});
