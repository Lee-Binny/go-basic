import React, { useState } from 'react';
import "./ChatScreen.css"
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Message from './Message';

const ChatScreen = (props) => { 
    const [message, setMessage] = useState('')
    const onChange = (e) => {
        setMessage(e.target.value)
    }

    const onClick = () => {
        props.onClick(message)
        setMessage('')
    }

    const onKeyPress = (e) => {
        if (e.key === "Enter" && message !== "") {
            onClick()
        }
    }

    return(
        <div className="screen">
            <div className="inner-screen">
                <div className="chat-screen">
                    {
                        props.messageList.map(value => {
                            return (
                                <Message userName={props.userName} name={value.name} time={value.time} message={value.message}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className="chat-input">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">{props.userName} </InputGroup.Text>
                    <FormControl
                        value={message}
                        className="chat-text"
                        placeholder="메세지를 입력하세요."
                        aria-describedby="basic-addon2"
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                        aria-describedby="basic-addon1"
                    />
                    <Button 
                        disabled={message === '' ? true : false } 
                        variant="secondary" 
                        id="button-addon2" 
                        onClick={onClick}>
                    ⏎
                    </Button>
                </InputGroup>
            </div>
        </div>
    )
}

export default ChatScreen;