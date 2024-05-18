import { getEmployeeProfile } from "../Apis/profileServices";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeeProfile = () => {
  const token = useSelector((state) => state.Auth.token);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myprofile"],
    queryFn: () => getEmployeeProfile(token),
  });
  return { data, isLoading, isError, error };
};
