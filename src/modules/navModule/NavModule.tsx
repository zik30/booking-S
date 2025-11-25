import type { FC } from "react";
import { Link } from "react-router-dom";
import { paths } from "shared/consts/consts";
import { Button, Container } from "shared/ui";
import styles from "./NavModule.module.scss";

export const NavModule: FC = () => {
  return (
    <section className={styles.wrapper}>
      <Container>
        <nav>
          <Link to={paths.openSpace}>
            <Button variant="secondary" fullwidth>
              Open-space
            </Button>
          </Link>
          <Link to={paths.silentSpace}>
            <Button variant="secondary" fullwidth>
              Silent-space
            </Button>
          </Link>
          <Link to={paths.myBookings}>
            <Button variant="secondary" fullwidth>
              My Bookings
            </Button>
          </Link>
          <Link to={paths.period}>
            <Button variant="secondary" fullwidth>
              Multi booking
            </Button>
          </Link>
          <Link to={paths.permanent}>
            <Button variant="secondary" fullwidth>
              Permanent booking
            </Button>
          </Link>
        </nav>
      </Container>
    </section>
  );
};
