import type { FC, ReactNode } from "react";
import styles from "./Floating.module.scss";

export type Props = {
  children: ReactNode;
};

export const Floating: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
