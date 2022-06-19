const express = require("express");
const session = require("express-session");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const poCommentsRoute = require("./routes/posts_comments");
const gatheringsRoute = require("./routes/gatherings");
const mailRoute = require("./routes/mail");
const multer = require("multer");
const googlePassportConfig = require("./passport/google");
const kakaoPassportConfig = require("./passport/kakao");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

app.set("trust proxy", 1); // 서버가 프록시 뒤에 있음을 명시
app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true, // 배포했을 때 false로 수정해야함
    cookie: { secure: true }, // 배포했을 때 지워 줘야함
    // 배포시 추가할 코드
    // proxy: true,
    // cookie: {
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 60 * 5,
    //   sameSite: "strict", // sameSite임을 명시
    //   domain: ".joopjoop.site", // 앞에 .을 찍어야함
    //   secure: true, // https환경임을 명시
    // },
  })
);

mongoose
  .connect(`${process.env.ATLAS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB https://cloud.mongodb.com/"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: true,
  credentials: true,
  // optionSuccessStatus: 200,
  method: ["GET", "POST", "DELETE", "PATCH"],
};

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
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `JoopJoop Server is running. http://localhost:${process.env.SERVER_PORT}`
  );
});
