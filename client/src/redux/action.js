module.exports = {
  setDogs: dog => ({
    type: "SET_DOGS",
    payload: dog,
  }),

  setIsLogin: boolean => ({
    type: "SET_ISLOGIN",
    payload: boolean,
  }),
};
