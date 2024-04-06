import React, { useEffect, useState } from "react";

import styles from "./track.module.scss";
import { OverallInfo } from "../../types/overall";
import { Location } from "../../types/location";
import url_map from "../../constants/maps";
import useSessionInfo from "../../hook/useSessionInfo";

const TrackConditions = () => {
  const [ws, setWs] = useState<any>();
  const [mensagemRecebida, setMensagemRecebida] = useState<Location>();
  const session: OverallInfo = useSessionInfo();
  const weather = session?.weather;
  // const wsUrl = "ws://localhost:8080/";
  // useEffect(() => {
  //   // Cria uma instância do WebSocket quando o componente é montado
  //   const websocket = new WebSocket(wsUrl);
  //   setWs(websocket);

  //   // Ouve o evento de abertura da conexão
  //   websocket.onopen = function () {
  //     console.log("Conexão estabelecida com o servidor WebSocket.");

  //     const message = {
  //       driver_number: 44,
  //     };

  //     ws.send(JSON.stringify(message));
  //   };

  //   // Ouve o evento de mensagem recebida do servidor
  //   websocket.onmessage = function (event) {
  //     const mensagem = JSON.parse(event.data);
  //     console.log("Mensagem recebida do servidor:", mensagem);

  //     // Atualiza o estado com a mensagem recebida
  //     const ultimoObjeto = mensagem[mensagem.length - 1];
  //     setMensagemRecebida(ultimoObjeto);
  //   };

  //   // Ouve o evento de erro na conexão
  //   websocket.onerror = function (error) {
  //     console.error("Erro na conexão WebSocket:", error);
  //   };

  //   // Ouve o evento de fechamento da conexão
  //   websocket.onclose = function () {
  //     console.log("Conexão WebSocket fechada.");
  //   };

  //   // Função de limpeza para fechar o WebSocket quando o componente for desmontado
  //   return () => {
  //     if (websocket) {
  //       websocket.close();
  //     }
  //   };
  // }, [mensagemRecebida]); // Este efeito só é executado uma vez quando o componente é montado

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
