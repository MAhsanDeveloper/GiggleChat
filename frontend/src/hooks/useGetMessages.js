import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (!selectedConversation?._id) return;

    // Always parse and check if it's an array
    let storedMessages;
    try {
      storedMessages = JSON.parse(
        localStorage.getItem(`messages_${selectedConversation._id}`)
      );
    } catch {
      storedMessages = [];
    }
    if (Array.isArray(storedMessages)) {
      setMessages(storedMessages);
    } else {
      setMessages([]);
    }

    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        if (Array.isArray(data)) {
          setMessages(data);
          localStorage.setItem(
            `messages_${selectedConversation._id}`,
            JSON.stringify(data)
          );
          
        } else {
          setMessages([]);
        }
      } catch (error) {
        toast.error(error.message);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages: Array.isArray(messages) ? messages : [], loading };
};

export default useGetMessages;
