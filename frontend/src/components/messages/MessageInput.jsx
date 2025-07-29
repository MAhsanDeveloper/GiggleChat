/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = ({isMobile}) => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return

    const messageToSend = message.trim()
    setMessage("") 
    await sendMessage(messageToSend)
  };

    useEffect(() => {
    if (isMobile) {
      const handleResize = () => {
        // Small delay to ensure keyboard is fully shown
        setTimeout(() => {
          if (inputRef.current && document.activeElement === inputRef.current) {
            inputRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        }, 100)
      }

      const handleFocus = () => {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        }, 300)
      }

      window.addEventListener("resize", handleResize)
      inputRef.current?.addEventListener("focus", handleFocus)

      return () => {
        window.removeEventListener("resize", handleResize)
        inputRef.current?.removeEventListener("focus", handleFocus)
      }
    }
  }, [isMobile])

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
     <div className="w-full relative">
        <input
          ref={inputRef}
          id="chat-input"
          type="text"
          inputMode="text"
          autoComplete="off"
          className={`border text-sm rounded-lg block w-full p-2.5 bg-base-200 border-r text-base-content pr-12 ${
            isMobile ? "text-base" : ""
          }`}
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={
            isMobile
              ? {
                  fontSize: "16px", // Prevents zoom on iOS
                  minHeight: "44px", // Better touch target
                }
              : {}
          }
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-base-content hover:text-base-100 transition-colors"
          disabled={loading || !message.trim()}
        >
          {loading ? <div className="loading loading-spinner w-5 h-5"></div> : <BsSend className="w-5 h-5" />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
