import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/headers/Header";
import Animatedicon from "../../components/common/Animatedicon";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: () => <Header />,
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
          header: () => <Header />,
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
          header: () => <Header />,
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
