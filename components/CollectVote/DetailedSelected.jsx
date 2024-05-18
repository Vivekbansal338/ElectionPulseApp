import { StyleSheet, Text, View } from "react-native";
import DetailedForms from "./DetailedForms";
import DetailedTabs from "./DetailedTabs";
import React, { useState } from "react";
import { detailedTabs as tabs } from "../../utils/headerData";

const DetailedSelected = ({ selectedParty, setSelectedParty }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleNextPrevious = (type) => {
    const currentIndex = tabs.findIndex((tab) => tab.name === activeTab);
    if (type === "next") {
      if (currentIndex === tabs.length - 1) {
        setActiveTab(tabs[0].name);
      } else {
        setActiveTab(tabs[currentIndex + 1].name);
      }
    } else {
      if (currentIndex === 0) {
        setActiveTab(tabs[tabs.length - 1].name);
      } else {
        setActiveTab(tabs[currentIndex - 1].name);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <DetailedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <DetailedForms
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedParty={selectedParty}
        setSelectedParty={setSelectedParty}
        handleNextPrevious={handleNextPrevious}
      />
    </View>
  );
};

export default DetailedSelected;

const styles = StyleSheet.create({});
