const mailer = require("../controllers/sendmail");
const router = require("express").Router();

const generateRandom = function (min, max) {
  var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
};

router.post("/", (req, res) => {
  if (req.body.email) {
    const {email} = req.body;
    const authnum = generateRandom(111111, 999999);

    let mailcontent = {
      toEmail: email,
      subject: "JoopJoop 인증번호 전송 메일입니다",
      text: `JoopJoop으로 이동하셔서 인증번호: ${authnum} 을 입력해주세요`,
    };

    mailer.sendGmail(mailcontent);
    return res.status(200).json({authnum: `${authnum}`});
  } else {
    return res.status(400).json({message: "입력된 이메일이 없습니다."});
  }
});

module.exports = router;
