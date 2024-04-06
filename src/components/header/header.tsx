import styles from "./header.module.scss";
import TimeHeaderCalculator from "../../utils/timeHeaderCalculator";
import useSessionInfo from "../../hook/useSessionInfo";
import { OverallInfo } from "../../types/overall";

const HeaderCustom = () => {
  const infos: OverallInfo = useSessionInfo();
  console.log("driverList2", infos);

  const circuitInfo = infos?.sessionInfo?.circuitInfo;

  const time = TimeHeaderCalculator(
    new Date(circuitInfo?.date_end),
    new Date()
  );

  return (
    <div className={styles.container_header}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/2560px-F1.svg.png"
        alt="logo"
      />
      <span className={styles.header_title}>
        FORMULA 1 {circuitInfo?.circuit_short_name} GRAND PRIX{" "}
        {circuitInfo?.year}
      </span>
      <span>
        {circuitInfo?.session_type} /
        <span>
          {" "}
          {time?.hours < 0 ? "0:00" : time?.hours + ":" + time?.seconds}
        </span>
      </span>
    </div>
  );
};

export default HeaderCustom;
