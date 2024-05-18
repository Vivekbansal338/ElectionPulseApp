import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import Divider from "../../components/common/Divider";
import { colors } from "../../utils/colorData";
import { useLogin } from "../../Services/Query/authQuery";
import { LoginRed } from "../../Store/Auth";
import { useDispatch } from "react-redux";
import { router } from "expo-router";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Login = () => {
  const {
    isPending: isLoginPending,
    mutate: loginMutate,
    isError: isLoginError,
    error: loginError,
  } = useLogin();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("juliette.brovfvfvfvwn@example.com");
  const [password, setPassword] = useState("Vivek123@");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a network request.
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLogin = () => {
    const formdata = {
      email,
      password,
      role: "Collector",
    };
    loginMutate(
      { data: formdata },
      {
        onSuccess: (data) => {
          console.log("login data", data);
          if (data.success === true) {
            if (data.data.verification === 0) {
              dispatch(
                LoginRed({
                  token: data.data.token,
                  userId: data.data.user.id,
                })
              );
              router.replace("/(auth)/verify");
            } else {
              dispatch(
                LoginRed({
                  token: data.data.token,
                  userId: data.data.user.id,
                })
              );
              router.replace("/(tabs)/home");
            }
          }
        },
      },
      {
        onError: (error) => {
          console.log("error", formdata, error);
        },
      }
    );
  };
  const handleSignup = () => {};

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        <Text style={styles.title}>Streamlining election insights</Text>
      </View>
      {/* <Divider text="Login" /> */}
      <View style={styles.authContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#ccc"
          cursorColor={colors.primary}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#ccc"
          cursorColor={colors.primary}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toggleAuth}
          onPress={() => router.push("/(auth)/forgotPassword")}
        >
          <Text style={styles.toggleAuthText}>
            Forgot Password? Click here to reset
          </Text>
        </TouchableOpacity>
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
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    marginHorizontal: 20,
    marginVertical: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.primary,
    textAlign: "center",
  },
  authContainer: {
    marginHorizontal: 20,
    marginVertical: 35,
    borderRadius: 10,
    overflow: "hidden",
  },

  input: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "white",
    color: "black",
  },
  button: {
    backgroundColor: colors.backbottom,
    paddingVertical: 12,
    borderRadius: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  toggleAuth: {
    marginTop: 10,
  },
  toggleAuthText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
});
