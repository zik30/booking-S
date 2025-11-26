import { useMapQuery } from "api/map/useMapQuery";
import { FloatDetails } from "components/floatDeatails/FloatDetails";
import { SpacesCalendar } from "modules/spacesCalendar/SpacesCalendar";
import { SpacesMap } from "modules/spacesMap/SpacesMap";
import { useEffect, useRef, useState, type FC } from "react";
import { Loading } from "shared/ui/loading/Loading";

type SeatT = [number | null, number | null];

export const SilentSpacePage: FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [seat, setSeat] = useState<SeatT>([null, null]);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // форматирование даты (YYYY-MM-DD)
  const formattedDate = date ? date.toLocaleDateString("en-CA") : undefined;

  const { data, isLoading, error } = useMapQuery({
    room: "silent",
    date_: formattedDate,
  });

  useEffect(() => {
    setSeat([null, null]);
  }, [date, setDate]);

  useEffect(() => {
    if (data && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [data]);

  return (
    <div>
      <SpacesCalendar date={date} setDate={(val) => setDate(val)} />

      {data && (
        <div ref={mapRef}>
          <SpacesMap
            room="silent"
            map={data}
            seat={seat}
            setSeat={(val) => setSeat(val)}
            date={formattedDate}
          />
        </div>
      )}

      {isLoading && <Loading />}
      {error && <div>error... Please try again</div>}

      {seat[0] && (seat[1] || seat[1] == 0) && formattedDate && (
        <FloatDetails
          date={formattedDate}
          room="silent"
          row={seat[0]}
          seat={seat[1] + 1}
        />
      )}
    </div>
  );
};
