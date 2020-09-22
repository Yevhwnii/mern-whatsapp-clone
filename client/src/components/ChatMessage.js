import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ receiver }) => {
  const receiverClass = receiver ? 'chat__receiver' : '';
  return (
    <p className={`chat__message ${receiverClass}`}>
      <span className='chat__name'>Breiter</span>
      This is a message
      <span className='chat__timestamp'>{new Date().toUTCString()}</span>
    </p>
  );
};

export default ChatMessage;
