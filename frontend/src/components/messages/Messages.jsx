import { useEffect, useRef, useCallback } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";
import useUnreadMessages from "../../hooks/useUnreadMessages";
import Message from "./Message";

const Messages = () => {
  const { messages = [], loading } = useGetMessages();
  const { selectedConversation } = useConversation();
    const markAsRead = useUnreadMessages((state) => state.markAsRead)
  useListenMessages();
  const lastMessageRef = useRef(null);
  const messagesWrapperRef = useRef(null);

  // Memoize scroll function
  const scrollToBottom = useCallback((behavior = "smooth") => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior, block: "end" })
    }
  }, []);

    // Auto-scroll to bottom when conversation changes or messages load
  useEffect(() => {
    if (selectedConversation && messages.length > 0) {
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        setTimeout(() => scrollToBottom("auto"), 50)
      })
    }
  }, [selectedConversation, messages.length, scrollToBottom])

  // Smooth scroll for new messages
  useEffect(() => {
    if (messages.length > 0) {
        requestAnimationFrame(() => {
      scrollToBottom("smooth")
    })
    }
  }, [messages.length, scrollToBottom])


  // Mark messages as read when viewing conversation
   useEffect(() => {
    if (selectedConversation?._id) {
      markAsRead(selectedConversation._id)
    }
  }, [selectedConversation?._id, markAsRead])


  // Handle keyboard focus scroll
  useEffect(() => {
    const input = document.getElementById("chat-input")
    const handleFocus = () => {
      setTimeout(() => {
        scrollToBottom("smooth")
      }, 300)
    }

    input?.addEventListener("focus", handleFocus)
    return () => {
      input?.removeEventListener("focus", handleFocus)
    }
  }, [scrollToBottom])

return (
  <div
    ref={messagesWrapperRef}
    className="px-4 flex-1 overflow-auto messages-scrollbar"
  >
    {!loading ? (
      messages?.map((message) => (
        <Message key={message._id} message={message} />
      ))
    ) : (
      [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
    )}

    {!loading && messages.length === 0 && (
      <p className="text-center">Send a message to start the conversation</p>
    )}

    {/* Dummy ref for scrolling */}
    <div ref={lastMessageRef} />
  </div>
);

}

export default Messages;
