import type { FC } from "react";
import styles from "./Loading.module.scss";

export const Loading: FC = () => {
  return <div className={styles.loader} />;
};
