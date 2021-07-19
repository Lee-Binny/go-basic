import React, { useState } from 'react';
import SetNameModal from './SetNameModal'
import './App.css';
import websocket from './index';

const App = () => {
  const [modalShow, setModalShow] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const onChange = (e) => {
    setMessage(e.target.value) 
  }
  
  const onClick = () => {
    var newMessageList = messageList.concat(message)
    setMessageList(newMessageList)
    websocket.sendMessage(name, message)
  }

  const onStart = (name) => {
    setName(name)
    setModalShow(false)
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
