const router = require("express").Router();
const User = require("../models/user");
const Chat = require("../models/chat");

//GET ALL CHAT
router.get("/", async (req, res) => {
  console.log("chat route called!!");
  try {
    let Chats = await Chat.find().populate("author", [
      "nickname",
      "profileImg",
    ]);
    res.status(200).json(Chats);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SAVE CHAT
router.post("/:id", async (req, res) => {
  const newChat = new Chat(req.body);
  try {
    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
