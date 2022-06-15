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
    type: "SET_LOGINEMAIL",
    payload: email,
  }),
  setNickname: (nickname) => ({
    type: "SET_LOGINNICKNAME",
    payload: nickname,
  }),
  setPassword: (password) => ({
    type: "SET_PASSWORD",
    payload: password,
  }),
  setUserId: (_id) => ({
    type: "SET_USERID",
    payload: _id,
  }),
  setAccessToken: (accessToken) => ({
    type: "SET_ACCESSTOKEN",
    payload: accessToken,
  }),
  setProfileImg: (profileImg) => ({
    type: "SET_PROFILEIMG",
    payload: profileImg,
  }),
};
