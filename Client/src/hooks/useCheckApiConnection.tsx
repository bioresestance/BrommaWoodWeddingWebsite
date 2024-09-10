import { DefaultApi, Configuration } from "../api/axios-client";
import { useQuery } from "@tanstack/react-query";

const api = new DefaultApi();

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
