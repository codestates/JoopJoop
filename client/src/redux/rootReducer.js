const initialState = {
  isLogin: false,
  searchTown: [],
  searchDate: "",
  searchTime: [],
  loginEmail: "",
  loginNickname: "",
  password: "",
  userId: "",
  accessToken: "",
  profileImg: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DOGS":
      return { ...state, dogData: action.payload };
    case "SET_ISLOGIN":
      return { ...state, isLogin: action.payload };
    case "SET_SEARCHTOWN":
      return { ...state, searchTown: action.payload };
    case "SET_SEARCHDATE":
      return { ...state, searchDate: action.payload };
    case "SET_SEARCHTIME":
      return { ...state, searchTime: action.payload };
    case "SET_LOGINEMAIL":
      return { ...state, loginEmail: action.payload };
    case "SET_LOGINNICKNAME":
      return { ...state, loginNickname: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_USERID":
      return { ...state, userId: action.payload };
    case "SET_ACCESSTOKEN":
      return { ...state, accessToken: action.payload };
    case "SET_PROFILEIMG":
      return { ...state, profileImg: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
