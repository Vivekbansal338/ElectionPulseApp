import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../utils/colorData";
import {
  useSendVerifyOTP,
  useSubmitVerifyOTP,
} from "../../Services/Query/authQuery";
import {
  validateSendVerifyFormData,
  validateVerifyOTPFormData,
} from "../../utils/FormValidators";
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
    let formdata = {
      mobileNumber,
    };
    const result = validateSendVerifyFormData(formdata);
    if (!result.valid) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: result.message,
      });
    }
    formdata = result.data;

    sendOtpMutate(
      { data: formdata },
      {
        onSuccess: () => {
          setOtpSent(true);
          Toast.show({
            type: "success",
            text1: "OTP sent successfully.",
            text2: "Check your mobile and email",
          });
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message,
          });
        },
      }
    );
  };

  const handleSubmit = () => {
    let formdata = {
      mobileOTP: mobileOtp,
      emailOTP: emailOtp,
    };
    const result = validateVerifyOTPFormData(formdata);
    if (!result.valid) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: result.message,
      });
    }
    formdata = result.data;

    submitOtpMutate(
      { data: formdata },
      {
        onSuccess: (data) => {
          Toast.show({
            type: "success",
            text1: "Verification successful",
          });
          router.replace("/(tabs)/home");
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message,
          });
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
            <TouchableOpacity
              style={styles.button}
              onPress={handleSendOtp}
              disabled={isSendOtpPending}
            >
              {isSendOtpPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Send OTP</Text>
              )}
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
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSumbitOtpPending}
            >
              {isSumbitOtpPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Submit</Text>
              )}
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
