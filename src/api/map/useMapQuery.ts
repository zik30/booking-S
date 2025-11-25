import { useQuery } from "@tanstack/react-query";
import { $mainApi } from "shared/lib/requester";

export type Seat = {
  seat: number;
  row: number;
  state: string;
};

export const useMapQuery = ({
  room,
  date_,
}: {
  room: "open_space" | "silent";
  date_?: string; //"2025-11-25"
}) => {
  return useQuery<Seat[]>({
    queryKey: ["map", room, date_],
    queryFn: async () => {
      const response = await $mainApi.get<Seat[]>("/booking/seatmap", {
        params: {
          room,
          date_,
        },
      });
      return response.data;
    },
    enabled: Boolean(date_),
  });
};
