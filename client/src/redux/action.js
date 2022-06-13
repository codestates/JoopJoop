module.exports = {
  setIsLogin: (boolean) => ({
    type: "SET_ISLOGIN",
    payload: boolean,
  }),
  setSearchTown: (town) => ({
    type: "SET_SEARCHTOWN",
    payload: town,
  }),
  setSearchDate: (date) => ({
    type: "SET_SEARCHDATE",
    payload: date,
  }),
  setSearchTime: (time) => ({
    type: "SET_SEARCHTIME",
    payload: time,
  }),
  setEmail: (email) => ({
    type: "SET_EMAIL",
    payload: email,
  }),
  setNickname: (nickname) => ({
    type: "SET_NICKNAME",
    payload: nickname,
  }),
};
