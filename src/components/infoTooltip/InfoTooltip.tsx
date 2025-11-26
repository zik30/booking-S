import styles from "./InfoTooltip.module.scss";
import { type FC } from "react";
import { Typography } from "shared/ui/typography/Typography";
import type { ReactNode } from "react";
import { useReportMutation, useUserInfoQuery } from "api/users/useUserInfo";
import { Loading } from "shared/ui/loading/Loading";
import { Button } from "shared/ui";

type ToolTipProps = {
  children: ReactNode;
  room: "open_space" | "silent";
  row: number;
  seat: number;
  date: string | undefined;
  state: string;
};

export const InfoTooltip: FC<ToolTipProps> = ({
  children,
  room,
  row,
  seat,
  date,
  state,
}) => {
  const shouldFetch = state != "free" && state != "blocked" && state != "-";
  const { data, isPending, error } = useUserInfoQuery(
    {
      room,
      row,
      seat,
      date_: date,
    },
    {
      enabled: shouldFetch, // 👈 Запрос выполнится только если место занято
    }
  );
  const {
    mutate,
    isPending: isPendingReport,
    isSuccess: isSuccessReport,
    error: errorReport,
  } = useReportMutation();

  const handleReport = () => {
    if (!date) {
      return;
    }
    mutate({ room, row, seat, date_: date });
  };
  return (
    <div className={styles.wrapper}>
      {children}
      <div className={styles.tooltip}>
        {data ? (
          <>
            <Typography variant="bodyText" color="white" weight="semiBold">
              {data.full_name}
            </Typography>
            <Typography variant="bodyText" color="white">
              {data.position}
            </Typography>
            <Typography variant="bodyText" color="white">
              {data.phone}
            </Typography>
            <Button variant="primary" onClick={handleReport}>
              {isSuccessReport ? (
                "Report is sent"
              ) : errorReport ? (
                "Send report again"
              ) : isPendingReport ? (
                <Loading />
              ) : (
                "Report"
              )}
            </Button>
          </>
        ) : (
          <Typography variant="bodyText" color="white" weight="semiBold">
            {state}
          </Typography>
        )}
        {isPending && shouldFetch && <Loading />}
        {error && (
          <Typography variant="bodyText" color="white" weight="semiBold">
            Seat is not booked
          </Typography>
        )}
      </div>
    </div>
  );
};
