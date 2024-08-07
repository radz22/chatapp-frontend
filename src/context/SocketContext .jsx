import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://chatapp-backend-ckwv.onrender.com");

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);
  const values = {
    socket,
  };
  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
