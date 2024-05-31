import React, { useState, useEffect, useCallback } from "react"

import "../css/ChatPage.css"
import { apiRequest, jsonApiRequest } from "../utils/api"

const ChatPage = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [charCount, setCharCount] = useState(0)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFileUploading, setIsFileUploading] = useState(false)
  const [fileName, setFileName] = useState("my file")
  const [userName, setUserName] = useState("")
  const [likedMessages, setLikedMessages] = useState([])

  useEffect(() => {
    setIsLoading(true)
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await jsonApiRequest("GET", "/messages")
      const data = await response.json()
      setMessages(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching messages:", error)
      setIsLoading(false)
    }
  }
  const sendMessage = useCallback(
    async (e) => {
      e.preventDefault()
      if (newMessage.length > 140) {
        setError("Message exceeds 140 characters")
        return
      }
      if (!userName.trim()) {
        setError("User name is required")
        return
      }

      try {
        const formData = new FormData()
        formData.append("text", newMessage)
        formData.append("user", userName)
        if (imageFile) {
          formData.append("image", imageFile)
        }
    
        
        const response = await jsonApiRequest("POST", "/messages", {
          text: newMessage,
          user: userName,
        })
    
        if (response.ok) {
          const data = await response.json()
          setMessages([...messages, data])
          setNewMessage("")
          setImageFile(null)
          setUserName("")
          setCharCount(0)
          setIsFileUploading(false)
        } else {
          console.error("Failed to send message, Response:", response)
          setIsFileUploading(false)
        }
      } catch (error) {
        console.error("Error sending message:", error)
        setIsFileUploading(false)
      }
    },
    [newMessage, userName, imageFile, messages]
  )

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setFileName(file.name)
      setIsFileUploading(true)
    }
  }

  useEffect(() => {
    if (imageFile) {
      const uploadFile = async () => {
        try {
          const formData = new FormData()
          formData.append("file", imageFile)

          const response = await apiRequest("POST", "/messages", {}, formData)

          if (response.ok) {
            setIsFileUploading(false)
          } else {
            console.error("Failed to upload file, Response:", response)
            setIsFileUploading(false)
          }
        } catch (error) {
          console.error("Error uploading file:", error)
          setIsFileUploading(false)
        }
      }

      uploadFile()
    }
  }, [imageFile])

  const getTimeSinceMessage = (createdAt) => {
    const now = new Date()
    const messageDate = new Date(createdAt)
    const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60))

    if (diffInMinutes < 5) {
      return "now"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      const minutes = diffInMinutes % 60
      return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${
        minutes !== 1 ? "s" : ""
      } ago`
    } else {
      const month = (messageDate.getMonth() + 1).toString().padStart(2, "0")
      const day = messageDate.getDate().toString().padStart(2, "0")
      return `${month}/${day}`
    }
  }

  const toggleLike = async (messageId, actionType) => {
    try {
      let newLikes = 0
      if (actionType === "like") {
        newLikes = 1
      } else if (actionType === "unlike") {
        newLikes = -1
      }

      const response = await jsonApiRequest("POST", `/messages/${messageId}/like`, {
        likes: newLikes
      })
  

      if (response.ok) {
        const updatedMessages = messages.map((message) => {
          if (message._id === messageId) {
            return { ...message, likes: message.likes + newLikes }
          }
          return message
        })

        // Uppdatera likedMessages baserat på åtgärden
        if (actionType === "like" && !likedMessages.includes(messageId)) {
          setLikedMessages([...likedMessages, messageId])
        } else if (
          actionType === "unlike" &&
          likedMessages.includes(messageId)
        ) {
          setLikedMessages(likedMessages.filter((id) => id !== messageId))
        }

        setMessages(updatedMessages)
      } else {
        console.error("Failed to toggle like/unlike, Response:", response)
      }
    } catch (error) {
      console.error("Error toggling like/unlike:", error)
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const renderImage = (image) => {
    return (
      <img
        src={`https://my-art-server.onrender.com/${image}`}
        alt="Messages img"
      />
    )
  }

  return (
    <div className="chat-container">
      <form className="my-form" onSubmit={sendMessage}>
        <h3 className="text-label">Your Name</h3>
        <input
          type="text"
          id="newMessageInput"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="..."
          className="input-field"
        />
        <h3 className="text-label">Write your message here</h3>
        <input
          type="text"
          id="newMessageInput"
          name="newMessage"
          value={newMessage}
          onChange={(e) => {
            const inputValue = e.target.value
            setNewMessage(inputValue)
            setCharCount(inputValue.length)
            setError("")
          }}
          placeholder="..."
          className="input-field"
        />
        <p className={charCount > 140 ? "char-count exceeded" : "char-count"}>
          {charCount}/140 characters
        </p>
        {error && <p style={{ color: "#FFADAD" }}>{error}</p>}
        <div className="file-upload-container">
          <p htmlFor="fileUpload" className="file-upload-label">
            Choose a file: <span className="file-name">{fileName}</span>
          </p>
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            onChange={handleFileUpload}
            className="file-upload-input"
          />
          {isFileUploading && (
            <p className="uploading-message">Uploading file...</p>
          )}
        </div>
        <button
          className="fill-button"
          type="submit"
          disabled={isFileUploading}
        >
          Send
        </button>
      </form>
      <h2 className="title">Chat</h2>
      <div className="message-list">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <span className="user-name">{message.user}:</span>
            <span className="message-text">{message.text}</span>
            {message.image && renderImage(message.image)}
            <div className="message-footer">
              <button
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() =>
                  toggleLike(
                    message._id,
                    likedMessages.includes(message._id) ? "unlike" : "like"
                  )
                }
              >
                 {likedMessages.includes(message._id) ? "❤️️" : "♥"}{" "}
                {message.likes}
              </button>
              <small>{getTimeSinceMessage(message.createdAt)}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatPage
