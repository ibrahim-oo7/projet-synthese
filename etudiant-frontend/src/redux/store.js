import { createStore, combineReducers } from "redux";
import quizReducer from "./quizReducer";
import courseReducer from "./courseReducer";

const rootReducer = combineReducers({
  quiz: quizReducer,
  course: courseReducer
});

const store = createStore(rootReducer);

export default store;
