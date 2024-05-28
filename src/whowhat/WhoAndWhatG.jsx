import React, { useState, useEffect } from "react"
import "../css/generate.css"

const WhoAndWhatG = () => {
  const [character, setCharacter] = useState("")
  const [activity, setActivity] = useState("")
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    fetch("https://my-art-server.onrender.com/api/characters")
      .then((response) => response.json())
      .then((data) => {
        const randomCharacter = data[Math.floor(Math.random() * data.length)]
        setCharacter(randomCharacter.name)
      })
      .catch((error) => console.error("Error fetching characters:", error))

    fetch("https://my-art-server.onrender.com/api/activities")
      .then((response) => response.json())
      .then((data) => {
        const randomActivity = data[Math.floor(Math.random() * data.length)]
        setActivity(randomActivity.name)
      })
      .catch((error) => console.error("Error fetching activities:", error))
  }, [])

  const generateRandom = () => {
    setShowContent(false)

    const characterPromise = fetch(
      "https://my-art-server.onrender.com/api/characters"
    )
      .then((response) => response.json())
      .then((data) => {
        const randomCharacter = data[Math.floor(Math.random() * data.length)]
        setCharacter(randomCharacter.name)
      })
      .catch((error) => {
        console.error("Error fetching characters:", error)
        setCharacter("")
      })

    const activityPromise = fetch(
      "https://my-art-server.onrender.com/api/activities"
    )
      .then((response) => response.json())
      .then((data) => {
        const randomActivity = data[Math.floor(Math.random() * data.length)]
        setActivity(randomActivity.name)
      })
      .catch((error) => {
        console.error("Error fetching activities:", error)
        setActivity("")
      })

    Promise.all([characterPromise, activityPromise]).then(() => {
      setShowContent(true)
    })
  }

  return (
    <div className="Random">
      <div className="character-section">
        <h2>Random Character:</h2>
        {showContent && <p>{character}</p>}{" "}
      </div>
      <div className="activity-section">
        <h2>Random Activity:</h2>
        {showContent && <p>{activity}</p>}{" "}
      </div>
      <div className="character-btn">
        <button className="generate-btn" onClick={generateRandom}>
          Generate Character And Action
        </button>
      </div>
    </div>
  )
}

export default WhoAndWhatG
