import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const optionSchema = {
    optionName : {
        type : 'String'
    }
}

const questionSchema = new Schema({
    question : {
        type : 'String',
        required : true
    },
    options : [ optionSchema ],
    answer : { 
        type : 'String',
        required : 'true'
     }
})

export default mongoose.model('questions',questionSchema);