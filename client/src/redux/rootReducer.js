const initialState = {
  isLogin: false,
  isOAuthLogin: false,
  isGuest: false,
  searchTown: [],
  searchDate: "",
  searchTime: [],
  loginEmail: "",
  loginNickname: "",
  password: "",
  userId: "",
  accessToken: "",
  profileImg: "",
  gatherings: [
    {
      author: {
        _id: "",
        nickname: "",
        profileImg: "",
      },
      date: "",
      latitude: "",
      longitude: "",
      paricipants: [],
      place: "",
      time: "",
      title: "",
      town: "",
      __v: 0,
      _id: "",
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ISLOGIN":
      return { ...state, isLogin: action.payload };
    case "SET_ISOAUTHLOGIN":
      return { ...state, isOAuthLogin: action.payload };
    case "SET_ISGUEST":
      return { ...state, isGuest: action.payload };
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
    case "SET_GATHERINGS":
      return { ...state, gatherings: action.payload };
    case "SET_ISLOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
