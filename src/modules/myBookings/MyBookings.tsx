import { useState, type FC } from "react";
import { Button, Container, Typography } from "shared/ui";
import styles from "./MyBookings.module.scss";
import { ToggleSwitch } from "shared/ui/toggleSwitch/ToggleSwitch";
import {
  useDeleteAllMyBookingsMutation,
  useMyBookingsQuery,
} from "api/booking/useMyBookings";
import { BookingCard } from "components/booking/BookingCard";
import { Loading } from "shared/ui/loading/Loading";

const options = [
  {
    label: "open space room",
    value: "open space room",
  },
  {
    label: "silent room",
    value: "silent room",
  },
];

export const MyBookings: FC = () => {
  const [selected, setSelected] = useState("open space room");
  const { data, isPending, error } = useMyBookingsQuery();
  const { mutate } = useDeleteAllMyBookingsMutation();

  const handleClear = () => {
    mutate();
  };
  return (
    <section className={styles.wrapper}>
      <Container>
        <div className={styles.panel}>
          <Typography
            variant="h2"
            weight="semiBold"
            align="center"
            color="white"
          >
            My Bookings
          </Typography>
          <ToggleSwitch
            options={options}
            selected={selected}
            setSelected={(val) => setSelected(val)}
          />
          <Button variant="secondary" onClick={handleClear}>
            cancel all
          </Button>
        </div>
        <div className={styles.cards}>
          {data && data.filter((item) => item.room == selected).length > 0 ? (
            data
              .filter((item) => item.room == selected)
              .map((item) => (
                <BookingCard
                  room={item.room}
                  row={item.row}
                  seat={item.seat}
                  id={item.id}
                  date={item.date}
                />
              ))
          ) : (
            <div className={styles.noBookings}>
              <Typography variant="h2" weight="semiBold" color="white">
                No Bookings Yet!
              </Typography>
            </div>
          )}
          {isPending && <Loading />}
          {error && (
            <Typography variant="bodyText" weight="semiBold" color="white">
              {error.message}
            </Typography>
          )}
        </div>
      </Container>
    </section>
  );
};
