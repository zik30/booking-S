import { SpacesMap } from "modules/spacesMap/SpacesMap";
import { useState, type FC } from "react";
import { Container, Typography } from "shared/ui";
import { ToggleSwitch } from "shared/ui/toggleSwitch/ToggleSwitch";
import styles from "./Permanent.module.scss";
import { useMapQuery } from "api/map/useMapQuery";
import { FloatDetails } from "components/floatDeatails/FloatDetails";

const spaces = [
  {
    label: "open space room",
    value: "open_space",
  },
  {
    label: "silent room",
    value: "silent",
  },
];

type SeatT = [number | null, number | null];

export const Permanent: FC = () => {
  const [selected, setSelected] = useState<"open_space" | "silent">(
    "open_space"
  );
  const [seat, setSeat] = useState<SeatT>([null, null]);
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-CA");

  const { data } = useMapQuery({
    room: selected,
    date_: formattedDate,
  });
  return (
    <section className={styles.permanent}>
      <Container className={styles.container}>
        <Typography
          variant="h2"
          align="center"
          color="white"
          weight="semiBold"
          transform="uppercase"
          className={styles.title}
        >
          🏢Выберите комнату
        </Typography>
        <ToggleSwitch
          options={spaces}
          selected={selected}
          setSelected={(val: string) =>
            setSelected(val as "open_space" | "silent")
          }
        />
        {data && (
          <SpacesMap
            room={selected}
            date={formattedDate}
            map={data}
            seat={seat}
            setSeat={(val) => setSeat(val)}
          />
        )}
        {seat[0] && (seat[1] == 0 || seat[1]) && formattedDate && (
          <FloatDetails room="open_space" row={seat[0]} seat={seat[1] + 1} />
        )}
      </Container>
    </section>
  );
};
