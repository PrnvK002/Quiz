import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question : {
        type : Schema.Types.ObjectId,
        required : 'true',
        ref : 'questions'
    },
    selectedOption : {
        type : String,
        required : true
    }
})

const quizSchema = new Schema({
    playerName : {
        type : 'String',
        required : true
    },
    questions : [ questionSchema ],
    points : {
        type : 'Number',
        required : true
    }
})

export default mongoose.model('quiz',quizSchema);