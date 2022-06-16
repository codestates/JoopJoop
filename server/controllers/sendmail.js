const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const mailSender = {
  // 메일발송 함수
  sendGmail: function (mailcontent) {
    var transporter = nodemailer.createTransport({
      service: "Naver", // 메일 보내는 곳
      port: 587,
      host: "smtp.naver.com",
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER, // 보내는 메일의 주소
        pass: process.env.NODEMAILER_PASSWORD, // 보내는 메일의 비밀번호
      },
    });

    // 메일 옵션
    var mailOptions = {
      from: process.env.NODEMAILER_USER, // 보내는 메일의 주소
      to: mailcontent.toEmail, // 수신할 이메일
      subject: mailcontent.subject, // 메일 제목
      text: mailcontent.text, // 메일 내용
    };

    // 메일 발송
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

module.exports = mailSender;
