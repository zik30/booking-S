import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { USER_ID } from "shared/consts/consts";
import { $mainApi } from "shared/lib/requester";

export type Seat = {
  id: number;
  user_id: number;
  room: string;
  seat: number;
  row: number;
  state: string;
  date: string;
};

export const useMyBookingsQuery = () => {
  return useQuery<Seat[]>({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const response = await $mainApi.get<Seat[]>("/booking/my", {
        params: {
          user_id: USER_ID,
        },
      });
      return response.data;
    },
  });
};

export const useDeleteMyBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-my-bookings"],
    mutationFn: async ({ booking_id }: { booking_id: number }) => {
      const response = await $mainApi.delete("/booking/cancel", {
        params: {
          booking_id,
          user_id: USER_ID,
        },
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      // ✅ обновляем кэш, чтобы карточка исчезла сразу
      queryClient.setQueryData(["my-bookings"], (oldData: any) =>
        oldData?.filter((booking: any) => booking.id !== variables.booking_id)
      );
    },
  });
};

export const useDeleteAllMyBookingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-all-my-bookings"],
    mutationFn: async () => {
      const response = await $mainApi.delete("/booking/cancel_all", {
        params: {
          user_id: USER_ID,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // ✅ обновляем кэш, чтобы карточка исчезла сразу
      queryClient.setQueryData(["my-bookings"], (oldData: any) => []);
    },
  });
};
