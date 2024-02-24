const { v4: uuid } = require("uuid");
const boards = require("../boards");

module.exports = function boardsActionHandler(socket) {
    socket.on("create-board", (data) => {
        const id = uuid();
        boards[id] = {
            name: data.name,
            data: [],
        };
        dispatchGetBoards(boards);
    });
    socket.on("delete-board", (data) => {
        delete boards[data];
        dispatchGetBoards(boards);
    });
    socket.on("get-boards", () => {
        dispatchGetBoards(boards);
    });
    function dispatchGetBoards(boards) {
        socket.emit("get-boards", boards);
        socket.broadcast.emit("get-boards", boards);
    }
};
