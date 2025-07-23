import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedConversation, setMessages } = useConversation();

  const sendMessage = async (message) => {
    if (!selectedConversation?._id) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // data is now the full array of messages!
      if (Array.isArray(data)) {
        setMessages(data);
        localStorage.setItem(
          `messages_${selectedConversation._id}`,
          JSON.stringify(data)
        );
      }
    } catch (error) {
      setError(error);
      toast.error(error.message);
      setMessages([]); // Optional: clear on error
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};

export default useSendMessage;
