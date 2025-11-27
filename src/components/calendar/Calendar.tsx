import { Typography } from "shared/ui/typography/Typography";
import styles from "./Calendar.module.scss";
import { useState, type FC } from "react";
import type { ICalendarProps } from "./types";
import { daysOfWeek } from "shared/consts/consts";
import classNames from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar: FC<ICalendarProps> = ({
  date,
  setDate,
  startDate,
  setStartDate,
  finishDate,
  setFinishDate,
  mode = "single",
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lastDayOfLastMonth = new Date(year, month, 0).getDate();
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
  const nextMonthDaysToShow = totalCells - (firstDayOfMonth + daysInMonth);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSelect = (day: number, isDisabled: boolean) => {
    if (isDisabled) return;

    const clickedDate = new Date(year, month, day);

    if (mode === "single") {
      setDate?.(clickedDate);
    }

    if (mode === "range") {
      const noStart = !startDate;
      const noFinish = !finishDate;
      console.log(startDate);
      console.log(finishDate);

      if (noStart) {
        console.log(noStart);

        setStartDate?.(clickedDate);
        console.log(startDate);

        return;
      }

      if (startDate && noFinish) {
        if (clickedDate < startDate) {
          // выбрали дату раньше старта — начинаем заново
          setStartDate?.(clickedDate);
          setFinishDate?.(null);
        } else {
          setFinishDate?.(clickedDate);
          console.log(finishDate);
        }
        return;
      }

      // если период уже выбран — начать заново
      setStartDate?.(clickedDate);
      setFinishDate?.(null);
    }
  };

  return (
    <div className={classNames(styles.calendar)}>
      <div className={styles.calendarController}>
        <div className={styles.year}>
          <div className={styles.arrows} onClick={prevMonth}>
            <ChevronLeft color="var(--white)" />
          </div>
          <Typography variant="h3" color="white">
            {currentDate.toLocaleString("default", {
              year: "numeric",
              month: "short",
            })}
          </Typography>
          <div className={styles.arrows} onClick={nextMonth}>
            <ChevronRight color="var(--white)" />
          </div>
        </div>
      </div>

      <div className={styles.month}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.square}>
            <Typography variant="h3" weight="medium" color="white">
              {day}
            </Typography>
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => {
          const dayFromPrevMonth = lastDayOfLastMonth - firstDayOfMonth + i + 1;
          return (
            <div
              key={`prev-${i}`}
              className={classNames(styles.square, styles.inActive)}
            >
              <Typography color="grey" weight="regular" variant="bodyText">
                {dayFromPrevMonth}
              </Typography>
            </div>
          );
        })}
        {dates.map((day) => {
          const cellDate = new Date(year, month, day);
          cellDate.setHours(0, 0, 0, 0);

          const realToday = new Date();
          realToday.setHours(0, 0, 0, 0);

          // const isSelected = date?.toDateString() === cellDate.toDateString();

          const isToday = cellDate.toDateString() === realToday.toDateString();
          const isPast = cellDate < realToday;
          const weekDay = cellDate.getDay(); // 0 — Sun, 6 — Sat
          const isWeekend = weekDay === 0 || weekDay === 6;
          const isDisabled = isPast || isWeekend;
          const isSelectedSingle =
            mode === "single" &&
            date &&
            date.toDateString() === cellDate.toDateString();

          const isStart =
            mode === "range" &&
            startDate &&
            startDate.toDateString() === cellDate.toDateString();

          const isFinish =
            mode === "range" &&
            finishDate &&
            finishDate.toDateString() === cellDate.toDateString();

          const isInsideRange =
            mode === "range" &&
            startDate &&
            finishDate &&
            cellDate > startDate &&
            cellDate < finishDate &&
            !isWeekend;

          return (
            <div
              key={day}
              className={classNames(
                styles.square,
                !isDisabled && styles.currentMonth,
                isSelectedSingle && styles.selected,
                isStart && styles.rangeStart,
                isFinish && styles.rangeFinish,
                isInsideRange && styles.rangeBetween,
                isToday && styles.currentDate,
                styles.active
              )}
              onClick={() => handleSelect(day, isDisabled)}
            >
              <Typography
                className={styles.date}
                variant="bodyText"
                color={
                  isToday ? "black" : isPast || isWeekend ? "grey" : "white"
                }
              >
                {day}
              </Typography>
            </div>
          );
        })}
        {Array.from({ length: nextMonthDaysToShow }).map((_, i) => {
          return (
            <div
              key={`next-${i}`}
              className={classNames(styles.square, styles.inActive)}
            >
              <Typography color="grey" weight="medium" variant="bodyText">
                {i + 1}
              </Typography>
            </div>
          );
        })}
      </div>
      <div className={styles.bottomPanel}>
        <Typography variant="h3" color="black">
          Выбранная дата:
        </Typography>
        <Typography variant="h3" color="black" weight="semiBold">
          📆{" "}
          {date?.toLocaleString("default", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </Typography>
      </div>
    </div>
  );
};

export default Calendar;
