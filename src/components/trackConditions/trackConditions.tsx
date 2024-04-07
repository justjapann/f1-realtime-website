/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./track.module.scss";
import { OverallInfo } from "../../types/overall";
import url_map from "../../constants/maps";
import useSessionInfo from "../../hook/useSessionInfo";
import { useEffect, useState } from "react";
import { Location } from "../../types/location";

const TrackConditions = () => {
  // const [ws, setWs] = useState<any>();
  // const [mensagemRecebida, setMensagemRecebida] = useState<Location>();

  const session: OverallInfo = useSessionInfo();
  const weather = session?.weather;

  // const wsUrl = "ws://localhost:8080/";

  // useEffect(() => {
  //   const websocket = new WebSocket(wsUrl);
  //   setWs(websocket);

  //   websocket.onopen = function () {
  //     websocket.send("44");
  //   };

  //   websocket.onmessage = function (event) {
  //     const mensagem = JSON.parse(event.data);
  //     console.log("Mensagem recebida do servidor:", mensagem);

  //     const ultimoObjeto = mensagem[mensagem.length - 1];
  //     setMensagemRecebida(ultimoObjeto);
  //   };

  //   websocket.onerror = function (error) {
  //     console.error("Erro na conexão WebSocket:", error);
  //   };

  //   websocket.onclose = function () {
  //     console.log("Conexão WebSocket fechada.");
  //   };

  //   return () => {
  //     if (websocket) {
  //       websocket.close();
  //     }
  //   };
  // }, [mensagemRecebida]);

  // console.log("asdasdasdasd", mensagemRecebida);

  return (
    <div className={styles.container_trackinfo}>
      <div>
        <img
          className={styles.track_image}
          src={`${url_map[session?.sessionInfo?.circuitInfo.circuit_key]}`}
        />
      </div>
      <div className={styles.trackinfo_texts}>
        <h1 className={styles.track_title}>CURRENT CONDITIONS</h1>

        <div className={styles.trackinfo_temps}>
          <span>
            AIR TEMP: <strong>{weather?.air_temperature.toFixed(2)} °C</strong>
          </span>
          <span>
            TRACK TEMP:{" "}
            <strong>{weather?.track_temperature.toFixed(2)} °C</strong>
          </span>
          <span>
            HUMIDITY: <strong>{weather?.humidity.toFixed(2)}%</strong>
          </span>
          <span>
            WIND: <strong>{weather?.wind_speed} m/s</strong>
          </span>
        </div>
        {/* <div>
          {mensagemRecebida && (
            <ThreeDimensionalSceneSVG data={mensagemRecebida} />
          )}
        </div> */}
      </div>
    </div>
  );
};

export default TrackConditions;
