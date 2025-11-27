import { useEffect, type FC } from "react";
import styles from "./FloatDetails.module.scss";
import {
  useBookPeriodMutation,
  useBookPermMutation,
  useBookSeatMutation,
} from "api/booking/useBookSeat";
import { Typography } from "shared/ui";
import { Loading } from "shared/ui/loading/Loading";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

interface Props {
  date?: string;
  finishDate?: string;
  room: "open_space" | "silent";
  row: number;
  seat: number;
}
export const FloatDetails: FC<Props> = ({
  date,
  room,
  row,
  seat,
  finishDate,
}) => {
  const { mutate, isPending, isSuccess, error, reset } = useBookSeatMutation();
  const {
    mutate: bookPerm,
    isPending: isPendingPerm,
    isSuccess: isSuccessPerm,
    error: errorPerm,
    reset: resetPerm,
  } = useBookPermMutation();
  const {
    data: dataPeriod,
    mutate: bookPeriod,
    isPending: isPendingPeriod,
    isSuccess: isSuccessPeriod,
    error: errorPeriod,
    reset: resetPeriod,
  } = useBookPeriodMutation();

  const period = (startDate: Date, finishDate: Date): string[] => {
    const result: string[] = [];

    const current = new Date(startDate);
    current.setHours(0, 0, 0, 0);

    const end = new Date(finishDate);
    end.setHours(0, 0, 0, 0);

    while (current <= end) {
      const day = current.getDay(); // 0=Sun, 6=Sat
      const isWeekend = day === 0 || day === 6;

      if (!isWeekend) {
        result.push(new Date(current).toISOString().split("T")[0]);
      }

      current.setDate(current.getDate() + 1);
    }

    return result;
  };

  const dates =
    date && finishDate && period(new Date(date), new Date(finishDate));

  const handleClick = () => {
    if (date && finishDate && dates) {
      bookPeriod({ room, row, seat, dates });
    } else if (date) {
      mutate({ room, row, seat, date_: date });
    } else {
      bookPerm({ room, row, seat });
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    reset();
    resetPerm();
    resetPeriod();
  }, [date, row, seat]);

  useEffect(() => {
    if (isSuccess || isSuccessPeriod) {
      const t = setTimeout(() => {
        navigate("/my-bookings");
      }, 3000);

      return () => clearTimeout(t);
    }
    if (isSuccessPerm) {
      const t = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(t);
    }
  }, [isSuccess, navigate, isSuccessPeriod, isSuccessPerm]);

  return (
    <div
      className={classNames(
        styles.container,
        isSuccess || isSuccessPerm ? styles.success : ""
      )}
      onClick={handleClick}
    >
      {!isPending && !isSuccess && !error && (
        <>
          {date && (
            <Typography variant="bodyText" color="white">
              📆Дата: {date} {finishDate ? " - " + finishDate : ""}
            </Typography>
          )}

          <Typography variant="bodyText" color="white">
            {" "}
            🏢Комната: {room}
          </Typography>
          <Typography variant="bodyText" color="white">
            💻Ряд: {row}
          </Typography>

          <Typography variant="bodyText" color="white">
            💻Место: {seat}
          </Typography>
        </>
      )}

      {(isPending || isPendingPerm || isPendingPeriod) && <Loading />}

      {(error || errorPerm || errorPeriod) && (
        <Typography variant="bodyText" color="white">
          {error?.message || errorPerm?.message || dataPeriod}
        </Typography>
      )}

      {isSuccess && (
        <Typography variant="bodyText" color="white">
          💻Место забронировано!
        </Typography>
      )}
      {isSuccessPerm && (
        <Typography variant="bodyText" color="white">
          🔒Запрос на постоянное бронирование отправлен!
        </Typography>
      )}
      {isSuccessPeriod && (
        <Typography variant="bodyText" color="white">
          💻Место забронировано на несколько дней!
        </Typography>
      )}
    </div>
  );
};
