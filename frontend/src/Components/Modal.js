import React from 'react';
import { Form , Button , Modal } from 'react-bootstrap';

function UserNameModal({ setPlayerName , show , handleClose , playerNameError }) {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Enter your Name to start</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { playerNameError && <p style={{ color: "red"}} > {playerNameError} </p> }
            <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setPlayerName(e.target.value) } />
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" onClick={handleClose}>
            Start Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserNameModal;