import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (!selectedConversation?._id) return; // Use consistent `_id`

    // ✅ Load messages from localStorage first
    const storedMessages = JSON.parse(localStorage.getItem(`messages_${selectedConversation._id}`));
    if (storedMessages) {
      setMessages(storedMessages);
    }

    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        // ✅ Only update localStorage if new data exists
        if (Array.isArray(data) && data.length > 0) {
          setMessages(data);
          localStorage.setItem(`messages_${selectedConversation._id}`, JSON.stringify(data));
        } else {
          setMessages([]); // Reset messages if response is not an array or empty
        }
      } catch (error) {
        toast.error(error.message);
        setMessages([]); // Reset messages in case of error
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;