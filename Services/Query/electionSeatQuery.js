import {
  getElectionSeats,
  getElectionSeatInfoById,
  getElectionSeatStatsById,
} from "../../Services/Apis/electionSeatSerices.js";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useElectionSeats = (status) => {
  const token = useSelector((state) => state.Auth.token);
  const {
    data,
    isError,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["ElectionSeats", status],
    queryFn: ({ pageParam = 1 }) => getElectionSeats(token, status, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  console.log("----------------------", data);

  return {
    data,
    isError,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export const useElectionSeatInfoById = (id) => {
  const token = useSelector((state) => state.Auth.token);
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["ElectionSeatPartiesById", id],
    queryFn: () => getElectionSeatInfoById(token, id),
  });
  return {
    data,
    isError,
    error,
    isPending,
  };
};

export const useElectionSeatStatsById = (id) => {
  const token = useSelector((state) => state.Auth.token);
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["ElectionSeatStatsById", id],
    queryFn: () => getElectionSeatStatsById(token, id),
  });
  return {
    data,
    isError,
    error,
    isPending,
  };
};

// export const useSeatOverviewByElection = (id) => {
//   const token = useSelector((state) => state.auth.token);
//   const {
//     data,
//     isError,
//     error,
//     isPending,
//     isFetching,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["SeatOverviewByElection", id],
//     queryFn: ({ pageParam = 1 }) =>
//       getSeatOverviewByElection(token, id, pageParam),
//     getNextPageParam: (lastPage) => {
//       const { currentPage, totalPages } = lastPage;
//       return currentPage < totalPages ? currentPage + 1 : undefined;
//     },
//   });

//   return {
//     data,
//     isError,
//     error,
//     isPending,
//     isFetching,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   };
// };
