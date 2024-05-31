import React, { useState, useEffect } from "react"
import { getUserIdFromToken } from "../auth/authUtils"
import { useNavigate } from "react-router-dom"
import { apiRequest } from "../../utils/api"
import "../../css/chat.css"

const PrivChat = () => {
  const [friends, setFriends] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("No token available")
          return
        }

        const loggedInUserId = getUserIdFromToken(token)
        const response = await apiRequest(
          "GET",
          `/friends/friends/${loggedInUserId}`,
          {
            Authorization: `Bearer ${token}`,
          }
        )

        setFriends(await response.json())
      } catch (error) {
        console.error("Failed to load friends:", error)
      }
    }

    fetchFriends()
  }, [])

  if (friends.length === 0) {
    return <div className="no-friends">You have not added any friends yet.</div>
  }

  return (
    <>
      <div className="title-container">
        <h2>Chat With Friends</h2>
      </div>
      <div className="container-page">
        <ul className="friends-list">
          {friends.map((friend, index) => (
            <li key={index} className="friend-item">
              <p className="friend-name">{friend.username}</p>
              <button
                className="user-button"
                onClick={() => navigate(`/my-page/private-chat/${friend._id}`)}
              >
                Start Chat
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default PrivChat
