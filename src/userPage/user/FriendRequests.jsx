import React, { useState, useEffect } from "react"
import axios from "axios"
import { getUserIdFromToken } from "../auth/authUtils"
import { useNavigate } from "react-router-dom"

axios.defaults.baseURL = "https://my-art-server.onrender.com"

const FriendRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/")
          return
        }

        const loggedInUserId = getUserIdFromToken(token)

        // Fetch received friend requests
        const receivedResponse = await axios.get(
          `/friends/received/${loggedInUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setReceivedRequests(receivedResponse.data)

        // Fetch sent friend requests
        const sentResponse = await axios.get(
          `/friends/sent/${loggedInUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setSentRequests(sentResponse.data)

        setLoading(false)
      } catch (error) {
        setError("Error fetching friend requests.")
        setLoading(false)
      }
    }

    fetchFriendRequests()
  }, [navigate])

  const acceptFriendRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        `/friends/respond`,
        { requestId, status: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setReceivedRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      )
    } catch (error) {
      setError("Error accepting friend request.")
    }
  }

  const rejectFriendRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        `/friends/respond`,
        { requestId, status: "rejected" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setReceivedRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      )
    } catch (error) {
      setError("Error rejecting friend request.")
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2>Received Friend Requests</h2>
      {receivedRequests.length === 0 ? (
        <p>No received friend requests</p>
      ) : (
        <ul>
          {receivedRequests.map((request, index) => (
            <li key={request._id || index}>
              {request.senderId && (
                <>
                  <span style={{ color: "black" }}>
                    {request.senderId.username}
                  </span>{" "}
                  sent you a friend request
                  <button onClick={() => acceptFriendRequest(request._id)}>
                    Accept
                  </button>
                  <button onClick={() => rejectFriendRequest(request._id)}>
                    Reject
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <h2>Sent Friend Requests</h2>
      {sentRequests.length === 0 ? (
        <p>No sent friend requests</p>
      ) : (
        <ul>
          {sentRequests.map((request, index) => (
            <li key={request._id || index}>
              {request.receiverId && (
                <>
                  <span style={{ color: "black" }}>
                    You sent a friend request to {request.receiverId.username}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FriendRequests
