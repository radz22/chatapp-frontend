import { useState } from "react";
import { SocketProvider } from "./context/SocketContext ";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./components/Home";
function App() {
  return (
    <>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </>
  );
}

export default App;
