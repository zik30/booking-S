export type ButtonProps = {
  className?: string;
  variant: "primary" | "secondary";
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  fullwidth?: boolean;
};
