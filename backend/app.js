import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/connection.js';
import { notFound , errorHandler } from './middlewares/errorHandler.js';

import quizRouter from './routes/quizRouter.js';

connectDB();

const app = express();

//============ establishing database connectivity =========

//============= Cors ================
app.use(cors({ origin : "*" })); //allowing requests of all origin

//=============== body parser ============
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//============== setting logger ==========
app.use(logger('dev'));

//========== Routes settings ======
app.use('/api/v1',quizRouter);


//=========== Error handling middlewares ======
app.use(notFound);
app.use(errorHandler);




const PORT = 4000;

app.listen(PORT,console.log(`Server started running on ${PORT}`))