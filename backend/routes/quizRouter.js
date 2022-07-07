import express from 'express';
import { postQuizData,getQuestions,addQuestion } from '../controllers/quizController.js';


const router = express.Router();

//=============== Route for getting questions ============
router.get('/questions',getQuestions);

router.post('/question',addQuestion);

//=============== Route for posting the quiz data ============
router.post('/quiz',postQuizData);

export default router;
