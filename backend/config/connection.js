import mongoose from 'mongoose';

const MONGO_URI =  "mongodb+srv://user123:accessdata@blogs.ej6tx.mongodb.net/QuizApp?retryWrites=true&w=majority"
const connectDB = async() => {
    try{

        const conn = await mongoose.connect(MONGO_URI);
        console.log(`mongodb connected ${conn.connection.host}`);

    }catch(err){    
        console.log(`Error occured whilte connecting database : ${err.message}`);
    }
}

export default connectDB;