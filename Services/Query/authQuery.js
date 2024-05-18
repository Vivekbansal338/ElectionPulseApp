import { login, sendVerifyOTP, submitVerifyOTP } from "../Apis/authServices";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: ({ data }) => login(data),
  });
  return { isPending, mutate, isError, error };
};

export const useSendVerifyOTP = () => {
  const token = useSelector((state) => state.Auth.token);
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: ({ data }) => sendVerifyOTP(token, data),
  });
  return { isPending, mutate, isError, error };
};

export const useSubmitVerifyOTP = () => {
  const token = useSelector((state) => state.Auth.token);
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: ({ data }) => submitVerifyOTP(token, data),
  });
  return { isPending, mutate, isError, error };
};
