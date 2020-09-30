import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ receiver, name, message, timestamp }) => {
  const receiverClass = receiver ? 'chat__receiver' : '';
  return (
    <p className={`chat__message ${receiverClass}`}>
      <span className='chat__name'>{name}</span>
      {message}
      <span className='chat__timestamp'>{timestamp}</span>
    </p>
  );
};

export default ChatMessage;
