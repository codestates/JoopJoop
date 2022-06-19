import { createStore } from "redux";
import rootReducer from "./rootReducer.js";

const store = createStore(rootReducer);

export default store;
