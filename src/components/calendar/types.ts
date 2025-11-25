export interface ICalendarProps {
  mode?: "single" | "range";
  date?: Date | null;
  setDate?: (date: Date) => void;
  startDate?: Date | null;
  finishDate?: Date | null;
  setStartDate?: (d: Date | null) => void;
  setFinishDate?: (d: Date | null) => void;
}
