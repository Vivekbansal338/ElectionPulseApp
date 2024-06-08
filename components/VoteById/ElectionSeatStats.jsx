import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useElectionSeatStatsById } from "../../Services/Query/electionSeatQuery";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { teamStats, individualStats } from "../../utils/headerData";
import StatsItem from "../CollectVoteStats/StatsItem";
import TabButtons from "../common/TabButtons";
import { statsTabs as tabs } from "../../utils/headerData";

const ElectionSeatStats = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const { id } = useLocalSearchParams();
  const { data, isError, error, isPending } = useElectionSeatStatsById(id);

  if (isPending) return <Text>Loading...</Text>;

  const updateStatsWithCounts = (data) => {
    const calculateTotalVotes = (votes) =>
      Object.values(votes).reduce((acc, curr) => acc + curr, 0);

    teamStats.forEach((stat) => {
      switch (stat.name) {
        case "Total Votes":
          stat.count = calculateTotalVotes(data.team);
          break;
        case "Detailed Votes":
          stat.count = data.team["Detailed"] || 0;
          break;
        case "Bulk Votes":
          stat.count = data.team["Bulk"] || 0;
          break;
        case "Quick Votes":
          stat.count = data.team["Quick"] || 0;
          break;
      }
    });

    individualStats.forEach((stat) => {
      switch (stat.name) {
        case "Total Votes":
          stat.count = calculateTotalVotes(data.individual);
          break;
        case "Detailed Votes":
          stat.count = data.individual["Detailed"] || 0;
          break;
        case "Bulk Votes":
          stat.count = data.individual["Bulk"] || 0;
          break;
        case "Quick Votes":
          stat.count = data.individual["Quick"] || 0;
          break;
      }
    });
  };

  if (data?.data) {
    updateStatsWithCounts(data.data);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <TabButtons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />

      {activeTab === "Team Stats" ? (
        <View style={styles.card}>
          {teamStats.map((stat, index) => (
            <StatsItem key={index} stat={stat} />
          ))}
        </View>
      ) : (
        <View style={styles.card}>
          {individualStats.map((stat, index) => (
            <StatsItem key={index} stat={stat} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ElectionSeatStats;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
