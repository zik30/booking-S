import type { ReactNode } from "react";

export type ButtonProps = {
  className?: string;
  variant: "primary" | "secondary";
  children: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullwidth?: boolean;
};
