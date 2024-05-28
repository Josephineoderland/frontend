import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getUserIdFromToken } from "./authUtils"
import "../../css/log-reg.css"
import userIcon from "../../assets/user_1251070.png"
import passwordIcon from "../../assets/lock_12484073.png"
import fillImg from "../../assets/Namnlöst-8.png"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        "https://my-art-server.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Inloggningen misslyckades.")
      }

      const data = await response.json()
      const token = data.token
      localStorage.setItem("token", token)
      onLogin(token)
      setLoggedIn(true)
      const loggedInUserId = getUserIdFromToken(token)
      onLogin(loggedInUserId)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (loggedIn) {
      const timeout = setTimeout(() => {
        navigate("/home")
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [loggedIn, navigate])

  useEffect(() => {
    setIsFormComplete(username !== "" && password !== "")
  }, [username, password])

  return (
    <div className="fill-container">
      <div className="fill-in">
        <div className="fill-title">
          <h3>Login</h3>
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
            disabled={isLoading || loggedIn}
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
            disabled={isLoading || loggedIn}
          />
        </div>
        <div className="fill-img">
          <img src={fillImg} alt="User Icon" className="input-img" />
        </div>

        <button
          className="fill-button"
          onClick={handleLogin}
          disabled={isLoading || loggedIn || !isFormComplete}
        >
          {isLoading
            ? "Loading ..."
            : loggedIn
            ? "You are now logged in!"
            : "Login"}
        </button>

        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default Login
