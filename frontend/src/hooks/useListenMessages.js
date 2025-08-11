/* eslint-disable no-unused-vars */
"use client"
import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation"
import { useAuthContext } from "../context/AuthContext"
import useUnreadMessages from "./useUnreadMessages"

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages, selectedConversation } = useConversation()
  const { authUser } = useAuthContext()
  const { incrementUnread } = useUnreadMessages()

  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true
      socket.emit("message-delivered", {
        messageId: newMessage._id,
        receiverId: newMessage.receiverId,
      })

      const conversationId = newMessage.senderId === authUser._id ? newMessage.receiverId : newMessage.senderId

      if (String(selectedConversation?._id) === String(conversationId)) {
        socket.emit("message-read", {
          messageId: newMessage._id,
          userId: authUser._id,
        })

        setMessages((prev) => {
          const safePrev = Array.isArray(prev) ? prev : []

          const messageExists = safePrev.some((msg) => msg._id === newMessage._id)
          if (messageExists) {
            return safePrev
          }

          const updatedMessages = [...safePrev, newMessage]
          localStorage.setItem(`messages_${conversationId}`, JSON.stringify(updatedMessages))
          return updatedMessages
        })
      } else {
        incrementUnread(newMessage.senderId)
        const stored = JSON.parse(localStorage.getItem(`messages_${conversationId}`)) || []
        const safeStored = Array.isArray(stored) ? stored : []

        const messageExists = safeStored.some((msg) => msg._id === newMessage._id)
        if (!messageExists) {
          const updatedMessages = [...safeStored, newMessage]
          localStorage.setItem(`messages_${conversationId}`, JSON.stringify(updatedMessages))
        }
      }
    }

    socket.on("newMessage", handleNewMessage)

    return () => {
      socket.off("newMessage", handleNewMessage)
    }
  }, [socket, authUser, selectedConversation, setMessages, incrementUnread])
}

export default useListenMessages
