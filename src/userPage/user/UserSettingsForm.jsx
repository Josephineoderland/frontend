import React, { useState, useEffect } from "react"
import { apiRequest } from "../../utils/api"

const UserSettingsForm = ({
  userId,
  token,
  isEditable = true,
  onPopupToggle,
}) => {
  const [settings, setSettings] = useState({
    email: "",
    instagram: "",
    age: "",
    occupation: "",
    description: "",
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiRequest("GET", "my-page/settings", {
          Authorization: `Bearer ${token}`,
        })
        const data = await response.json()
        setSettings(
          data || {
            email: "",
            instagram: "",
            age: "",
            occupation: "",
            description: "",
          }
        )
      } catch (error) {
        console.error("Error fetching settings:", error)
      }
    }
    fetchSettings()
  }, [token])

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await apiRequest(
        "POST",
        "my-page/settings",
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        JSON.stringify(settings)
      )
      const data = await response.json()
      setSettings(data)
      onPopupToggle(false) // Meddela att popup-formuläret är stängt
    } catch (error) {
      console.error("Error updating settings:", error)
    }
  }

  return (
    <div className="my-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            id="newMessageInput"
            name="email"
            value={settings.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <i className="fab fa-instagram"></i>
          <input
            type="text"
            id="newMessageInput"
            name="instagram"
            value={settings.instagram}
            onChange={handleChange}
            placeholder="Instagram"
          />
        </div>

        <div className="form-group">
          <i className="fas fa-birthday-cake"></i>
          <input
            type="number"
            id="newMessageInput"
            name="age"
            value={settings.age}
            onChange={handleChange}
            placeholder="Age"
          />
        </div>

        <div className="form-group">
          <i className="fas fa-briefcase"></i>
          <input
            type="text"
            id="newMessageInput"
            name="occupation"
            value={settings.occupation}
            onChange={handleChange}
            placeholder="Occupation"
          />
        </div>

        <div className="form-group">
          <i className="fas fa-user-tag"></i>
          <textarea
            name="description"
            id="newMessageInput"
            value={settings.description}
            onChange={handleChange}
            placeholder="About Me"
          ></textarea>
        </div>

        <button
          className="fill-button"
          type="submit"
          style={{ marginTop: "10px" }}
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default UserSettingsForm
