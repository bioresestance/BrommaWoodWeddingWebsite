import apiConfiguration from "../api/apiConfiguration";
import {
  GuestApi,
  GuestApiUpdateGuestGuestUpdatePostRequest,
  GuestDetailForm,
} from "../api/axios-client";
import { useMutation } from "@tanstack/react-query";

const api = new GuestApi(apiConfiguration);
export default function useUpdateGuestDetails() {
  const mutation = useMutation({
    mutationKey: ["LoginGuest"],
    mutationFn: async (guestDetails: GuestDetailForm) => {
      const data: GuestApiUpdateGuestGuestUpdatePostRequest = {
        guestDetailForm: guestDetails,
      };
      const response = await api.updateGuestGuestUpdatePost(data);
      return response;
    },
  });

  return mutation;
}
