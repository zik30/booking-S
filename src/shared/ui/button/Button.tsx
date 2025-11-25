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
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        disabled && styles.disabled
      )}
      onClick={onClick}
    >
      <Typography variant="bodyText" color="white">
        {children}
      </Typography>
    </button>
  );
};
