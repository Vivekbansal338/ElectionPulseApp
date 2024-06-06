import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import React from "react";
import Animatedicon from "../../components/common/Animatedicon";
import { colors } from "../../utils/colorData";
import { useSelector } from "react-redux";

const _layout = () => {
  const votes = useSelector((state) => state.VoteCart);
  const count =
    votes.votesWithLocation.length + votes.votesWithoutLocation.length;
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          paddingBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          // header: () => <HomeHeader />,
          tabBarIcon: ({ focused }) => (
            <Animatedicon
              source={require("../../assets/icons/home.json")}
              width={24}
              height={24}
              autoPlay={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="voteCart"
        options={{
          title: "Vote Cart",
          headerShown: false,
          // header: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <View>
              <Animatedicon
                source={require("../../assets/icons/vote-elections.json")}
                width={24}
                height={24}
                autoPlay={focused}
              />
              {count > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: -11,
                    width: 16,
                    height: 16,
                    backgroundColor: colors.primary,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 10 }}>
                    {count > 9 ? "9+" : count}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          // header: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <Animatedicon
              source={require("../../assets/icons/man.json")}
              width={24}
              height={24}
              autoPlay={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
