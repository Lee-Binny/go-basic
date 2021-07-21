import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

const SetNameModal = (props) => {
    const [userName, setUserName] = useState('')

    const onChange = (e) => {
        setUserName(e.target.value)
    }
    
    return(
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>
                    Set Name
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        name="name"
                        type="text"
                        placeholder="이름을 입력해주세요"
                        onChange={onChange}
                    />
                </InputGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => props.onStart(userName)} variant="primary">Start</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SetNameModal;