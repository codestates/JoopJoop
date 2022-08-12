const io = SocketIO(process.env.SERVER_PORT);

const getSids = () => {
  const ids = [];
  const { sids, rooms } = io.of("/").adapter;

  rooms.forEach((_, key) => {
    if (sids.get(key)) {
      ids.push(key);
    }
  });

  return ids;
};

const getUserRooms = () => {
  const userRooms = [];
  const { sids, rooms } = io.of("/").adapter;
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      userRooms.push(key);
    }
  });

  return userRooms;
};

const updateRoomList = () => {
  const ids = getSids();
  const userRooms = getUserRooms();

  ids.forEach((id) => io.to(id).emit("updateRooms", userRooms));
};

io.on("connection", (socket) => {
  socket.on("leave-room", (roomName, done) => {
    socket.leave(roomName);
    done();
    const rooms = getUserRooms();
    if (!rooms.includes(roomName)) {
      io.emit("remove-room", roomName);
    }
  });

  socket.on("message", (msg, roomName, done) => {
    done();
    socket.broadcast.to(roomName).emit("message", msg);
  });

  socket.on("join-room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket
      .to(roomName)
      .emit("join-msg", `${socket["nickname"]}님께서 입장하셨습니다. !!!`);
  });

  socket.on("login", () => {
    io.to(socket.id).emit("updateRooms", getUserRooms());
  });

  socket.on("create-room", (roomName, done) => {
    socket.join(roomName);
    done();
    updateRoomList();
  });

  socket.on("nickname", (nickname, done) => {
    socket["nickname"] = nickname;
    done();
  });
});