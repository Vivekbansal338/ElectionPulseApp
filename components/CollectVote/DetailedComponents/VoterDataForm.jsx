import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { gender, religion, category } from "../../../utils/HelperData";
import { colors } from "../../../utils/colorData";
import { Picker } from "@react-native-picker/picker";

const VoterDataForm = ({ voterData, handleVoterDataChange }) => {
  return (
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
        onChangeText={(value) => handleVoterDataChange(value, "age")}
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
      <DropdownField
        label="Religion(Optional)"
        selectedValue={voterData.religion}
        onValueChange={(value) => handleVoterDataChange(value, "religion")}
        items={religion}
      />
      <DropdownField
        label="Gender(Optional)"
        selectedValue={voterData.gender}
        onValueChange={(value) => handleVoterDataChange(value, "gender")}
        items={gender}
      />
      <DropdownField
        label="Category(Optional)"
        selectedValue={voterData.category}
        onValueChange={(value) => handleVoterDataChange(value, "category")}
        items={category}
      />
    </View>
  );
};

const DropdownField = ({ label, selectedValue, onValueChange, items }) => (
  <View>
    <Text style={styles.dropdownLabel}>{label}</Text>
    <View style={styles.picker}>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {items.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
    </View>
  </View>
);

const styles = StyleSheet.create({
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
  dropdownLabel: {
    marginLeft: 10,
    marginBottom: 5,
    color: "#ccc",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 15,
  },
});

export default VoterDataForm;
