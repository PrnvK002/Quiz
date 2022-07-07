import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';

const ResultPage = () => {

    const navigate = useNavigate();
    const resultData = useSelector((state) => state.quizReducer);
    const { result, loading, error } = resultData;
    const [question, setQuestion] = useState();
    const [count, setCount] = useState(0);

    const handleNext = () => {
        if(count < 10 ){
            setCount(count + 1);
            setQuestion(result.questions[count]);
        }
    }

    useEffect(() => {
        setQuestion(result.questions[0]);
    }, [result]);

    return (
        <>
            <Container>
                {loading && <Loader />}
                <h4> Question : {`${count + 1}/10`} </h4>
                <table>
                    <tbody>
                    <tr>
                        <td> {question ? question.question.question : ''} </td>
                    </tr>

                    {
                        question ?
                            question.question.options.map((option) => {
                                return (
                                    <tr key={option.optionName} >
                                        <input type="radio" name='options' id={option.optionName} value={option.optionName} checked = { option.optionName === question.selectedOption ? 'checked' : '' } />
                                        <label for={option.optionName}>{option.optionName}</label>
                                    </tr>
                                )
                            })
                            : ''
                    }

                    <tr>
                        Answer : {question ? question.question.answer : ''}
                    </tr>

                    <tr style={{ textAlign: 'right', display:'flex' }} >
                        <button style={{ color: 'white', backgroundColor: 'green', border: 'none', width: '3rem', height: '1.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center' , marginRight : '1rem' }} onClick={handleNext} > NEXT </button>
                        <button style={{ color: 'white', backgroundColor: 'green', border: 'none', width: '3rem', height: '1.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={ navigate('/') } > Home </button>
                    </tr>
                    </tbody>
                </table>
            </Container>
        </>
    )
}

export default ResultPage;
