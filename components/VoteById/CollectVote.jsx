import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import Animatedicon from "../common/Animatedicon";
import { Ionicons } from "@expo/vector-icons";
import CollectVoteTabs from "../CollectVote/CollectVoteTabs";
import { colors, color2 } from "../../utils/colorData";
import { parties } from "../../utils/tempData";
import React, { useState, useEffect } from "react";
import PartyCard from "../CollectVote/PartyCard";
import NoSelected from "../CollectVote/NoSelected";
import SingleSelected from "../CollectVote/SingleSelected";
import BulkSelected from "../CollectVote/BulkSelected";
import DetailedSelected from "../CollectVote/DetailedSelected";
import { useLocalSearchParams } from "expo-router";
import { useElectionSeatInfoById } from "../../Services/Query/electionSeatQuery";

const tabs = ["Quick Vote", "Bulk Votes", "Detailed Vote"];

const CollectVote = () => {
  const { id } = useLocalSearchParams();
  const { data, isError, error, isPending } = useElectionSeatInfoById(id);
  const [search, setSearch] = useState("");
  const [allParties, setAllParties] = useState([]);
  const [partiesData, setPartiesData] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedParties, setSelectedParties] = useState([]);

  useEffect(() => {
    if (search === "") {
      setPartiesData(allParties);
    } else {
      setPartiesData(
        allParties.filter(
          (party) =>
            party.name.toLowerCase().includes(search.toLowerCase()) ||
            party.shortName.toLowerCase().includes(search.toLowerCase()) ||
            party.symbol.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  useEffect(() => {
    if (data) {
      let partydata = [];
      data?.data?.parties.map((party) => {
        partydata.push(party.party);
      });
      setAllParties(partydata);
      setPartiesData(partydata);
    }
  }, [data]);

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
    setSelectedParty(null);
    setSelectedParties([]);
  };

  const handleSelect = (party) => {
    if (selectedParty === party || activeTab === tabs[1]) {
      setSelectedParty(null);
      return;
    }
    setSelectedParty(party);
  };

  const handleMultipleSelect = (party, action) => {
    if (action === "plus") {
      setSelectedParties((prevParties) => [...prevParties, party]);
    } else if (action === "minus") {
      setSelectedParties((prevParties) => {
        const index = prevParties.findIndex((p) => p._id === party._id);
        if (index !== -1) {
          return [
            ...prevParties.slice(0, index),
            ...prevParties.slice(index + 1),
          ];
        }
        return prevParties;
      });
    }
  };

  if (isPending) return <Text>Loading...</Text>;
  console.log("data---------------==========", data?.data?.seat);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <CollectVoteTabs
        activeTab={activeTab}
        handleChangeTab={handleChangeTab}
      />
      <View style={styles.input}>
        <Ionicons
          name="search"
          size={20}
          color={colors.danger}
          style={{ position: "absolute", right: 15, top: 15 }}
        />
        <TextInput
          placeholder="Search Party by Name or Symbol"
          value={search}
          onChangeText={setSearch}
          keyboardType="email-address"
          placeholderTextColor="#ccc"
          cursorColor={colors.primary}
          style={{ paddingRight: 25 }}
        />
      </View>
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
              onMultiSelect={handleMultipleSelect}
              activeTab={activeTab}
              bulk={activeTab === "Bulk Votes"}
            />
          )}
          keyExtractor={(item) => item.name}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {!selectedParty && (activeTab === tabs[0] || activeTab === tabs[2]) && (
        <NoSelected />
      )}
      {selectedParty && activeTab === tabs[0] && (
        <SingleSelected
          selectedParty={selectedParty}
          setSelectedParty={setSelectedParty}
        />
      )}
      {selectedParty && activeTab === tabs[2] && (
        <DetailedSelected
          selectedParty={selectedParty}
          setSelectedParty={setSelectedParty}
          tags={data?.data?.tags || []}
        />
      )}

      {activeTab === tabs[1] && selectedParties.length > 0 && (
        <BulkSelected
          selectedParties={selectedParties}
          setActiveTab={setActiveTab}
          setSelectedParties={setSelectedParties}
        />
      )}
      {activeTab === tabs[1] && selectedParties.length == 0 && (
        <NoSelected title="Add Votes" />
      )}
    </ScrollView>
  );
};

export default CollectVote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 10,
    // marginHorizontal: 15,
    backgroundColor: "white",
    color: "black",
  },
});
