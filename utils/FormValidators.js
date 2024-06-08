export function validateLoginFormData(formData) {
  const { email, password } = formData;
  if (!email || !password) {
    return {
      valid: false,
      message: "Email and password cannot be empty",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      message: "Invalid email",
    };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters",
    };
  }

  return {
    valid: true,
    data: formData,
  };
}

export function validateForgotPasswordFormData(formData) {
  const { email } = formData;
  if (!email) {
    return {
      valid: false,
      message: "Email cannot be empty",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      message: "Invalid email",
    };
  }

  return {
    valid: true,
    data: formData,
  };
}

export function validateResetPasswordFormData(formData) {
  const { emailOTP, newPassword } = formData;
  if (!emailOTP || !newPassword) {
    return {
      valid: false,
      message: "Email OTP and new password cannot be empty",
    };
  }

  if (newPassword.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters",
    };
  }

  return {
    valid: true,
    data: formData,
  };
}

export function validateSendVerifyFormData(formData) {
  const { mobileNumber } = formData;
  if (!mobileNumber) {
    return {
      valid: false,
      message: "Mobile number cannot be empty",
    };
  }

  if (mobileNumber.length !== 10) {
    return {
      valid: false,
      message: "Invalid mobile number",
    };
  }

  return {
    valid: true,
    data: formData,
  };
}

export function validateVerifyOTPFormData(formData) {
  const { mobileOTP, emailOTP } = formData;
  if (!mobileOTP || !emailOTP) {
    return {
      valid: false,
      message: "Mobile OTP and email OTP cannot be empty",
    };
  }

  return {
    valid: true,
    data: formData,
  };
}
