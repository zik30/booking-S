import styles from "./ToolTip.module.scss";
import { type FC } from "react";
import type { ToolTipProps } from "./types";
import { Typography } from "../typography/Typography";

export const ToolTip: FC<ToolTipProps> = ({ children, label }) => {
  return (
    <div className={styles.wrapper}>
      {children}
      <div className={styles.tooltip}>
        {typeof label === "string" ? (
          <Typography variant="smallText" color="white">
            {label}
          </Typography>
        ) : (
          label
        )}
      </div>
    </div>
  );
};
