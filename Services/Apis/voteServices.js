import { ipUrl } from "./index";
const url = `${ipUrl}/collector/api/v1/vote`;

export const castVote = async (token, data) => {
  const response = await fetch(`${url}/create`, {
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
  return result;
};
