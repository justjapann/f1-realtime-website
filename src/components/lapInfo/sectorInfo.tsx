import { ReactNode } from "react";
import { Sector } from "../../types/lapInfo";
import styles from "./laps.module.scss";

const SectorsInfo = ({ sector }: { sector?: Sector[] }) => {
  const variations: { [key in Sector]: ReactNode } = {
    2048: <div className={styles.sector_yellow}></div>,
    2050: <div className={styles.sector_green}></div>,
    2051: <div className={styles.sector_purple}></div>,
  };
  return (
    <div className={styles.container_sectors}>
      {sector?.map((item) => variations[item])}
    </div>
  );
};

export default SectorsInfo;
