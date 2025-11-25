export type Seat = {
  seat: number;
  row: number;
  state: string;
};

type SeatT = [number | null, number | null];

export interface SeatMapProps {
  seats: Seat[];
  selected: SeatT;
  setSelected: (val: SeatT) => void;
  space: string;
}
