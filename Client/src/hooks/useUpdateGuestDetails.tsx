import apiConfiguration from "../api/apiConfiguration";
import {
  GuestApi,
  GuestApiUpdateGuestGuestUpdatePostRequest,
  GuestDetailForm,
} from "../api/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const api = new GuestApi(apiConfiguration);

export default function useUpdateGuestDetails(
  onErrorFn: (error: Error) => void | undefined = undefined
) {
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
      queryClient.setQueryData(["GuestDetails"], result);
    },
    onError: (error) => {
      if (onErrorFn) onErrorFn(error);
    },
  });

  return mutation;
}
