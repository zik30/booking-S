import { type FC } from "react";
import type { SeatMapProps } from "./types";
import styles from "./SeatMap.module.scss";
import { Typography } from "shared/ui";
import { Laptop } from "lucide-react";
import classNames from "classnames";
import { InfoTooltip } from "components/infoTooltip/InfoTooltip";
import { letters } from "shared/consts/consts";

export const SeatMap: FC<SeatMapProps> = ({
  seats,
  selected,
  setSelected,
  space,
  date,
}) => {
  const maxRow = Math.max(...seats.map((s) => s.row));
  const maxSeat = Math.max(...seats.map((s) => s.seat));

  // Делаем быстрый доступ: seatsMap[row][seat] = state
  const seatsMap: Record<number, Record<number, string>> = {};
  seats.forEach(({ row, seat, state }) => {
    if (!seatsMap[row]) seatsMap[row] = {};
    seatsMap[row][seat] = state;
  });

  const handleSelect = (row: number, seatIndex: number, state: string) => {
    if (state == "free") setSelected([row, seatIndex]);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: maxSeat }, (_, i) => (
              <th key={i}>
                <div className={styles.cell}>
                  <Typography variant="h3" color="white" weight="semiBold">
                    S{maxSeat - i}
                  </Typography>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxRow }, (_, rowIndex) => {
            const row = rowIndex + 1;

            return (
              <tr key={row}>
                <td>
                  <Typography variant="h3" weight="semiBold" color="white">
                    Row {letters[row - 1]}
                  </Typography>
                </td>

                {Array.from({ length: maxSeat }, (_, i) => {
                  const seatIndex = maxSeat - 1 - i;
                  const seat = seatIndex + 1;
                  const state = seatsMap[row]?.[seat] ?? "-";

                  return (
                    <td
                      key={seat}
                      className={
                        state === "free"
                          ? styles.free
                          : state === "blocked"
                          ? styles.blocked
                          : state === "perm"
                          ? styles.perm
                          : state === "-"
                          ? styles.noSeat
                          : state == "permanent"
                          ? styles.free
                          : styles.taken
                      }
                      onClick={() => handleSelect(row, seatIndex, state)}
                    >
                      <div
                        className={classNames(
                          styles.cell,
                          styles.comp,
                          row == selected[0] && seatIndex == selected[1]
                            ? styles.selected
                            : ""
                        )}
                      >
                        <InfoTooltip
                          state={state}
                          room={space as "open_space" | "silent"}
                          row={row}
                          seat={seat}
                          date={date}
                        >
                          <Laptop size={28} strokeWidth={1.75} />
                        </InfoTooltip>
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.panel}>
        <Typography variant="h3" color="black" weight="semiBold">
          💻Выбранное место:
        </Typography>
        <Typography variant="bodyText" color="black">
          {selected[0] && (selected[1] == 0 || selected[1])
            ? `R${selected[0]} S${selected[1] + 1}`
            : "Not selected"}
        </Typography>
      </div>
    </>
  );
};
