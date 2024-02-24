const express = require("express");
require("dotenv").config();
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const boardsActionHandler = require("./handlers/boardsActionHandler");
const drawingHandler = require("./handlers/drawingHandler");

const PORT = process.env.PORT || 5000;

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN,
    },
});
function onConnection(socket) {
    boardsActionHandler(socket);
    drawingHandler(socket);
}

io.on("connection", onConnection);

httpServer.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`);
});
