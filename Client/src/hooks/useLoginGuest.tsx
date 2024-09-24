import apiConfiguration from "../api/apiConfiguration";
import {
  GuestApi,
  GuestApiLoginGuestLoginPostRequest,
} from "../api/axios-client";
import { useMutation } from "@tanstack/react-query";

const api = new GuestApi(apiConfiguration);
export default function useLoginGuest() {
  const mutation = useMutation({
    mutationKey: ["LoginGuest"],
    mutationFn: async (token: string) => {
      const data: GuestApiLoginGuestLoginPostRequest = {
        username: "guest",
        password: token,
      };
      const response = await api.loginGuestLoginPost(data);
      return response;
    },
  });
  return mutation;
}
