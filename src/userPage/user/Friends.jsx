import React, { useState, useEffect } from "react"
import axios from "axios"
import { getUserIdFromToken } from "../auth/authUtils"
import { Link } from "react-router-dom"

const Friends = () => {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("No token available")
          return
        }

        const loggedInUserId = getUserIdFromToken(token)

        const response = await axios.get(`/friends/friends/${loggedInUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setFriends(response.data)
        setLoading(false)
      } catch (error) {
        setError("Failed to load friends.")
        setLoading(false)
      }
    }

    fetchFriends()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2>Vänner</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>
            <Link to={`/UserPage/${friend._id}`}>{friend.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Friends
