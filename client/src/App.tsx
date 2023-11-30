import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css'

import LandingPage from './components/Landing.tsx';
import ChatPage from "./components/chat/ChatPage.tsx";
import io from 'socket.io-client';
import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { Server_URL } from '../config.ts'
import { Header } from './components/Header.tsx';

let socket: Socket | null;
if(Server_URL){
  socket = io(Server_URL);
}
export const SocketContext = createContext<Socket | null>(null);

function App() {

  document.title = "ChatRoom"

  return (
    <SocketContext.Provider value={socket}>
    <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="chat" element={<ChatPage />} />
          </Routes>
        </Router>
    </div>
    </SocketContext.Provider>
  )
}

export default App;