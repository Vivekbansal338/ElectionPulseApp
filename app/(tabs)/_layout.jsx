import { Tabs } from "expo-router";
import React from "react";
import Header from "../../components/headers/Header";
import HomeHeader from "../../components/headers/HomeHeader";
import Animatedicon from "../../components/common/Animatedicon";

const _layout = () => {
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
            <Animatedicon
              source={require("../../assets/icons/vote-elections.json")}
              width={24}
              height={24}
              autoPlay={focused}
            />
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
