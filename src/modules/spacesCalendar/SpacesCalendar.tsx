import Calendar from "components/calendar/Calendar";
import { type FC } from "react";
import { Container, Typography } from "shared/ui";
import styles from "./SpacesCalendar.module.scss";
import { useLocation } from "react-router-dom";

interface PlacesCalProps {
  date: Date | null;
  setDate: (val: Date) => void;
}

export const SpacesCalendar: FC<PlacesCalProps> = ({ date, setDate }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  console.log(pathnames);

  return (
    <section className={styles.spaces}>
      <Container className={styles.container}>
        <Typography
          className={styles.title}
          variant="h1"
          color="white"
          weight="semiBold"
        >
          {pathnames[0]}
        </Typography>
        <Typography className={styles.subtitle} variant="h3" color="white">
          📆Выберите дату
        </Typography>
        <div className={styles.calendarContainer}>
          <Calendar date={date} setDate={(val) => setDate(val)} />
        </div>
      </Container>
    </section>
  );
};
