import React from 'react';
import './Message.css';
import { Navbar, Container } from 'react-bootstrap';

const ChatNav = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    Go Chat
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default ChatNav; 