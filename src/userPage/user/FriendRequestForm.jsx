import React, { useState } from "react"
import axios from "axios"
import { getUserIdFromToken, isLoggedIn } from "../auth/authUtils"

axios.defaults.baseURL = "https://my-art-server.onrender.com"

const FriendRequestForm = ({ userId, onRequestSent }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const sendFriendRequest = async () => {
    if (!isLoggedIn()) {
      setError("You must be logged in to send a friend request.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")
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
      setSuccess("Friend request sent!")
      onRequestSent()
    } catch (error) {
      const errorMessage = error.response?.data?.message
      if (errorMessage === "You are already friends.") {
        setError("You are already friends.")
      } else {
        setError(errorMessage || "Error sending friend request.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        className="user-button"
        onClick={sendFriendRequest}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Friend Request"}
      </button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  )
}

export default FriendRequestForm
