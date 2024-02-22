const boards = require("../boards");

module.exports = function drawingHandler(socket) {
    const { board } = socket.handshake.query;
    socket.join(board);

    socket.on("drawing", (data) => {
        updateBoards(board, data);
        socket.to(board).emit("drawing", data);
    });

    socket.on("get-points", () => {
        socket.emit("get-points", boards[board].data);
    });

    function updateBoards(id, data) {
        boards[id].data.push(data);
    }
};
