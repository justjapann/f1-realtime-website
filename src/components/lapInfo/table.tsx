import { Tr, Td } from "@chakra-ui/react";
import SectorsInfo from "./sectorInfo";
import styles from "./laps.module.scss";
import SecondsToFormatedTime from "../../utils/secondToTime";
import { LapInfo } from "../../types/lapInfo";

function TableInfo(props: LapInfo) {
  return (
    <Tr>
      <Td>{props.driver_name}</Td>
      <Td></Td>
      <Td>{SecondsToFormatedTime(props.lap_duration)}</Td>
      <Td></Td>
      <Td>{props.fast_lap ? SecondsToFormatedTime(props.fast_lap) : 0}</Td>
      <Td>{props.duration_sector_1?.toFixed(3)}</Td>
      <Td>{props.duration_sector_2?.toFixed(3)}</Td>
      <Td>{props.duration_sector_3?.toFixed(3)}</Td>
      <Td>
        {props.is_pit_out_lap ? (
          <span className={styles.in_pit}>IN PIT</span>
        ) : (
          <span className={styles.out_pit}>OUT PIT</span>
        )}
      </Td>
      <Td>
        <SectorsInfo sector={props.segments_sector_1} />
      </Td>
      <Td>
        <SectorsInfo sector={props.segments_sector_2} />
      </Td>
      <Td>
        <SectorsInfo sector={props.segments_sector_3} />
      </Td>
    </Tr>
  );
}

export default TableInfo;
