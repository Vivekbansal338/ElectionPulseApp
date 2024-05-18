import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import HomeHeader from "../../components/headers/HomeHeader";
import React, { useState, useEffect, useRef } from "react";
import { useElectionSeats } from "../../Services/Query/electionSeatQuery";
import ElectionCard from "../../components/Home/ElectionCard";
import { colors } from "../../utils/colorData";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import HomeNoData from "../../components/Home/HomeNoData";
// import ElectionCardSkeleton from "../../components/Skeletons/ElectionCardSkeleton";

const home = () => {
  const scrollViewRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [finalData, setFinalData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {
    data,
    isError,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useElectionSeats(activeTab);

  useEffect(() => {
    if (data) {
      const temp = data.pages.flatMap((page) => page.docs);
      setFinalData(temp);
    }
  }, [data]);

  useEffect(() => {
    setFinalData((prev) => prev.filter((item) => item.status === activeTab));
  }, [activeTab]);

  const onSwipeLeft = (gestureState) => {
    if (activeTab === "Upcoming") {
      setActiveTab("Ongoing");
      scrollViewRef.current?.scrollTo({ x: 100, animated: true });
    } else if (activeTab === "Ongoing") {
      setActiveTab("Completed");
      scrollViewRef.current?.scrollTo({ x: 200, animated: true });
    }
  };

  const onSwipeRight = (gestureState) => {
    if (activeTab === "Completed") {
      setActiveTab("Ongoing");
      scrollViewRef.current?.scrollTo({ x: 100, animated: true });
    } else if (activeTab === "Ongoing") {
      setActiveTab("Upcoming");
      scrollViewRef.current?.scrollTo({ x: 0, animated: true });
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <HomeHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scrollViewRef={scrollViewRef}
      />

      <GestureRecognizer
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={config}
        style={{
          flex: 1,
          padding: 8,
          backgroundColor: colors.secondary,
        }}
      >
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {
                setRefreshing(true);
                fetchNextPage().then(() => setRefreshing(false));
              }}
              tintColor={colors.primary}
            />
          }
          data={finalData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ElectionCard election={item} />}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                marginTop: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!isFetchingNextPage && !isPending && !isFetching && (
                <HomeNoData />
              )}
            </View>
          }
          ListFooterComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {(isFetchingNextPage || isPending || isFetching) && (
                // <ElectionCardSkeleton />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Loading...
                </Text>
              )}
            </View>
          }
        />
      </GestureRecognizer>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
