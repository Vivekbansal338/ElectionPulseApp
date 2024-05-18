const url = "http://192.168.24.96:3000/collector/api/v1/electionseats";

export const getElectionSeats = async (token, status, pageParam) => {
  console.log("----------------", status, pageParam);
  const response = await fetch(`${url}?status=${status}&page=${pageParam}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const getElectionSeatInfoById = async (token, id) => {
  const response = await fetch(`${url}/info/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const getElectionSeatStatsById = async (token, id) => {
  const response = await fetch(`${url}/stats/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};
