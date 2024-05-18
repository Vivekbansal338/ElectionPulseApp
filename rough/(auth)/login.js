import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/Designer.png")}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Election Pulse</Text>
      </View>
      <View style={styles.authContainer}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.gradient}
        >
          <View style={styles.divider}>
            <Text style={styles.dividerText}>
              {showSignup ? "Sign Up" : "Login"}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {showSignup ? "Sign Up" : "Login"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleAuth}
            onPress={() => setShowSignup(!showSignup)}
          >
            <Text style={styles.toggleAuthText}>
              {showSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#3b5998",
  },
  description: {
    fontSize: 18,
    marginBottom: 5,
    color: "#555",
  },
  authContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  divider: {
    alignItems: "center",
    marginBottom: 20,
  },
  dividerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    // height: 50,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "white",
    color: "#333",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "#3b5998",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  toggleAuth: {
    marginTop: 10,
  },
  toggleAuthText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
