import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages = [], loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef(null);
  const messagesWrapperRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();

    const input = document.getElementById("chat-input");

    const handleFocus = () => {
      // Wait a bit to ensure keyboard is up
      setTimeout(() => {
        scrollToBottom();

        // Scroll container to bottom if height is reduced
        messagesWrapperRef.current?.scrollTo({
          top: messagesWrapperRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    };
    input?.addEventListener("focus", handleFocus);
    return () => {
      input?.removeEventListener("focus", handleFocus);
    };
  }, [messages]);

  return (
    <div ref={messagesWrapperRef} className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}

      {/* Dummy ref for scrolling */}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default Messages;
