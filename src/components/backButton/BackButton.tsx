import { ArrowLeft } from "lucide-react";
import { Container, Typography } from "shared/ui";
import styles from "./BackButton.module.scss";
import { Link } from "react-router-dom";

export const BackButton = () => {
  return (
    <Link to={"/"}>
      <Container className={styles.wrapper}>
        <div className={styles.container}>
          <ArrowLeft />
          <Typography color="white" variant="h3">
            nav
          </Typography>
        </div>
      </Container>
    </Link>
  );
};
