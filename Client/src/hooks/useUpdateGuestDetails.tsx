import apiConfiguration from "../api/apiConfiguration";
import {
  GuestApi,
  GuestApiUpdateGuestGuestUpdatePostRequest,
  GuestDetailForm,
} from "../api/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const api = new GuestApi(apiConfiguration);

export default function useUpdateGuestDetails() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (guestDetails: GuestDetailForm) => {
      const data: GuestApiUpdateGuestGuestUpdatePostRequest = {
        guestDetailForm: guestDetails,
      };
      const response = await api.updateGuestGuestUpdatePost(data);
      return response;
    },
    onSuccess: (result) => {
      console.log(result.data);
      queryClient.setQueryData(["GuestDetails"], result);
    },
  });

  return mutation;
}
