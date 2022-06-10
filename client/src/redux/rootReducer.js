const initialState = {
  dogData: ["ddddd"],
  isLogin: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DOGS":
      return { ...state, dogData: action.payload };
    case "SET_ISLOGIN":
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
