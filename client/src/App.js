import React, { useState } from 'react';
import './App.css';
import SetNameModal from './components/SetNameModal'
import ChatScreen from './components/ChatScreen';
import ChatNav from './components/ChatNav';


const App = () => {
  const [modalShow, setModalShow] = useState(true);
  const [name, setName] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [websocket, setWebsocket] = useState(undefined);
  
  const onClick = (message) => {
    sendMessage(name, message)
  }

  const onStart = (name) => {
    let ws = new WebSocket("ws://" + window.location.host + "/ws?name=" + name)
    ws.onopen = (e) => {
      console.log("onopen")
    }

    ws.onclose = (e) => {
      console.log("onclose")
    }

    ws.onmessage = (message) => {
      setMessageList(prev => [...prev, JSON.parse(message.data)])
    }

    setWebsocket(ws)
    setName(name)
    setModalShow(false)
  }

  const sendMessage = (name, message) => {
    websocket.send(JSON.stringify({
        name: name,
        message: message
    }))
  }
  return (
    <>
    <ChatNav name={name}/>
    <div className="App">
      <SetNameModal
        show={modalShow}
        onStart={(e) => onStart(e)}
      />
      <ChatScreen userName={name} messageList={messageList} onClick={onClick}/>
    </div>
    </>
  );
}

export default App;
