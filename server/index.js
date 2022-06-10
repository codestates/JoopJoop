const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const poCommentsRoute = require("./routes/posts_comments");
const gatheringsRoute = require("./routes/gatherings");
const gaCommentsRoute = require("./routes/gatherings_comments");
const mailRoute = require("./routes/mail");
const multer = require("multer");
const passportConfig = require("./passport");
const PORT = 80;
const cookieParser = require("cookie-parser");

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
mongoose
  .connect(`${process.env.ATLAS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB https://cloud.mongodb.com/"))
  .catch(err => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, "hello.jpeg"); // 포스트맨으로는 이미지 이름까지 보낼수 없기때문에 'hello.jpeg' 라고 지정해서 보내야함
    // 하지만 클라이언트에서 받아올때는 이미지 이름까지 받아올수 있기 때문에 req.body.name을 쓰면됨
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("파일이 업로드 되었습니다.");
});

passportConfig(app);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/mail", mailRoute);
app.use("/posts_comments", poCommentsRoute);
app.use("/gatherings", gatheringsRoute);
app.use("/gatherings_comments", gaCommentsRoute);

app.listen(PORT, () => {
  console.log(`JoopJoop Server is running. http://localhost:${PORT}`);
});
