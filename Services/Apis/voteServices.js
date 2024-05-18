const url = "http://192.168.24.96:3000/collector/api/v1/vote";

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
