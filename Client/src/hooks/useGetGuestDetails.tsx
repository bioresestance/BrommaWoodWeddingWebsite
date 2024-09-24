import apiConfiguration from "../api/apiConfiguration";
import { GuestApi } from "../api/axios-client";
import { useQuery } from "@tanstack/react-query";

const api = new GuestApi(apiConfiguration);
export default function useGetGuestDetails() {
  const queryResult = useQuery({
    queryKey: ["GuestDetails"],
    queryFn: async () => {
      const response = await api.getGuestGuestDetailsGet();
      return response;
    },
  });
  return queryResult;
}
