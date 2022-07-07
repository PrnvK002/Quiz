import React,{ useState , useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector , useDispatch } from 'react-redux'
import Loader from '../Components/Loader';
import { getQuestions, submitQuiz } from '../State/reducer/quizReducer';
import Modal from '../Components/Modal';
import FinishedModal from '../Components/FinishedModal';
import { useNavigate } from 'react-router-dom';

export const QuizPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [question,setQuestion] = useState();
    const [ count , setCount ] = useState(0);
    const [selectedOption,setSelected] = useState();
    const [ answerData , setAnswer ] = useState([]);
    const quizData = useSelector((state) => state.quizReducer);
    const { questions , loading , error } = quizData; 

    //======== setting modal for player name input ====
    const [show,setShow] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [playerNameError,setError] = useState('');
    const [selectedError,setSelectedError] = useState('');
    
    const handleClose = () => {
        if(playerName.length){
            setShow(false);
        }
        setError('Name must be filled')
    }
    const handleShow = () => setShow(true);
    const ModalProps = {
        setPlayerName , show , handleClose , playerNameError
    }
    //======================================================

    //============= finished modal =====================
    const [finished,setFinished] = useState(false);
    function handleFinish(){ setFinished(true);}
    const finishModalProps = { finished }
    //================================================
    useEffect(() => {
        handleShow();
        dispatch(getQuestions(1));
    },[dispatch])

    useEffect(() => {
        if(questions.length >= count ) {
            setQuestion(questions[count])
        }else{
            handleFinish();
        }
    },[questions,count])

    const handleNext = () =>{
        if(selectedOption){
            setCount(count+1);
            setSelected(null);
            let quizObj = {
                question : question,
                selectedOption
            }
            setAnswer([...answerData,quizObj]);
            setSelectedError('');

        }
        else{
            setSelectedError('No answer selected');
        }
    }
    const handleSubmit = () => {  
        let data = {
            playerName : playerName,
            answerData
        }  
        dispatch(submitQuiz(data));
        handleFinish();
    }

  return (
    <>
        <Container>
            { loading && <Loader /> }
            <Modal {...ModalProps} />
            <FinishedModal {...finishModalProps} />
            <h4> Question : {`${count+1}/10`} </h4>
            <table>
                <tbody>

                <tr>
                    <td> { question ? question.question : '' } </td>
                </tr>
                
                { selectedError && <p style={{ color: "red"}} > {selectedError} </p>}
                {
                    question ? 
                     question.options.map((option) => {
                         return (
                             <tr>
                                 <input type="radio" name='options' id={option.optionName} value={option.optionName} onChange={ (e) => setSelected(e.target.value) } />
                                 <label for={option.optionName}>{option.optionName}</label>
                             </tr>
                         )
                     })
                      : ''
                }

                <tr style={{ textAlign:'right' }} > 
                    {
                        count >= 9 ? 
                        
                        <button style={{ color : 'white',backgroundColor : 'green' , border : 'none' , width : '3rem' , height : '1.8rem' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }} onClick={handleSubmit} > SUBMIT </button>
                        :
                        <button style={{ color : 'white',backgroundColor : 'green' , border : 'none' , width : '3rem' , height : '1.8rem' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }} onClick={ handleNext } > NEXT </button>
                    }
                </tr>
                </tbody>

            </table>
        </Container>
    </>
  )
}
