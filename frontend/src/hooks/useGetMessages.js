'use client';

import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedConversation?._id) return;

    const conversationId = selectedConversation._id;

    // Load from localStorage
    const storedMessages =
      JSON.parse(localStorage.getItem(`messages_${conversationId}`)) || [];
    if (Array.isArray(storedMessages) && storedMessages.length > 0) {
      setMessages(storedMessages);
    }

    // Fetch from API
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/messages/${conversationId}`);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        const apiMessages = Array.isArray(data) ? data : [];

        // Merge with stored
        const merged = [...(Array.isArray(storedMessages) ? storedMessages : []), ...apiMessages];

        // Remove duplicates
        const unique = Array.from(
          new Map(merged.map(msg => [msg._id, msg])).values()
        );

        // Sort by date
        unique.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        setMessages(unique);
        localStorage.setItem(`messages_${conversationId}`, JSON.stringify(unique));
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setMessages([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages: Array.isArray(messages) ? messages : [], loading };
};

export default useGetMessages;
