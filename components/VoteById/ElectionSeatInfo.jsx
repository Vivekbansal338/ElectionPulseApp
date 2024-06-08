import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import TabButtons from "../common/TabButtons";
import { infoTabs as tabs } from "../../utils/headerData";
import { useLocalSearchParams } from "expo-router";
import { useElectionSeatInfoById } from "../../Services/Query/electionSeatQuery";
import PartyCard from "../CollectVote/PartyCard";
import EmployeeCardDetailed from "../CollectVoteInfo/EmployeeCardDetailed";
import EmployeeCard from "../CollectVoteInfo/EmployeeCard";
import SeatCard from "../CollectVoteInfo/SeatCard";
import SeatMap from "./SeatMap";

const ElectionSeatInfo = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const { id } = useLocalSearchParams();
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [employeesData, setEmployeesData] = useState([]);
  const [partiesData, setPartiesData] = useState([]);
  const [seatData, setSeatData] = useState({});
  const [candidateData, setCandidateData] = useState([]);

  const { data, isError, error, isPending } = useElectionSeatInfoById(id);

  useEffect(() => {
    if (data) {
      let partydata = [];
      let candidatedata = [];

      data?.data?.parties.map((party) => {
        partydata.push(party.party);
        candidatedata.push({
          ...party.candidate,
          partyId: party.party._id,
        });
      });
      setPartiesData(partydata);
      setCandidateData(candidatedata);
      setEmployeesData(data.data.employees);
      setSeatData(data.data.seat);
    }
  }, [data]);

  const handleSelect = (party) => {
    if (selectedParty === party) {
      setSelectedParty(null);
      setSelectedCandidate(null);
      return;
    }
    setSelectedParty(party);
    setSelectedCandidate(candidateData.find((c) => c.partyId === party._id));
  };

  if (isPending) return <Text>Loading...</Text>;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TabButtons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <SeatMap boundary={data?.data?.seat?.boundary} />
      <SeatCard seat={seatData} />
      <View style={styles.content}>
        <FlatList
          data={partiesData}
          horizontal={true}
          renderItem={({ item, index }) => (
            <PartyCard
              party={item}
              key={index}
              isSelected={selectedParty === item}
              onSelect={handleSelect}
            />
          )}
          keyExtractor={(item) => item.name}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.content}>
        <EmployeeCardDetailed
          candidate={selectedCandidate}
          isSelected={true}
          party={selectedParty}
        />
      </View>
      <View style={styles.content}>
        <FlatList
          data={employeesData}
          horizontal={true}
          renderItem={({ item, index }) => (
            <EmployeeCard
              employee={item}
              key={index}
              isSelected={false}
              onSelect={() => {}}
            />
          )}
          keyExtractor={(item) => item.name}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default ElectionSeatInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
