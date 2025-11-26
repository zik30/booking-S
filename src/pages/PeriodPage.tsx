import { useMapQuery } from "api/map/useMapQuery";
import { FloatDetails } from "components/floatDeatails/FloatDetails";
import { PeriodCalendar } from "modules/periodCalendar/PeriodCalendar";
import { SpacesMap } from "modules/spacesMap/SpacesMap";
import { useEffect, useRef, useState, type FC } from "react";
import { Loading } from "shared/ui/loading/Loading";

type SeatT = [number | null, number | null];

export const PeriodPage: FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [room, setRoom] = useState<"open_space" | "silent">("open_space");
  const [seat, setSeat] = useState<SeatT>([null, null]);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error } = useMapQuery({
    room: room,
    date_: startDate?.toLocaleDateString("en-CA"),
  });

  useEffect(() => {
    setSeat([null, null]);
  }, [startDate, setStartDate]);

  useEffect(() => {
    if (data && mapRef.current && finishDate) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [data, finishDate]);
  return (
    <div>
      <PeriodCalendar
        room={room}
        setRoom={(val: "open_space" | "silent") => setRoom(val)}
        startDate={startDate}
        finishDate={finishDate}
        setStartDate={(val: Date | null) => setStartDate(val)}
        setFinishDate={(val: Date | null) => setFinishDate(val)}
      />
      {data && (
        <div ref={mapRef} style={{ width: "100%" }}>
          <SpacesMap
            room={room}
            map={data}
            seat={seat}
            setSeat={(val) => setSeat(val)}
            date={startDate?.toLocaleDateString("en-CA")}
          />
        </div>
      )}
      {isLoading && <Loading />}
      {error && <div>error... Please try again</div>}
      {seat[0] && (seat[1] == 0 || seat[1]) && startDate && finishDate && (
        <FloatDetails
          date={startDate.toLocaleDateString("en-CA")}
          finishDate={finishDate.toLocaleDateString("en-CA")}
          room={room}
          row={seat[0]}
          seat={seat[1] + 1}
        />
      )}
    </div>
  );
};
