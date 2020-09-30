import React, { useRef, useState } from 'react';

import './Chat.css';

import { Avatar, IconButton } from '@material-ui/core';
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from '@material-ui/icons';
import ChatMessage from '../components/ChatMessage';
import axios from '../common/axios';

const Chat = ({ messages }) => {
  const [input, setInput] = useState('');
  const sendMessageHandler = (e) => {
    e.preventDefault();
    axios.post('/api/v1/messages/new', {
      message: input,
      name: 'Breiter',
      timestamp: new Date().toUTCString(),
      received: true,
    });

    setInput('');
  };
  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar />
        <div className='chat__headerInfo'>
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        {messages.map((message) => (
          <ChatMessage
            key={Math.random()}
            name={message.name}
            message={message.message}
            receiver={message.received}
            timestamp={message.timestamp}
          />
        ))}
      </div>

      <div className='chat__footer'>
        <InsertEmoticon />
        <form>
          <input
            value={input}
            placeholder='Type a message'
            type='text'
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessageHandler} type='submit'>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
