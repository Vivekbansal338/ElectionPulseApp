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
  validateForgotPasswordFormData,
  validateResetPasswordFormData,
} from "../../utils/FormValidators";
import Toast from "react-native-toast-message";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    let formData = {
      email,
    };
    const result = validateForgotPasswordFormData(formData);
    if (!result.valid) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: result.message,
      });
    }
    formData = result.data;
    setOtpSent(true);
  };

  const handleResetPassword = () => {
    let formdata = {
      emailOTP: emailOtp,
      newPassword,
    };
    const result = validateResetPasswordFormData(formdata);
    if (!result.valid) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: result.message,
      });
    }
    formdata = result.data;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          {otpSent
            ? "Enter the OTP sent to your email and your new password"
            : "Enter your email address to receive OTP"}
        </Text>
        {!otpSent ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
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
              placeholder="Email OTP"
              value={emailOtp}
              onChangeText={setEmailOtp}
              keyboardType="number-pad"
              placeholderTextColor="#ccc"
              cursorColor={colors.primary}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholderTextColor="#ccc"
              cursorColor={colors.primary}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ForgotPassword;

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
