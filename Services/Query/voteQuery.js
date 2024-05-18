import { castVote } from "../Apis/voteServices";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

export const useCastVote = () => {
  const token = useSelector((state) => state.Auth.token);
  const { isPending, mutate, isError, error, isSuccess } = useMutation({
    mutationFn: ({ data }) => castVote(token, data),
  });
  return { isPending, mutate, isError, error, isSuccess };
};
