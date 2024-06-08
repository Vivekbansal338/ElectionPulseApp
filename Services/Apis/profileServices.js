import { ipUrl } from "./index";
const url = `${ipUrl}/collector/api/v1/employee`;

export const getEmployeeProfile = async (token) => {
  const response = await fetch(`${url}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const result = await response.json();
  if (result.success === false) {
    throw new Error("Something went wrong! Please try again later.");
  }
  return result;
};
