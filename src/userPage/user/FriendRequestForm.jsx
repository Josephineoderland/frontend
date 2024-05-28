import React, { useState } from "react"
import axios from "axios"
import { getUserIdFromToken, isLoggedIn } from "../auth/authUtils"

axios.defaults.baseURL = "https://my-art-server.onrender.com"

const FriendRequestForm = ({ userId, onRequestSent }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const sendFriendRequest = async () => {
    if (!isLoggedIn()) {
      alert("You must be logged in to send a friend request.")
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const loggedInUserId = getUserIdFromToken(token)
      await axios.post(
        `/friends/send/${userId}`,
        { senderId: loggedInUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert("Friend request sent!")
      onRequestSent()
    } catch (error) {
      setError(error.response?.data?.message || "Error sending friend request.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={sendFriendRequest} disabled={loading}>
        {loading ? "Sending..." : "Send Friend Request"}
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default FriendRequestForm
