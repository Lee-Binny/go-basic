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
    var newMessageList = messageList.push(message)
    setMessageList(newMessageList)
    websocket.sendMessage(name, message)
  }

  const onStart = (name) => {
    console.log("name: " + name)
    setName(name)
    setModalShow(false)
  }

//   componentDidMount() { 
//     setTimeout(() => { 
//       websocket.addListener(this.messageListener) 
//     }, 250) 
//    } 
   
//   addMessage = (message) => { 
//     let messageList = this.state.messageList.slice() 
//     messageList.push(message) 
//     this.setState({ messageList: messageList 
//     }) 
//   } 
  
//   messageListener = (message) => { 
//     this.addMessage(message) 
//   } 
  
//   handleMessage = (e) => { 
//     e.preventDefault(); 
//     let messageList = this.state.messageList.slice() 
//     let message = { 
//       payload: messageInput.current.value, 
//       sender: nameInput.current.value 
//     } 
//     messageList.push(message) 
//     this.setState({ 
//       messageList: messageList 
//     }) 
//     websocket.sendMessage(JSON.stringify(message)) 
//   } 
    
//   handleStart = (e) => { 
//     e.preventDefault(); 
//     this.setState({ 
//       name: nameInput.current.value, 
//       visible: true 
//     }) 
//   }

  return (
    <div className="App">
      <SetNameModal
        show={modalShow}
        onStart={(e) => onStart(e)}
      />
      <p>name: {name}</p>
      <input type="text" name="message" placeholder="텍스트를 입력해주세요" onChange={onChange}/>
      <button onClick={onClick}>Send</button>
      {messageList.map((value) => {
        return (
          <p>{value}</p>
        )
      })}
    </div>
  );
}

export default App;
