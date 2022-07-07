import questions from "../models/questions.js";
import quiz from "../models/quiz.js";

//@desc get questions
//@route GET /api/v1/questions
//@access public

export const getQuestions = async(req,res) => {
    try{
        const questionData = await questions.find({}).skip().limit(10);
        if(questionData.length){
            res.status(200).json({ questionData });
        }else{
            res.status(404);
            throw new Error('Unable to find questions at the moment');
        }
    }catch(err){
        res.status(404);
        throw new Error('Unable to find questions at the moment');
    }
}

//@desc post quiz
//@route GET /api/v1/quiz
//@access public

export const postQuizData = async(req,res) => {
    try{
        let { playerName , answerData } = req.body;

        const result = answerData.map((e) => {
            return { question : e.question._id , selectedOption : e.selectedOption }
        })
 
        let points = answerData.reduce((acc,iterator) =>{
            if(iterator.question.answer === iterator.selectedOption){
                acc=acc+1;
            }
            return acc;
        },0);

        const insertion = await quiz.create({
            playerName : playerName,
            questions : result,
            points : points
        });
        if(Object.keys(insertion).length){
            let quizDataResponse = await quiz.findOne({ _id : insertion._id }).populate('questions.question');
            console.log(quizDataResponse);
            if(quizDataResponse){
                res.status(200).json({...quizDataResponse});
            }else{
                res.status(500);
            throw new Error('Cannot submit the quiz data attend the quiz once again');
            }
        }
        else{
            res.status(500);
            throw new Error('Cannot submit the quiz data attend the quiz once again');
        }

    }catch(err){
        res.status(500);
        throw new Error('Cannot submit the quiz data attend the quiz once again');

    }
}

export const addQuestion = async (req,res)=>{
    try{
        console.log(req.body);
        const insertion = await questions.create({
            question : req.body.question,
            options : req.body.options,
            answer : req.body.answer
        });
        if(insertion){
            res.status(200).json({ message : 'Added question' });
        }else{
            res.status(500).json({ message : 'error occured while adding' });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message : 'error occured while adding' });

    }
}