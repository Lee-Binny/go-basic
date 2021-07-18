import React, { useState } from 'react';
import './App.css';
import websocket from './index';

const App = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const onChange = (e) => {
    setMessage(e.target.value) 

  }
  
  const onClick = () => {
    messageList.push(message)
    websocket.sendMessage(message)
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
