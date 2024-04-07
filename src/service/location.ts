import axios from "axios";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("connection");
  ws.on("message", function message(data) {
    console.log("received: %s", data);
    const requestData = JSON.parse(data);
    axios
      .get(
        `https://api.openf1.org/v1/location?session_key=latest&driver_number=44`
      )
      .then((response) => {
        ws.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Erro na requisição Axios:", error);
      });
  });
});
