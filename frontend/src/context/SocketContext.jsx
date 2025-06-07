/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://foolish-ailis-gigglechatmafyr-b522f9e2.koyeb.app/", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

socket.on("getOnlineUsers", (users) => 
  { setOnlineUsers(users)

  } 
)

      //cleanup function
    return () =>  socket.close();
      
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{socket, onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};