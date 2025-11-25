import { SeatMap } from "components/seatMap/SeatMap";
import type { FC } from "react";
import type { Seat } from "components/seatMap/types";
import { Container, Typography } from "shared/ui";
import styles from "./SpacesMap.module.scss";
import { useLocation } from "react-router-dom";

type SeatT = [number | null, number | null];
interface SpacesMapProps {
  seat: SeatT;
  setSeat: (val: SeatT) => void;
  map: Seat[];
}

// const map: Seat[] = [
//   {
//     row: 3,
//     seat: 4,
//     state: "free",
//   },
//   {
//     row: 4,
//     seat: 3,
//     state: "free",
//   },
//   {
//     row: 3,
//     seat: 1,
//     state: "free",
//   },
//   {
//     row: 5,
//     seat: 4,
//     state: "free",
//   },
//   {
//     row: 5,
//     seat: 1,
//     state: "free",
//   },
//   {
//     row: 9,
//     seat: 2,
//     state: "free",
//   },
//   {
//     row: 8,
//     seat: 3,
//     state: "free",
//   },
//   {
//     row: 2,
//     seat: 2,
//     state: "free",
//   },
//   {
//     row: 2,
//     seat: 5,
//     state: "free",
//   },
//   {
//     row: 1,
//     seat: 3,
//     state: "free",
//   },
//   {
//     row: 7,
//     seat: 4,
//     state: "perm",
//   },
//   {
//     row: 6,
//     seat: 2,
//     state: "free",
//   },
//   {
//     row: 7,
//     seat: 1,
//     state: "free",
//   },
//   {
//     row: 6,
//     seat: 5,
//     state: "free",
//   },
//   {
//     row: 4,
//     seat: 2,
//     state: "free",
//   },
//   {
//     row: 4,
//     seat: 5,
//     state: "free",
//   },
//   {
//     row: 3,
//     seat: 3,
//     state: "free",
//   },
//   {
//     row: 5,
//     seat: 3,
//     state: "free",
//   },
//   {
//     row: 8,
//     seat: 2,
//     state: "free",
//   },
//   {
//     row: 9,
//     seat: 1,
//     state: "free",
//   },
//   {
//     row: 8,
//     seat: 5,
//     state: "free",
//   },
//   {
//     row: 2,
//     seat: 4,
//     state: "free",
//   },
//   {
//     row: 1,
//     seat: 2,
//     state: "free",
//   },
//   {
//     row: 2,
//     seat: 1,
//     state: "free",
//   },
//   {
//     row: 1,
//     seat: 5,
//     state: "free",
//   },
//   {
//     row: 6,
//     seat: 1,
//     state: "blocked",
//   },
//   {
//     row: 6,
//     seat: 4,
//     state: "free",
//   },
//   {
//     row: 7,
//     seat: 3,
//     state: "free",
//   },
//   {
//     row: 3,
//     seat: 2,
//     state: "free",
//   },
//   {
//     row: 4,
//     seat: 1,
//     state: "free",
//   },
//   {
//     row: 3,
//     seat: 5,
//     state: "free",
//   },
//   {
//     row: 5,
//     seat: 2,
//     state: "free",
//   },
//   {
//     row: 4,
//     seat: 4,
//     state: "free",
//   },
//   {
//     row: 8,
//     seat: 4,
//     state: "free",
//   },
//   {
//     row: 8,
//     seat: 1,
//     state: "free",
//   },
//   {
//     row: 1,
//     seat: 1,
//     state: "free",
//   },
//   {
//     row: 1,
//     seat: 4,
//     state: "free",
//   },
//   {
//     row: 2,
//     seat: 3,
//     state: "free",
//   },
//   {
//     row: 7,
//     seat: 2,
//     state: "free",
//   },
//   {
//     row: 6,
//     seat: 3,
//     state: "free",
//   },
// ];
export const SpacesMap: FC<SpacesMapProps> = ({ seat, setSeat, map }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <section className={styles.map}>
      <Container className={styles.container}>
        <Typography variant="h3" color="white">
          Choose a seat in {pathnames[0]} room
        </Typography>
        <SeatMap
          seats={map}
          selected={seat}
          setSelected={(val) => setSeat(val)}
          space={pathnames[0]}
        />
      </Container>
    </section>
  );
};
