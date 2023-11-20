import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css'
//import { socketAtom } from '../store/atoms/socketState';

import JoinRoomPage from './components/JoinRoomPage';
import ChatPage from "./components/ChatPage";
import io from 'socket.io-client';
import { createContext } from 'react';
import { Socket } from 'socket.io-client';
//import { useSetRecoilState } from 'recoil';
import { Server_URL } from '../config.ts'

const socket = io(Server_URL);
export const SocketContext = createContext<Socket | null>(null);

function App() {

  //const setSocketState = useSetRecoilState(socketAtom);
  //setSocketState(socket)
  document.title = "ChatRoom"

  return (
    <SocketContext.Provider value={socket}>
    <div>
        <Router>
          <Routes>
            <Route path="/" element={<JoinRoomPage />} />
            <Route path="chat" element={<ChatPage />} />
          </Routes>
        </Router>
    </div>
    </SocketContext.Provider>
  )
}

export default App;