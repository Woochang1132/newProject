import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on("connection", (socket) =>{
    sockets.push(socket);
    console.log("Connected to Browser ✔");
    socket.on("close", () => {
        console.log("Disconected From Browser ❌");
    });
    socket.on('message', (message) => {
        const translatedMessageData = message.toString('utf8');
        socket.send(translatedMessageData);
      });// ws 버전이 옛날 버전이여서 이렇게 데이터를 변형 해줘야 한다. 업데이트를 하면 해결 
});

server.listen(3000, handleListen);