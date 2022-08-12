const router = require("express").Router();
const User = require("../models/user");
const Gathering = require("../models/gathering");
const Chat = require("../models/chat");

//GET All CHAT
router.get("/chat", async (req, res) => {
  try {

    socket.on("create-room", (roomName, done) => {
      socket.join(roomName);
      done();
      updateRoomList();
    });
  
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE ROOM
router.post("/", async (req, res) => {
  const newGathering = new Gathering(req.body);
  try {
    const savedGathering = await newGathering.save();
    res.status(200).json(savedGathering);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;