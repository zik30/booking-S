import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $mainApi } from "shared/lib/requester";
import { useUser } from "shared/lib/useUser";

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
  const { user_id } = useUser();

  return useQuery<Seat[]>({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const response = await $mainApi.get<Seat[]>("/booking/my", {
        params: {
          user_id,
        },
      });
      return response.data;
    },
  });
};

export const useDeleteMyBookingMutation = () => {
  const { user_id } = useUser();

  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-my-bookings"],
    mutationFn: async ({ booking_id }: { booking_id: number }) => {
      const response = await $mainApi.delete("/booking/cancel", {
        params: {
          booking_id,
          user_id,
        },
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      // ✅ обновляем кэш, чтобы карточка исчезла сразу
      queryClient.setQueryData(["my-bookings"], (oldData: Seat[]) =>
        oldData?.filter((booking: Seat) => booking.id !== variables.booking_id)
      );
    },
  });
};

export const useDeleteAllMyBookingsMutation = () => {
  const { user_id } = useUser();

  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-all-my-bookings"],
    mutationFn: async () => {
      const response = await $mainApi.delete("/booking/cancel_all", {
        params: {
          user_id,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // ✅ обновляем кэш, чтобы карточка исчезла сразу
      queryClient.setQueryData(["my-bookings"], () => []);
    },
  });
};
