import { useQueryClient } from "@tanstack/react-query";

export default function useGetFetchQuery(key){
    const queryClient = useQueryClient();
    return queryClient.getQueryData(key);
}