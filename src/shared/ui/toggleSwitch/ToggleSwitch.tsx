import styles from "./ToggleSwitch.module.scss";
import type { ToggleSwitchProps } from "./types";
import { Typography } from "../typography/Typography";
import classNames from "classnames";
import type { FC } from "react";

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  options,
  selected,
  setSelected,
}) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(
          styles.btn,
          selected == options[0].value ? styles.selected : ""
        )}
        onClick={() => setSelected(options[0].value)}
      >
        <Typography
          variant="h3"
          weight="semiBold"
          align="center"
          color={selected == options[0].value ? "white" : "black"}
        >
          {options[0].label}
        </Typography>
      </div>
      <div
        className={classNames(
          styles.btn,
          selected == options[1].value ? styles.selected : ""
        )}
        onClick={() => setSelected(options[1].value)}
      >
        <Typography
          variant="h3"
          weight="semiBold"
          align="center"
          color={selected == options[1].value ? "white" : "black"}
        >
          {options[1].label}
        </Typography>
      </div>
    </div>
  );
};
