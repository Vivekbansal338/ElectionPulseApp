import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, color2 } from "../../../utils/colorData";

const AchievementsList = ({
  achievements,
  handleAddAchievement,
  setAchievements,
  tags,
}) => {
  const [newAchievement, setNewAchievement] = useState("");

  const filteredTags = tags
    .filter((tag) => !achievements.includes(tag))
    .sort((a, b) => {
      // Simple sorting based on alphabetical order in relation to newAchievement
      const aDistance = Math.abs(
        a.toLowerCase().indexOf(newAchievement.toLowerCase())
      );
      const bDistance = Math.abs(
        b.toLowerCase().indexOf(newAchievement.toLowerCase())
      );
      return aDistance - bDistance;
    });

  const handleAddAchievementLocal = () => {
    handleAddAchievement(newAchievement);
    setNewAchievement("");
  };

  const handleSelectTag = (tag) => {
    handleAddAchievement(tag);
  };

  const handleRemoveAchievement = (index) => {
    const newAchievements = [...achievements];
    newAchievements.splice(index, 1);
    setAchievements(newAchievements);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {achievements.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: color2.success,
              paddingHorizontal: 25,
              paddingVertical: 8,
              borderRadius: 20,
              margin: 5,
              marginVertical: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.listItem}>{item}</Text>
            <View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: -25,
                  top: -32,
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 5,
                  borderWidth: 1,
                  borderColor: color2.danger,
                }}
                onPress={() => handleRemoveAchievement(index)}
              >
                <Ionicons name="trash" size={16} color={color2.danger} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View
        style={[
          styles.inputContainer,
          {
            marginTop: 20,
            marginHorizontal: 10,
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
          onPress={handleAddAchievementLocal}
        >
          <Ionicons name="add-circle" size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 20,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {filteredTags.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: color2.primary,
              paddingHorizontal: 25,
              paddingVertical: 8,
              borderRadius: 20,
              margin: 8,
              marginVertical: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.listItem}>{item}</Text>
            <View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: -25,
                  top: -32,
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 5,
                  borderWidth: 1,
                  borderColor: color2.success,
                }}
                onPress={() => handleSelectTag(item)}
              >
                <Ionicons name="add" size={16} color={color2.success} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: 300,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },

  formContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "white",
    color: "black",
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
    color: "white", // Ensures text is visible against the primary color background
  },
});

export default AchievementsList;
