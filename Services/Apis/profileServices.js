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
  const result = await response.json();
  return result;
};
