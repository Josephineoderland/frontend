import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import FriendRequestForm from "./FriendRequestForm"

axios.defaults.baseURL = "https://my-art-server.onrender.com"

const UserPage = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/userId/${userId}`)
        setUser(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  const handleRequestSent = () => {
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>User not found.</div>
  }

  return (
    <div>
      <h1>{user.username}'s Page</h1>
      <FriendRequestForm userId={userId} onRequestSent={handleRequestSent} />
    </div>
  )
}

export default UserPage
