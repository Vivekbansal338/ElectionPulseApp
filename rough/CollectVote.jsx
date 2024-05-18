// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import CollectVoteTabs from "../CollectVote/CollectVoteTabs";
// import { colors, color2 } from "../../utils/colorData";
// import { parties } from "../../utils/tempData";
// import React, { useState } from "react";
// import PartyCard from "../CollectVote/PartyCard";

// const tabs = ["Quick Vote", "Bulk Votes", "Detailed Vote"];

// const CollectVote = () => {
//   const [activeTab, setActiveTab] = useState(tabs[0]);
//   const [selectedParty, setSelectedParty] = useState(null);

//   const handleSelect = (party) => {
//     setSelectedParty(party);
//   };

//   return (
//     <View style={styles.container}>
//       <CollectVoteTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//       <View style={styles.content}>
//         <FlatList
//           data={parties}
//           renderItem={({ item, index }) => (
//             <PartyCard
//               party={item}
//               key={index}
//               isSelected={selectedParty === item}
//               onSelect={handleSelect}
//             />
//           )}
//           keyExtractor={(item) => item.name}
//           style={styles.list}
//           showsVerticalScrollIndicator={false}
//         />
//         <View style={styles.rightpart}></View>
//       </View>
//     </View>
//   );
// };

// export default CollectVote;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 5,
//   },
//   content: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   list: {
//     flex: 1,
//   },
//   rightpart: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CollectVoteTabs from "../CollectVote/CollectVoteTabs";
import { colors, color2 } from "../../utils/colorData";
import { parties } from "../../utils/tempData";
import PartyCard from "../CollectVote/PartyCard";

const tabs = ["Quick Vote", "Bulk Votes", "Detailed Vote"];

const CollectVote = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [voterName, setVoterName] = useState("");
  const [voterAge, setVoterAge] = useState("");

  const handleSelect = (party) => {
    setSelectedParty(party);
    setVoterName("");
    setVoterAge("");
  };

  const handleVote = () => {
    // Handle vote submission logic here
    console.log(
      "Voted for",
      selectedParty.name,
      "by",
      voterName,
      "aged",
      voterAge
    );
  };

  const voteForm = selectedParty ? (
    <View style={styles.voteForm}>
      <Text style={styles.formLabel}>Voter Name:</Text>
      <TextInput
        style={styles.input}
        value={voterName}
        onChangeText={setVoterName}
        placeholder="Enter your name"
      />
      <Text style={styles.formLabel}>Voter Age:</Text>
      <TextInput
        style={styles.input}
        value={voterAge}
        onChangeText={setVoterAge}
        placeholder="Enter your age"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.voteButton} onPress={handleVote}>
        <Text style={styles.voteButtonText}>Vote</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>Select a party to vote</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CollectVoteTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <View style={styles.content}>
        <View style={styles.list}>
          {parties.map((party, index) => (
            <PartyCard
              party={party}
              key={index}
              isSelected={selectedParty === party}
              onSelect={handleSelect}
            />
          ))}
        </View>
        <View style={styles.rightpart}>{voteForm}</View>
      </View>
    </View>
  );
};

export default CollectVote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  list: {
    flex: 1,
  },
  rightpart: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  voteForm: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  voteButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 4,
  },
  voteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.secondary,
  },
});
