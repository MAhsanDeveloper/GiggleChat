/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {useSocketContext} from "../context/SocketContext"
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";
import { useAuthContext } from "../context/AuthContext";


const useListenMessages = () => {
  const { authUser } = useAuthContext();

  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  const { selectedConversation } = useConversation();

  useEffect(() => {
 socket?.on("newMessage", (newMessage) => {
  newMessage.shouldShake = true;

  // Emit delivered
  socket.emit("message-delivered", {
    messageId: newMessage._id,
    receiverId: newMessage.receiverId,
  });

  // Check if user is viewing the current conversation
  if (newMessage.senderId === selectedConversation?._id) {
    socket.emit("message-read", {
      messageId: newMessage._id,
      userId: authUser._id,
    });
  }

  const sound = new Audio(notificationSound);
  sound.play();
 setMessages((prev = []) => [...prev, newMessage]);
});
socket?.on("message-delivered", ({ messageId, receiverId }) => {
  setMessages((prev) =>
    prev.map((msg) =>
      msg._id === messageId
        ? { ...msg, deliveredTo: [...(msg.deliveredTo || []), receiverId] }
        : msg
    )
  );
});

socket?.on("message-read", ({ messageId, userId }) => {
  setMessages((prev) =>
    prev.map((msg) =>
      msg._id === messageId
        ? { ...msg, readBy: [...(msg.readBy || []), userId] }
        : msg
    )
  );
});

 return () => {
  socket?.off("newMessage");
  socket?.off("message-delivered");
  socket?.off("message-read");
};

  }, [socket, setMessages, messages]);
};

export default useListenMessages;
