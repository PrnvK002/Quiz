import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./reducer/quizReducer";

const store = configureStore({
    reducer : {
        quizReducer
    }
});

export default store;