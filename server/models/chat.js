const mongoose = require('mongoose');

function getCurrentDate(){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();
  return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}
const ChatSchema = mongoose.Schema(
  {
    // 채팅친 참가자(author)의 id, nicknmae, profilimg를 user를 참조해서 populate해오기
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    // 채팅창에 입력한 메세지
    message: String,
    // 해당 채팅이 소속된 gathering의 id값만 가져옴 -> 참여하고 있는지 아닌지 판단, 이전채팅내역 불러오기위해서
    connected_gathering: {
      type: String,
      required: true,
    },
    loginNickname: String,
    joinTime : {type : Date, default: getCurrentDate()}
  },
  {timestamps : true}
  ,
);

module.exports = mongoose.model('chat', ChatSchema);