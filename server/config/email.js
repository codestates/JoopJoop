const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  auth: {
    user: "your_naver_email",
    pass: "your_naver_password"
  },
  tls: {
    rejectUnauthorized:false
  }
})

module.exports={smtpTransport}