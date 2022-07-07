import { createAsyncThunk , createSlice } from '@reduxjs/toolkit';
import Axios from '../../axios';

export const getQuestions = createAsyncThunk('questions/get',async (set,{rejectWithValue}) => {
    try{
        const response = await Axios.get(`/questions?setNo=${set}`);
        console.log(response);
        return response.data;
    }catch(err){
        console.log(err);
        return rejectWithValue(err.response.data);  
    }
});

export const submitQuiz = createAsyncThunk('questions/submit',async (data, {rejectWithValue})=>{
    try{
        const response = await Axios.post('/quiz',data);
        console.log(response);
        return response.data;
    }catch(err){
        console.log(err);
        return rejectWithValue(err.response.data);
    }
})

const quizReducer = createSlice({
    name : 'question',
    initialState : {
        questions : [],
        result : {},
        retry:1,
        loading : false,
        error : ''
    },
   reducers : {
        clearData : (state,action) => {
            state.questions = [];
            state.result = {};
            let no = state.retry;
            state.retry = no + 1;
        }
   },
    extraReducers : {
        [ getQuestions.fulfilled ] : (state,action) => {
            state.questions = action.payload.questionData;
            state.loading = false;
        },
        [ getQuestions.pending ] : (state,action) => {
            state.loading = true;
        },
        [ getQuestions.rejected ] : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [ submitQuiz.fulfilled ] : (state,action) => {
            state.result = action.payload._doc;
            state.loading = false;
        },
        [ submitQuiz.pending ] : (state,action) => {
            state.loading = true;
        },
        [ submitQuiz.rejected ] : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { clearData } = quizReducer.actions;

export default quizReducer.reducer;