import { ipUrl } from "./index";
const url = `${ipUrl}/collector/api/v1/auth`;

export const login = async (data) => {
  const response = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const result = await response.json();
  if (result.success === false) {
    throw new Error("Something went wrong! Please try again later.");
  }
  return result.data;
};

export const sendVerifyOTP = async (token, data) => {
  const response = await fetch(`${url}/sendverifyotp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const result = await response.json();
  if (result.success === false) {
    throw new Error("Something went wrong! Please try again later.");
  }
  return result.data;
};

export const submitVerifyOTP = async (token, data) => {
  const response = await fetch(`${url}/submitverifyotp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const result = await response.json();
  if (result.success === false) {
    throw new Error("Something went wrong! Please try again later.");
  }
  return result.data;
};
