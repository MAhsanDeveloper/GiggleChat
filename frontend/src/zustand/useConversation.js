import { create } from "zustand";

const initialConversation =
  JSON.parse(localStorage.getItem("selectedConversation")) || null;

const useConversation = create((set) => ({
  selectedConversation: initialConversation,
  setSelectedConversation: (selectedConversation) => {
    if (selectedConversation) {
      localStorage.setItem(
        "selectedConversation",
        JSON.stringify(selectedConversation)
      );
    } else {
      localStorage.removeItem("selectedConversation");
    }
    set({ selectedConversation });
  },
  messages: [],
  setMessages: (messages) =>
    set({
      messages: Array.isArray(messages) ? messages : [],
    }),
}));

export default useConversation;
