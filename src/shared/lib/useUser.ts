import { create } from "zustand";

type UserProps = {
  user_id: number | null;
  setUserId: (id: number) => void;
};

export const useUser = create<UserProps>((set) => ({
  user_id: null,
  setUserId: (id) => set({ user_id: id }),
}));
