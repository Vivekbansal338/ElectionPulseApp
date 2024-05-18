const url = "http://192.168.24.96:3000/collector/api/v1/auth";

export const login = async (data) => {
  console.log(data);
  const response = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const sendVerifyOTP = async (token, data) => {
  console.log(data);
  const response = await fetch(`${url}/sendverifyotp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const submitVerifyOTP = async (token, data) => {
  console.log(data);
  const response = await fetch(`${url}/submitverifyotp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};
