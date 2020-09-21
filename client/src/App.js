import React from 'react';
import './App.css';
import Chat from './containers/Chat';
import Sidebar from './containers/Sidebar';

function App() {
  return (
    <div className='app'>
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
