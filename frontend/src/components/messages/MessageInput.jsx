/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = ({ isMobile }) => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const messageToSend = message.trim();
    setMessage("");
    await sendMessage(messageToSend);
    resizeTextarea(); // reset height after sending
  };

  // Auto resize logic
  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [message]);

  // Keep input visible when keyboard opens
  useEffect(() => {
    if (isMobile) {
      const handleFocus = () => {
        setTimeout(() => {
          textareaRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 300);
      };
      textareaRef.current?.addEventListener("focus", handleFocus);
      return () =>
        textareaRef.current?.removeEventListener("focus", handleFocus);
    }
  }, [isMobile]);

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <textarea
          ref={textareaRef}
          rows="1"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`resize-none overflow-hidden border text-sm rounded-lg block w-full p-2.5 bg-base-200 border-r text-base-content pr-12 ${
            isMobile ? "text-base" : ""
          }`}
          style={{
            fontSize: isMobile ? "16px" : undefined,
            minHeight: "44px",
            lineHeight: "1.4",
          }}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-base-content hover:text-base-100 transition-colors"
          disabled={loading || !message.trim()}
        >
          {loading ? (
            <div className="loading loading-spinner w-5 h-5"></div>
          ) : (
            <BsSend className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
