const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const boardsActionHandler = require("./handlers/boardsActionHandler");
const drawingHandler = require("./handlers/drawingHandler");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    },
});
function onConnection(socket) {
    boardsActionHandler(socket);
    drawingHandler(socket);
}

io.on("connection", onConnection);

httpServer.listen(4000, () => {
    console.log("Server start");
});
