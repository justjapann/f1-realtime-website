import { LapInfo } from "./lapInfo";
import { SessionInfo } from "./session";

import { Weather } from "./weather";

export interface OverallInfo {
  weather: Weather;
  sessionInfo: Session;
}

interface Session {
  sessionInfo: LapInfo[];
  circuitInfo: SessionInfo;
}
