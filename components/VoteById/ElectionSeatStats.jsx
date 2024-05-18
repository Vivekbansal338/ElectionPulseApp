import { StyleSheet, Text, View } from "react-native";
import { useElectionSeatStatsById } from "../../Services/Query/electionSeatQuery";
import { useLocalSearchParams } from "expo-router";
import React from "react";

// {"data": {"employeeCount": 2, "partyCount": 4, "totalVotesForSeat": 0,
// "voteTypeCounts": [], "voteTypeCountsByCollector": [],
// "votesForSeatByCollector": 0}, "success": true}

const ElectionSeatStats = () => {
  const { id } = useLocalSearchParams();
  const { data, isError, error, isPending } = useElectionSeatStatsById(id);

  if (isPending) return <Text>Loading...</Text>;

  console.log("stats", data);

  return (
    <View>
      <Text>ElectionSeatStats</Text>
    </View>
  );
};

export default ElectionSeatStats;

const styles = StyleSheet.create({});
