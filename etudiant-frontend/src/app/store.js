import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import enrollmentReducer from "../features/enrollments/enrollmentSlice";
import quizReducer from "../redux/quizReducer";
import courseReducer from "../redux/courseReducer";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  enrollments: enrollmentReducer,
  quiz: quizReducer,
  course: courseReducer
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['auth', 'enrollments'], // Don't persist auth or enrollment state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);