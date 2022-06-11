const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateAccessToken = user => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: "1d" },
  );
};

const generateRefreshToken = user => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.REFRESH_SECRET,
    { expiresIn: "30d" },
  );
};

const generateOauthToken = user => {
  console.log("user : " + user);
  return jwt.sign({ oAuthId: user.oAuthId }, process.env.JWT_SEC, {
    expiresIn: "1d",
  });
};

const verifyToken = (req, res, next) => {
  console.log("verifyToken");
  console.log(req.headers.token);

  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("유효하지 않은 토큰입니다!");
      // console.log(user)
      // console.log(req.user)
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("권한이 없습니다!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user)
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("올바르지 않은 접근입니다!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user)
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("관리자 권한이 필요합니다!");
    }
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  generateOauthToken,
};
