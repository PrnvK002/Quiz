import React from 'react';
import { Form , Button , Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearData } from '../State/reducer/quizReducer';
import Loader from './Loader';

function FinishedModal({ finished }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quizData = useSelector((state) => state.quizReducer);
    const { result , loading , error} = quizData;
    const handleRetry = () => {
        dispatch(clearData());
        navigate('/');
    }


  return (
    <>
      <Modal show={finished}>
        <Modal.Header>
          <Modal.Title>You have successfully completed the quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { loading && <Loader /> }
            POINTS : {result.points}
            <p style={{ cursor : 'pointer' }} onClick={ ()=> navigate('/result') } > See the answers </p>
            <button style={{ color : 'white',backgroundColor : 'green' , border : 'none' , width : '3rem' , height : '1.8rem' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}  onClick={handleRetry} >
                Retry
            </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FinishedModal;