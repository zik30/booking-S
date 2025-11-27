import type { FC } from "react";
import styles from "./PeriodCalendar.module.scss";
import { Container, Typography } from "shared/ui";
import Calendar from "components/calendar/Calendar";
import { ToggleSwitch } from "shared/ui/toggleSwitch/ToggleSwitch";

type Props = {
  room: "open_space" | "silent";
  setRoom: (val: "open_space" | "silent") => void;
  startDate: Date | null;
  finishDate: Date | null;
  setStartDate: (val: Date | null) => void;
  setFinishDate: (val: Date | null) => void;
};
const options = [
  {
    label: "open space room",
    value: "open_space",
  },
  {
    label: "silent room",
    value: "silent",
  },
];

export const PeriodCalendar: FC<Props> = ({
  room,
  setRoom,
  startDate,
  finishDate,
  setStartDate,
  setFinishDate,
}) => {
  return (
    <section className={styles.wrapper}>
      <Container className={styles.container}>
        <div className={styles.text}>
          <Typography variant="h3" color="white">
            📆Выберите несколько дней
          </Typography>
          <Typography variant="h3" color="white">
            🏢Выберите комнату
          </Typography>
          <ToggleSwitch
            options={options}
            selected={room}
            setSelected={(val: string) =>
              setRoom(val as "open_space" | "silent")
            }
          />
        </div>
        <div className={styles.calendar}>
          <Calendar
            mode="range"
            startDate={startDate}
            setStartDate={(val: Date | null) => setStartDate(val)}
            finishDate={finishDate}
            setFinishDate={(val: Date | null) => setFinishDate(val)}
          />
        </div>
      </Container>
    </section>
  );
};
