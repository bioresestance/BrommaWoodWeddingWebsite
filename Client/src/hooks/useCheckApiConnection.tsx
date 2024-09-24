import apiConfiguration from "../api/apiConfiguration";
import { DefaultApi } from "../api/axios-client";
import { useQuery } from "@tanstack/react-query";

const api = new DefaultApi(apiConfiguration);

export default function useCheckApiConnection() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["root"],
    queryFn: async () => {
      const response = await api.readRootGet();
      return response;
    },
  });

  return { data, error, isLoading };
}
