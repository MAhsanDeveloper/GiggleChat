"use client";

import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import useUnreadMessages from "./useUnreadMessages";
import notificationSound from "../assets/sounds/notification.mp3";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const incrementUnread = useUnreadMessages((state) => state.incrementUnread);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
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
      } else {
        // Increment unread count if not viewing the conversation
        incrementUnread(newMessage.senderId)
      }

      const sound = new Audio(notificationSound);
      sound.play().catch(() => {}); // Ignore audio play errors
   const conversationId =
  newMessage.senderId === authUser._id
    ? newMessage.receiverId
    : newMessage.senderId;

// If current chat is open
if (selectedConversation?._id === conversationId) {
  const updatedMessages = [...messages, newMessage];
  setMessages(updatedMessages);
  localStorage.setItem(
    `messages_${conversationId}`,
    JSON.stringify(updatedMessages)
  );
} else {
  // Don't update messages UI if chat is not open, just update storage and unread
  const stored =
    JSON.parse(localStorage.getItem(`messages_${conversationId}`)) || [];
  const updatedMessages = [...stored, newMessage];
  localStorage.setItem(
    `messages_${conversationId}`,
    JSON.stringify(updatedMessages)
  );
}

    };

    const handleMessageDelivered = ({ messageId, receiverId }) => {
      setMessages((prev) => {
        const updatedMessages = prev.map((msg) =>
          msg._id === messageId
            ? { ...msg, deliveredTo: [...(msg.deliveredTo || []), receiverId] }
            : msg
        );

        // Update localStorage
        if (selectedConversation?._id) {
          localStorage.setItem(
            `messages_${selectedConversation._id}`,
            JSON.stringify(updatedMessages)
          );
        }

        return updatedMessages;
      });
    };

    const handleMessageRead = ({ messageId, userId }) => {
      setMessages((prev) => {
        const updatedMessages = prev.map((msg) =>
          msg._id === messageId
            ? { ...msg, readBy: [...(msg.readBy || []), userId] }
            : msg
        );

        // Update localStorage
        if (selectedConversation?._id) {
          localStorage.setItem(
            `messages_${selectedConversation._id}`,
            JSON.stringify(updatedMessages)
          );
        }

        return updatedMessages;
      });
    };

    socket?.on("newMessage", handleNewMessage);
    socket?.on("message-delivered", handleMessageDelivered);
    socket?.on("message-read", handleMessageRead);

    return () => {
      socket?.off("newMessage", handleNewMessage);
      socket?.off("message-delivered", handleMessageDelivered);
      socket?.off("message-read", handleMessageRead);
    };
  }, [socket, setMessages, selectedConversation, authUser._id, incrementUnread, messages]);
};

export default useListenMessages;
