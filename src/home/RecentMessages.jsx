import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../css/RecentMessages.css"

const RecentMessages = () => {
  const [recentMessages, setRecentMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecentMessages = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          "https://my-art-server.onrender.com/messages"
        )
        const data = await response.json()
        const sortedMessages = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setRecentMessages(sortedMessages.slice(0, 3))
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching recent messages:", error)
        setIsLoading(false)
      }
    }

    fetchRecentMessages()
  }, [])

  const handleMessageClick = () => {
    navigate("/chat")
  }

  if (isLoading) {
    return <p>Loading recent messages...</p>
  }

  return (
    <div className="recent-messages-container">
      {recentMessages.map((message) => (
        <div
          key={message._id}
          className="recent-message"
          onClick={handleMessageClick}
        >
          <span className="recent-message-user">{message.user}:</span>
          <span className="recent-message-text">{message.text}</span>
          {message.image && (
            <img
              src={`https://my-art-server.onrender.com/${message.image}`}
              alt="Message"
              className="recent-message-image"
            />
          )}
          <div className="recent-message-footer">
            <small>{new Date(message.createdAt).toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecentMessages
