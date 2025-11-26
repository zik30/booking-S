import { useMutation, useQuery } from "@tanstack/react-query";
import { $mainApi } from "shared/lib/requester";
import { useUser } from "shared/lib/useUser";

type User = {
  booking_end: string;
  booking_start: string;
  full_name: string;
  is_permanent: boolean;
  phone: string;
  position: string;
  user_id: number;
};

type MyUser = {
  user_id: number;
  phone: string;
  team_id: number;
  status: string;
  first_name: string;
  last_name: string;
  name: string;
  position: string;
};

export const useUserInfoQuery = (
  {
    room,
    row,
    seat,
    date_,
  }: {
    room: "open_space" | "silent";
    row: number;
    seat: number;
    date_?: string; //"2025-11-25"
  },
  options?: { enabled?: boolean }
) => {
  return useQuery<User>({
    queryKey: ["user", room, date_, row, seat],
    queryFn: async () => {
      const response = await $mainApi.get<User>("/booking/owner", {
        params: {
          room,
          row,
          seat,
          date_,
        },
      });
      return response.data;
    },
    enabled: options?.enabled,
  });
};

export const useReportMutation = () => {
  const { user_id } = useUser();

  return useMutation({
    mutationKey: ["report"],
    mutationFn: async ({
      room,
      row,
      seat,
      date_,
    }: {
      room: "open_space" | "silent";
      row: number;
      seat: number;
      date_: string;
    }) => {
      const response = await $mainApi.post(
        "/users/report",
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
      return response;
    },
  });
};

export const useMeQuery = () => {
  const { user_id } = useUser();
  return useQuery<MyUser>({
    queryKey: ["my-user"],
    queryFn: async () => {
      const response = await $mainApi.get<MyUser>("/users/me", {
        params: {
          user_id,
        },
      });
      return response.data;
    },
  });
};
