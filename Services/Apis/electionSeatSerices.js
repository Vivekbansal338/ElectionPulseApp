import { ipUrl } from "./index";
const url = `${ipUrl}/collector/api/v1/electionseats`;

export const getElectionSeats = async (token, status, pageParam) => {
  const response = await fetch(`${url}?status=${status}&page=${pageParam}`, {
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

export const getElectionSeatInfoById = async (token, id) => {
  const response = await fetch(`${url}/info/${id}`, {
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

export const getElectionSeatStatsById = async (token, id) => {
  const response = await fetch(`${url}/stats/${id}`, {
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

export const getElectionSeatVoteLocationsById = async (token, id) => {
  const response = await fetch(`${url}/voteLocations/${id}`, {
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
