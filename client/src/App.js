import React, { useEffect, useState } from 'react';
import Chat from './containers/Chat';
import Sidebar from './containers/Sidebar';
import Pusher from 'pusher-js';

import axios from './common/axios';

import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/messages/sync').then((res) => {
      setMessages(res.data.messages);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher('1127e3079bb622dfb4a1', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className='app'>
      <div className='app__body'>
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
