import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Link href="/(auth)/login">Login</Link>
      <Link href="/(tabs)/home">Tabs</Link>
      <Link href="/vote/123">votebyid</Link>
    </View>
  );
};

export default index;
