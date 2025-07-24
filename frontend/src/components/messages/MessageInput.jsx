import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          id="chat-input"
          type="text"
          className="border text-sm rounded-lg block w-full p-3 outline-none text-black caret-black bg-white placeholder-gray-500"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className=" absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner text-blue-500"></div>
          ) : (
            <BsSend className="text-black" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
