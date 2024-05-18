import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import VoteByIdHeader from "../../components/headers/VoteByIdHeader";
import { getVoteHeaderData } from "../../utils/headerData";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import Map from "../../components/VoteById/Map";
import CollectVote from "../../components/VoteById/CollectVote";
import ElectionSeatChats from "../../components/VoteById/ElectionSeatChats";
import ElectionSeatInfo from "../../components/VoteById/ElectionSeatInfo";
import ElectionSeatStats from "../../components/VoteById/ElectionSeatStats";

const VoteById = () => {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("Vote");
  const scrollViewRef = useRef(null);
  const renderActiveTab = () => {
    switch (activeTab) {
      case "Vote":
        return <CollectVote />;
      case "Info":
        return <ElectionSeatInfo />;
      case "Stats":
        return <ElectionSeatStats />;
      case "Chats":
        return <ElectionSeatChats />;
      case "Map":
        return <Map />;
      default:
        return null;
    }
  };

  const handleTabPress = (tab) => {
    scrollViewRef.current.scrollTo({
      x: getVoteHeaderData(tab).scrollx,
      y: 0,
    });
    setActiveTab(tab);
  };

  const onSwipeLeft = (currentTab) => {
    // console.log("------->");
    // if (currentTab === "Map" || currentTab === "Vote") return;
    // const nextTab = getVoteHeaderData(currentTab).next;
    // setActiveTab(nextTab);
    // scrollViewRef.current?.scrollTo({
    //   x: getVoteHeaderData(nextTab).scrollx,
    //   animated: true,
    // });
  };

  const onSwipeRight = (currentTab) => {
    // if (currentTab === "Map" || currentTab === "Vote") return;
    // const prevTab = getVoteHeaderData(currentTab).prev;
    // setActiveTab(prevTab);
    // scrollViewRef.current?.scrollTo({
    //   x: getVoteHeaderData(prevTab).scrollx,
    //   animated: true,
    // });
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 150,
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <VoteByIdHeader
        scrollViewRef={scrollViewRef}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleTabPress={handleTabPress}
      />
      <GestureRecognizer
        onSwipeLeft={() => onSwipeLeft(activeTab)}
        onSwipeRight={() => onSwipeRight(activeTab)}
        config={config}
        style={{
          flex: 1,
        }}
      >
        {renderActiveTab()}
      </GestureRecognizer>
    </View>
  );
};

export default VoteById;

const styles = StyleSheet.create({});
