import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SetNameModal = (props) => {
    const [userName, setUserName] = useState('')

    const onChange = (e) => {
        setUserName(e.target.value)
    }
    
    return(
        <Modal show={props.show}>
            <Modal.Body>
                <input
                    name="name"
                    type="text"
                    placeholder="이름을 입력하세요."
                    onChange={onChange}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => props.onStart(userName)} variant="secondary">Start</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SetNameModal;