import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import Login from "./login";
import Signup from "./signup";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
