import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import { LapInfo } from "../types/lapInfo";
import { Driver } from "../types/driver";
import { Position } from "../types/position";
import { Weather } from "../types/weather";
import { RaceInfo } from "../types/raceInfo";
import { SessionInfo } from "../types/session";

const useSessionInfo = () => {
  const [
    driverQuery,
    positionQuery,
    weatherQuery,
    lapsQuery,
    raceQuery,
    sessionQuery,
  ] = useQueries({
    queries: [
      {
        queryKey: ["driver"],
        refetchInterval: 1000,
        queryFn: () =>
          axios
            .get<Driver[]>(
              "https://api.openf1.org/v1/drivers?session_key=latest"
            )
            .then((res) => res.data),
      },
      {
        queryKey: ["position"],
        refetchInterval: 1000,
        queryFn: () =>
          axios
            .get<Position[]>(
              "https://api.openf1.org/v1/position?session_key=latest"
            )
            .then((res) => res.data),
      },
      {
        queryKey: ["weather"],
        refetchInterval: 20000,
        queryFn: () =>
          axios
            .get<Weather[]>(
              "https://api.openf1.org/v1/weather?session_key=latest"
            )
            .then((res) => res.data),
      },
      {
        queryKey: ["laps"],
        refetchInterval: 1000,
        queryFn: () =>
          axios
            .get<LapInfo[]>("https://api.openf1.org/v1/laps?session_key=latest")
            .then((res) => res.data),
      },
      {
        queryKey: ["race"],
        refetchInterval: 1000,
        queryFn: () =>
          axios
            .get<RaceInfo[]>(
              "https://api.openf1.org/v1/race_control?session_key=latest"
            )
            .then((res) => res.data),
      },
      {
        queryKey: ["session"],
        refetchInterval: 200,
        queryFn: () =>
          axios
            .get<SessionInfo[]>(
              "https://api.openf1.org/v1/sessions?session_key=latest"
            )
            .then((res) => res.data),
      },
    ],
  });

  if (driverQuery.isLoading) return "Loading Posts...";
  if (positionQuery.isLoading) return "Loading Users...";
  if (weatherQuery.isLoading) return "Loading Weather...";
  if (raceQuery.isLoading) return "Loading Weather...";
  if (lapsQuery.isLoading) return "Loading Weather...";
  if (sessionQuery.isLoading) return "Loading Weather...";

  if (driverQuery.error)
    return "An error has occurred: " + driverQuery.error.message;
  if (positionQuery.error)
    return "An error has occurred: " + positionQuery.error.message;
  if (weatherQuery.error)
    return "An error has occurred: " + weatherQuery.error.message;
  if (raceQuery.error)
    return "An error has occurred: " + raceQuery.error.message;
  if (lapsQuery.error)
    return "An error has occurred: " + lapsQuery.error.message;
  if (sessionQuery.error)
    return "An error has occurred: " + sessionQuery.error.message;

  const driver_list: number[] = [];
  lapsQuery?.data?.forEach((object) => {
    if (!driver_list.includes(object.driver_number ?? 0)) {
      if (typeof object.driver_number === "number") {
        driver_list.push(object.driver_number);
      }
    }
  });

  const newDriverList = driver_list.map((driverNumber) => {
    return lapsQuery?.data?.filter(
      (object) => object.driver_number === driverNumber
    );
  });

  const lastLapsPerDrive = newDriverList.map(
    (newDriver) => newDriver[newDriver.length - 2]
  );

  const fastestLaps: LapInfo[] = [];

  newDriverList.forEach((piloto) => {
    let fastLap: any = null;
    piloto.forEach((lap) => {
      if (
        lap.lap_duration !== null &&
        (fastLap === null || lap.lap_duration < fastLap.lap_duration)
      ) {
        fastLap = lap;
      }
    });
    if (fastLap !== null) {
      fastestLaps.push(fastLap);
    }
  });

  const position_list: number[] = [];
  positionQuery.data.forEach((object) => {
    if (!position_list.includes(object.driver_number ?? 0)) {
      if (typeof object.driver_number === "number") {
        position_list.push(object.driver_number);
      }
    }
  });

  const newPositionList = position_list.map((driverNumber) => {
    return positionQuery.data.filter(
      (object: any) => object.driver_number === driverNumber
    );
  });

  const lastLapPositionPerDrive = newPositionList.map(
    (newDriver) => newDriver[newDriver.length - 1]
  );

  const finalWeather = weatherQuery.data.at(-1);

  lastLapPositionPerDrive.sort((a, b) => a.position - b.position);

  const sessionInfo = lastLapPositionPerDrive.map((item) => {
    return lastLapsPerDrive.filter(
      (number) => number.driver_number === item.driver_number
    )[0];
  });

  sessionInfo.forEach((session_info) => {
    fastestLaps.forEach((fast_lap_info) => {
      if (
        session_info.driver_number === fast_lap_info.driver_number &&
        session_info.session_key === fast_lap_info.session_key
      ) {
        session_info.fast_lap = fast_lap_info.lap_duration;
      }
    });
    driverQuery.data.forEach((driver_info) => {
      if (
        session_info.driver_number === driver_info.driver_number &&
        session_info.session_key === driver_info.session_key
      ) {
        session_info.driver_name = driver_info.full_name;
      }
    });
    // location.forEach((location_info) => {
    //   if (
    //     session_info.driver_number === location_info.driver_number &&
    //     session_info.session_key === location_info.session_key
    //   ) {
    //     session_info.x = location_info.x;
    //     session_info.y = location_info.y;
    //     session_info.z = location_info.z;
    //   }
    // });
  });

  return {
    sessionInfo: {
      sessionInfo: sessionInfo,
      circuitInfo: sessionQuery.data[0],
    },
    weather: finalWeather,
  };
};

export default useSessionInfo;
