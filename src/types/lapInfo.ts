export interface LapInfo {
  meeting_key?: number;
  session_key?: number;
  driver_number: number;
  driver_name?: string;
  i1_speed?: number;
  i2_speed?: number;
  st_speed?: number;
  date_start?: string;
  lap_duration: number;
  is_pit_out_lap?: boolean;
  duration_sector_1?: number;
  duration_sector_2?: number;
  duration_sector_3?: number;
  segments_sector_1?: Sector[];
  segments_sector_2?: Sector[];
  segments_sector_3?: Sector[];
  lap_number?: number;
  fast_lap?: number;
  x?: number;
  y?: number;
  z?: number;
}

export type Sector = 2048 | 2050 | 2051;
