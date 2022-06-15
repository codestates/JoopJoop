const express = require("express");
const session = require("express-session");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const poCommentsRoute = require("./routes/posts_comments");
const gatheringsRoute = require("./routes/gatherings");
const mailRoute = require("./routes/mail");
const multer = require("multer");
const kakaoPassportConfig = require("./passport/kakao");
const googlePassportConfig = require("./passport/google");
const PORT = 5000;
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// app.use(
//   cookieSession({
//     name: 'session',
//     keys: ['Minhyuk'],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

mongoose
  .connect(`${process.env.ATLAS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB https://cloud.mongodb.com/"))
  .catch((err) => console.log(err));

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "images");
//   },
//   filename: (req, file, callback) => {
//     callback(null, "hello.jpeg");
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("파일이 업로드 되었습니다.");
// });

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

kakaoPassportConfig(app);
app.use(express());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/mail", mailRoute);
app.use("/posts_comments", poCommentsRoute);
app.use("/gatherings", gatheringsRoute);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("profile_img");
app.post("/upload", upload, (req, res) => {
  return res.json({
    success: true,
    image: req.file.path,
    fileName: req.file.filename,
  });
});

app.listen(PORT, () => {
  console.log(`JoopJoop Server is running. http://localhost:${PORT}`);
});
