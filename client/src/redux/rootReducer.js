const initialState = {
<<<<<<< HEAD
  isLogin: false,
  searchTown: [],
  searchDate: "",
  searchTime: [],
=======
  dogData: ["ddddd"],
  isLogin: false,
>>>>>>> Merge 를 위한 Commit
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DOGS":
      return { ...state, dogData: action.payload };
    case "SET_ISLOGIN":
      return { ...state, isLogin: action.payload };
<<<<<<< HEAD
    case "SET_SEARCHTOWN":
      return { ...state, searchTown: action.payload };
    case "SET_SEARCHDATE":
      return { ...state, searchDate: action.payload };
    case "SET_SEARCHTIME":
      return { ...state, searchTime: action.payload };
=======
>>>>>>> Merge 를 위한 Commit
    default:
      return state;
  }
};

export default rootReducer;
