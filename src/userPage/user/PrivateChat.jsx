import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { getUserIdFromToken } from "../auth/authUtils"
import { apiRequest } from "../../utils/api"

const PrivateChat = () => {
  const { friendId } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [socket, setSocket] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    // const userId = getUserIdFromToken(localStorage.getItem("token"))
    apiRequest("GET", `/private-chat/messages/${friendId}`, {
      Authorization: `Bearer ${token}`,
    }).then(async (v) => {
      // console.log(await v.text())
      const data = await v.json()
      if (data) {
        data.forEach((msg) => {
          console.log(msg)
        })
        setMessages((prevMessages) => [...data, ...prevMessages])
      }
    })

    const newSocket = io(process.env.REACT_APP_API_HOST, {
      transports: ["websocket"],
      auth: { token },
    })
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [friendId])

  useEffect(() => {
    if (!socket) return

    socket.on("message", (message) => {
      console.log(message)
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.off("message")
    }
  }, [socket])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()

    try {
      const userId = getUserIdFromToken(localStorage.getItem("token"))
      socket.emit("sendMessage", {
        message: newMessage,
        userId: userId,
        receiverId: friendId,
      })
      setNewMessage("")
    } catch (error) {
      console.error("Failed to send message.", error)
    }
  }

  return (
    <div>
      <h2>Private Chat</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.sender}: </strong> {message.text}
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default PrivateChat
