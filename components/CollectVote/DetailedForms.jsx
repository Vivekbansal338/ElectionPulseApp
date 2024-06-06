import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, color2 } from "../../utils/colorData";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import { gender, religion, category } from "../../utils/HelperData.js";
import VoteSubmitModal from "./VoteSubmitModal";
import Toast from "react-native-toast-message";

const DetailedForm = ({
  activeTab,
  setActiveTab,
  handleNextPrevious,
  selectedParty,
  setSelectedParty,
}) => {
  const { id } = useLocalSearchParams();
  const myId = useSelector((state) => state.Auth.userId);

  const [voterData, setVoterData] = useState({
    name: "",
    age: "",
    religion: religion[0],
    gender: gender[0],
    category: category[0],
    caste: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const [achievements, setAchievements] = useState([]);
  const [issues, setIssues] = useState([]);
  const [newAchievement, setNewAchievement] = useState("");
  const [newIssue, setNewIssue] = useState("");
  const [otherData, setOtherData] = useState({});

  const nextPreviousClick = (type) => {
    if (activeTab === "Voter Data") {
      if (voterData.age !== "" && voterData.age < 18) {
        Toast.show({
          text1: "Invalid Age",
          text2: "Age should be greater than 18.",
          type: "error",
        });
        return;
      }
    }
    handleNextPrevious(type);
  };

  const checkLocationPermissionAndStatus = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          text1: "Location Permission Denied",
          text2: "Please grant location permission to submit your vote.",
          type: "error",
        });
        return;
      }
      const locationStatus = await Location.getProviderStatusAsync();
      console.log("Location Services Status:", locationStatus);
      if (!locationStatus.locationServicesEnabled) {
        Toast.show({
          text1: "Location Services Disabled",
          text2: "Please enable location services to submit your vote.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error checking location permission and status:", error);
    }
  };

  const handleVoterDataChange = (value, field) => {
    setVoterData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim() !== "") {
      const formattedAchievement = newAchievement
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .replace(/[^\w\s]/gi, "");
      setAchievements((prevAchievements) => [
        ...prevAchievements,
        formattedAchievement,
      ]);
      setNewAchievement("");
    }
  };

  const handleAddIssue = () => {
    if (newIssue.trim() !== "") {
      const formattedIssue = newIssue
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .replace(/[^\w\s]/gi, "");
      setIssues((prevIssues) => [...prevIssues, formattedIssue]);
      setNewIssue("");
    }
  };

  const handleSubmit = async (party) => {
    setOtherData({
      voterData: {
        ...voterData,
        name: voterData.name === "" ? "Unknown" : voterData.name,
        age: voterData.age === "" ? 18 : voterData.age,
        caste: voterData.caste === "" ? "Unknown" : voterData.caste,
      },
      achievements: achievements,
      issues: issues,
    });
    await checkLocationPermissionAndStatus();
    setModalVisible(true);
  };

  const submitDone = () => {
    setSelectedParty(null);
    setVoterData({});
  };

  const renderVoterDataForm = () => (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name(Optional)"
        value={voterData.name}
        onChangeText={(value) => handleVoterDataChange(value, "name")}
        placeholderTextColor="#ccc"
        cursorColor={colors.primary}
      />
      <TextInput
        style={styles.input}
        placeholder="Age(Optional)"
        value={voterData.age}
        onChangeText={(value) => {
          handleVoterDataChange(value, "age");
        }}
        keyboardType="numeric"
        placeholderTextColor="#ccc"
        cursorColor={colors.primary}
      />
      <TextInput
        style={styles.input}
        placeholder="Caste(Optional)"
        value={voterData.caste}
        onChangeText={(value) => handleVoterDataChange(value, "caste")}
        placeholderTextColor="#ccc"
        cursorColor={colors.primary}
      />
      <View>
        <Text style={{ marginLeft: 10, marginBottom: 5, color: "#ccc" }}>
          Religion(Optional)
        </Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={voterData.religion}
            onValueChange={(value) => handleVoterDataChange(value, "religion")}
          >
            {religion.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        <Text style={{ marginLeft: 10, marginBottom: 5, color: "#ccc" }}>
          Gender(Optional)
        </Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={voterData.gender}
            onValueChange={(value) => handleVoterDataChange(value, "gender")}
          >
            {gender.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>

      <View>
        <Text style={{ marginLeft: 10, marginBottom: 5, color: "#ccc" }}>
          Category(Optional)
        </Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={voterData.category}
            onValueChange={(value) => handleVoterDataChange(value, "category")}
          >
            {category.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );

  const renderAchievementsList = () => (
    <View style={styles.formContainer}>
      <FlatList
        horizontal={true}
        data={achievements}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <View
            style={[
              styles.inputContainer,
              {
                marginTop: 50,
                alignItems: "center",
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Add Achievement"
              value={newAchievement}
              onChangeText={setNewAchievement}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddAchievement}
            >
              <Ionicons name="add-circle" size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );

  const renderIssuesList = () => (
    <View style={styles.formContainer}>
      <FlatList
        data={issues}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add Issue"
              value={newIssue}
              onChangeText={setNewIssue}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddIssue}>
              <Ionicons name="add-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );

  const renderSubmitButton = () => (
    <TouchableOpacity
      style={styles.submitButton}
      onPress={() => handleSubmit(selectedParty)}
    >
      <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {activeTab === "Voter Data" && renderVoterDataForm()}
      {activeTab === "Achievements" && renderAchievementsList()}
      {activeTab === "Issues" && renderIssuesList()}
      {activeTab === "Submit" && renderSubmitButton()}
      <View style={styles.buttoncontainer}>
        {activeTab !== "Voter Data" && (
          <TouchableOpacity
            style={[
              styles.typeButton,
              {
                marginRight: "auto",
              },
            ]}
            onPress={() => nextPreviousClick("previous")}
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={color2.danger}
            />
            <Text style={styles.activetypeText}>Previous</Text>
          </TouchableOpacity>
        )}

        {activeTab !== "Submit" && (
          <TouchableOpacity
            style={[
              styles.typeButton,
              {
                marginLeft: "auto",
              },
            ]}
            onPress={() => nextPreviousClick("next")}
          >
            <Text style={styles.activetypeText}>Next</Text>
            <Ionicons
              name="arrow-forward-outline"
              size={24}
              color={color2.success}
            />
          </TouchableOpacity>
        )}
      </View>
      <VoteSubmitModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        partyData={selectedParty._id}
        otherData={otherData}
        submitDone={submitDone}
        type="Detailed"
      />
    </View>
  );
};

export default DetailedForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: 300,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
  },
  formContainer: {
    padding: 16,
  },
  input: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "white",
    color: "black",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 15,
  },
  pickerItem: {
    // color: "red",
    // backgroundColor: "yellow",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    marginLeft: 8,
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
    // width: "auto",
  },
  typeButton: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 115,
    padding: 8,
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  activetypeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 10,
    margin: 16,
    marginTop: 30,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
