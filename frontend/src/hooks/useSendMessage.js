"use client"

import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { selectedConversation, setMessages } = useConversation()

  const sendMessage = async (message) => {
    if (!selectedConversation?._id) return

    setLoading(true)
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      // data is now the full array of messages!
      if (Array.isArray(data)) {
        // Get current messages to merge with API response
        const currentMessages = useConversation.getState().messages
        const safeCurrentMessages = Array.isArray(currentMessages) ? currentMessages : []

        // Merge current messages with API response
        const merged = [...safeCurrentMessages, ...data]

        // Remove duplicates based on message ID
        const unique = Array.from(new Map(merged.map((msg) => [msg._id, msg])).values())

        // Sort by creation date
        unique.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

        setMessages(unique)
        localStorage.setItem(`messages_${selectedConversation._id}`, JSON.stringify(unique))
      }
    } catch (error) {
      setError(error)
      toast.error(error.message)
      // Don't clear messages on error
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading, error }
}

export default useSendMessage
