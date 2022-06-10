const initialState = {
  dogData: ["ddddd"],
  accessToken: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DOGS":
      return { ...state, dogData: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
