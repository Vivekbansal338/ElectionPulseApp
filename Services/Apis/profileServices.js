const url = "http://192.168.24.96:3000/collector/api/v1/employee";

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
