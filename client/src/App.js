import React, { useState } from 'react';
import SetNameModal from './SetNameModal'
import './App.css';

const App = () => {
  const [modalShow, setModalShow] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [websocket, setWebsocket] = useState(undefined);

  const onChange = (e) => {
    setMessage(e.target.value) 
  }
  
  const onClick = () => {
    sendMessage(name, message)
  }

  const onStart = (name) => {
    let ws = new WebSocket("ws://" + window.location.host + "/ws")
    ws.onopen = (e) => {
      console.log("onopen")
    }

    ws.onclose = (e) => {
      console.log("onclose")
    }

    ws.onmessage = (message) => {
      console.log(message.data)
      // var newMessageList = messageList.concat(JSON.parse(message.data))
      // setMessageList(newMessageList)
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
    <div className="App">
      <SetNameModal
        show={modalShow}
        onStart={(e) => onStart(e)}
      />
      <p>name: {name}</p>
      <input type="text" name="message" placeholder="텍스트를 입력해주세요" onChange={onChange}/>
      <button onClick={onClick}>Send</button>
      {messageList.map(value => {
        return (
          <p>{name} : {value}</p>
        )
      })}
    </div>
  );
}

export default App;
