"use client"
import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"

const useGetMessages = () => {
  const { selectedConversation, messages, setMessages } = useConversation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!selectedConversation?._id) {
      setMessages([])
      setLoading(false)
      return
    }

    const conversationId = selectedConversation._id

    setMessages([])
    setLoading(true)

    // Load from localStorage
    const storedMessages = JSON.parse(localStorage.getItem(`messages_${conversationId}`)) || []

    if (Array.isArray(storedMessages) && storedMessages.length > 0) {
      setMessages(storedMessages)
      setLoading(false)
    }

    // Fetch from API
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${conversationId}`)
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        const data = await res.json()
        const apiMessages = Array.isArray(data) ? data : []

        const currentMessages = useConversation.getState().messages
        const safeCurrentMessages = Array.isArray(currentMessages) ? currentMessages : []

        // Only merge if current messages are newer (have messages not in API response)
        const newerMessages = safeCurrentMessages.filter(
          (current) => !apiMessages.some((api) => api._id === current._id),
        )

        const finalMessages = [...apiMessages, ...newerMessages]

        // Remove duplicates and sort
        const unique = Array.from(new Map(finalMessages.map((msg) => [msg._id, msg])).values())
        unique.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

        setMessages(unique)
        localStorage.setItem(`messages_${conversationId}`, JSON.stringify(unique))
      } catch (err) {
        console.error("Failed to fetch messages:", err)
        if (storedMessages.length === 0) {
          setMessages([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [selectedConversation?._id, setMessages])

  return { messages: Array.isArray(messages) ? messages : [], loading }
}

export default useGetMessages
