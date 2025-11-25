import { useMutation } from "@tanstack/react-query";
import { $mainApi } from "shared/lib/requester";
import { useUser } from "shared/lib/useUser";

export const useBookSeatMutation = () => {
  const { user_id } = useUser();

  return useMutation({
    mutationKey: ["booking"],
    mutationFn: async ({
      room,
      row,
      seat,
      date_,
    }: {
      room: "open_space" | "silent";
      row: number;
      seat: number;
      date_: string; //"2025-11-25"
    }) => {
      const response = await $mainApi.post(
        "/booking/create",
        {},
        {
          params: {
            user_id,
            room,
            row,
            seat,
            date_,
          },
        }
      );
      return response.data;
    },
  });
};

export const useBookPermMutation = () => {
  const { user_id } = useUser();

  return useMutation({
    mutationKey: ["booking-permanent"],
    mutationFn: async ({
      room,
      row,
      seat,
    }: {
      room: "open_space" | "silent";
      row: number;
      seat: number;
    }) => {
      const response = await $mainApi.post(
        "/users/perm/request",
        {},
        {
          params: {
            user_id,
            room,
            row,
            seat,
          },
        }
      );
      return response.data;
    },
  });
};

export const useBookPeriodMutation = () => {
  const { user_id } = useUser();

  return useMutation({
    mutationKey: ["booking"],
    mutationFn: async ({
      room,
      row,
      seat,
      dates,
    }: {
      room: "open_space" | "silent";
      row: number;
      seat: number;
      dates: string[]; //"2025-11-25"
    }) => {
      const response = await $mainApi.post(
        "/booking/multi_create",
        {
          user_id,
          room,
          row,
          seat,
          dates,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      return response.data;
    },
  });
};
