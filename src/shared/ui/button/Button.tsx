import classNames from "classnames";
import type { FC } from "react";
import styles from "./Button.module.scss";
import type { ButtonProps } from "./types";
import { Typography } from "../typography/Typography";

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  disabled,
  fullwidth = false,
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        fullwidth && styles.fullwidth
      )}
      onClick={onClick}
    >
      <Typography variant="bodyText" color="white" align="center">
        {children}
      </Typography>
    </button>
  );
};
