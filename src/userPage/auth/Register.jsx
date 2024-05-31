import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { getUserIdFromToken } from "../auth/authUtils"
import userIcon from "../../assets/user_1251070.png"
import passwordIcon from "../../assets/lock_12484073.png"
import "../../css/log-reg.css"
import fillImg from "../../assets/Namnlöst-8.png"
import { apiRequest } from "../../utils/api" // Importera din API-funktion

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const navigate = useNavigate()

  const handleRegister = useCallback(async () => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)
    if (profileImage) {
      formData.append("profileImage", profileImage)
    }

    try {
      const response = await apiRequest(
        "POST",
        "auth/register",
        {
          // Multer hanterar Content-Type för multipart/form-data automatiskt.
        },
        formData
      )

      if (response.status !== 201) {
        const responseData = await response.json()
        throw new Error(responseData.message || "Registration failed.")
      }

      const data = await response.json()
      const token = data.token
      localStorage.setItem("token", token)
      const loggedInUserId = getUserIdFromToken(token)
      onRegister(token)
      setRegistered(true)
      onRegister(loggedInUserId)
    } catch (error) {
      setError(error.message || "Registration failed.")
    } finally {
      setIsLoading(false)
    }
  }, [username, password, profileImage, onRegister])

  useEffect(() => {
    if (registered) {
      const timeout = setTimeout(() => {
        navigate("/home")
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [registered, navigate])

  useEffect(() => {
    setIsFormComplete(username !== "" && password !== "")
  }, [username, password])

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0])
  }

  return (
    <div className="fill-container">
      <div className="fill-in">
        <div className="fill-title">
          <h3>Register Now</h3>
        </div>
        <div className="input-container">
          <img
            src={userIcon}
            alt="User Icon"
            className="input-icon user-icon"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            disabled={isLoading}
          />
        </div>
        <div className="input-container">
          <img
            src={passwordIcon}
            alt="Password Icon"
            className="input-icon password-icon"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isLoading}
          />
        </div>
        <div className="input-container">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            disabled={isLoading}
          />
        </div>
        <div className="fill-img">
          <img src={fillImg} alt="User Icon" className="input-img" />
        </div>
        <button
          className="fill-button"
          onClick={handleRegister}
          disabled={isLoading || !isFormComplete}
        >
          {isLoading
            ? "Loading..."
            : registered
            ? "You are now registered and logged in!"
            : "Register"}
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default Register
