import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

const useUnreadMessages = create(
  subscribeWithSelector((set, get) => ({
    unreadCounts: (() => {
      try {
        return JSON.parse(localStorage.getItem("unread-counts") || "{}")
      } catch {
        return {}
      }
    })(),

incrementUnread: (conversationId) => {
  set((state) => {
    const newCounts = {
      ...state.unreadCounts,
      [conversationId]: (state.unreadCounts?.[conversationId] || 0) + 1,
    };
    try {
      localStorage.setItem("unread-counts", JSON.stringify(newCounts));
    } catch (error) {
      console.error("Failed to save unread counts:", error);
    }
    return { unreadCounts: newCounts }; // return updated state
  });
},


  clearUnread: (conversationId) => {
    set((state) => {
      const newCounts = { ...state.unreadCounts }
      delete newCounts[conversationId]
        try {
          localStorage.setItem("unread-counts", JSON.stringify(newCounts))
        } catch (error) {
          console.error("Failed to save unread counts:", error)
        }
      return { unreadCounts: newCounts }
    })
  },

  getUnreadCount: (conversationId) => {
    return get().unreadCounts?.[conversationId] || 0
  },

  markAsRead: (conversationId) => {
    const currentCounts = get().unreadCounts
    if (currentCounts[conversationId]) {
    set((state) => {
      const newCounts = { ...state.unreadCounts }
      delete newCounts[conversationId]
   try {
            localStorage.setItem("unread-counts", JSON.stringify(newCounts))
          } catch (error) {
            console.error("Failed to save unread counts:", error)
          }
          return { unreadCounts: newCounts }
        })
      }
    },
  })),
)

export default useUnreadMessages;
