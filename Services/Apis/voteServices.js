import { ipUrl } from "./index";
const url = `${ipUrl}/collector/api/v1/vote`;

export const castVote = async (token, data) => {
  console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
  const response = await fetch(`${url}/create`, {
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
