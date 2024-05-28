import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getUserIdFromToken } from "../auth/authUtils"
import userIcon from "../../assets/user_1251070.png"
import passwordIcon from "../../assets/lock_12484073.png"
import "../../css/log-reg.css"
import fillImg from "../../assets/Namnlöst-8.png"

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        "https://my-art-server.onrender.com/auth/register",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.status !== 201) {
        throw new Error(response.data.message || "Registreringen misslyckades.")
      }

      const data = response.data
      const token = data.token
      localStorage.setItem("token", token)
      const loggedInUserId = getUserIdFromToken(token)
      onRegister(token)
      setRegistered(true)
      onRegister(loggedInUserId)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

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
        <div className="fill-img">
          <img src={fillImg} alt="User Icon" className="input-img" />
        </div>
        <button
          className="fill-button"
          onClick={handleRegister}
          disabled={isLoading || !isFormComplete}
        >
          {isLoading
            ? "Loading ..."
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
