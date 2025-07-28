import { useQuery } from "@tanstack/react-query";
import { instance } from "./axiosInstance";

export const useWords = () => {
  console.log("Getting words");
  return useQuery({
    queryFn: () => instance.get("/words").then((res) => res.data),
    queryKey: ["words"],
    staleTime: 1000 * 60 * 5,
  });
};
