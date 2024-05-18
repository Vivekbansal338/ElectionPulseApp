import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../utils/colorData";
import {
  useSendVerifyOTP,
  useSubmitVerifyOTP,
} from "../../Services/Query/authQuery";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const Verification = () => {
  const {
    isPending: isSendOtpPending,
    mutate: sendOtpMutate,
    isError: isSendOtpError,
    error: sendOtpError,
  } = useSendVerifyOTP();

  const {
    isPending: isSumbitOtpPending,
    mutate: submitOtpMutate,
    isError: isSubmitOtpError,
    error: submitOtpError,
  } = useSubmitVerifyOTP();

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (mobileNumber.length !== 10) {
      Toast.show({
        type: "error",
        text1: "Invalid mobile number",
      });
      return;
    }
    const formdata = {
      mobileNumber,
    };
    sendOtpMutate(
      { data: formdata },
      {
        onSuccess: (data) => {
          if (data.success === true) {
            setOtpSent(true);
            Toast.show({
              type: "success",
              text1: "OTP sent successfully.",
              text2: "Check your mobile and email",
            });
          }
        },
      },
      {
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  const handleSubmit = () => {
    if (mobileOtp.length !== 6 || emailOtp.length !== 6) {
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
      });
      return;
    }
    const formdata = {
      mobileOTP: mobileOtp,
      emailOTP: emailOtp,
    };

    submitOtpMutate(
      { data: formdata },
      {
        onSuccess: (data) => {
          if (data.success === true) {
            Toast.show({
              type: "success",
              text1: "Verification successful",
            });
            router.replace("/(tabs)/home");
          }
        },
      },
      {
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          {otpSent
            ? "Enter the OTPs sent to your mobile number and email"
            : "Enter your mobile number to receive OTP"}
        </Text>
        {!otpSent ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              placeholderTextColor="#ccc"
              cursorColor={colors.primary}
            />
            <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Mobile OTP"
              value={mobileOtp}
              onChangeText={setMobileOtp}
              keyboardType="number-pad"
              placeholderTextColor="#ccc"
              cursorColor={colors.primary}
            />
            <TextInput
              style={styles.input}
              placeholder="Email OTP"
              value={emailOtp}
              onChangeText={setEmailOtp}
              keyboardType="number-pad"
              placeholderTextColor="#ccc"
              cursorColor={colors.primary}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.primary,
  },
  card: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
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
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
