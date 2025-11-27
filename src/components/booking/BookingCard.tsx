import { type FC } from "react";
import styles from "./BookingCard.module.scss";
import { Typography } from "shared/ui";
import { Trash2 } from "lucide-react";
import { useDeleteMyBookingMutation } from "api/booking/useMyBookings";

type Props = {
  room: string;
  date: string;
  row: number;
  seat: number;
  id: number;
};

export const BookingCard: FC<Props> = ({ room, date, row, seat, id }) => {
  const { mutate } = useDeleteMyBookingMutation();

  const handleDelete = () => {
    mutate({ booking_id: id });
  };

  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <Typography variant="bodyText" color="white">
          🏢Комната: {room}
        </Typography>
        <Typography variant="bodyText" color="white">
          💻Место: R{row} S{seat}
        </Typography>
        <Typography variant="bodyText" color="white">
          📆Дата: {date}
        </Typography>
      </div>
      <div className={styles.control} onClick={handleDelete}>
        <Trash2 />
      </div>
    </div>
  );
};
