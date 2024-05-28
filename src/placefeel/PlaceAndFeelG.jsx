import React, { useState, useEffect } from "react"
import "../css/generate.css"

const PlaceAndFeelG = () => {
  const [feeling, setFeeling] = useState("")
  const [place, setPlace] = useState("")
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    fetch("https://my-art-server.onrender.com/api/placeFeel/feelings")
      .then((response) => response.json())
      .then((data) => {
        const randomFeeling = data[Math.floor(Math.random() * data.length)]
        setFeeling(randomFeeling)
      })
      .catch((error) => console.error("Error fetching feelings:", error))

    fetch("https://my-art-server.onrender.com/api/placeFeel/places")
      .then((response) => response.json())
      .then((data) => {
        const randomPlace = data[Math.floor(Math.random() * data.length)]
        setPlace(randomPlace)
      })
      .catch((error) => console.error("Error fetching places:", error))
  }, [])

  const generateRandom = () => {
    fetch("https://my-art-server.onrender.com/api/placeFeel/feelings")
      .then((response) => response.json())
      .then((data) => {
        const randomFeeling = data[Math.floor(Math.random() * data.length)]
        setFeeling(randomFeeling)
      })
      .catch((error) => console.error("Error fetching feelings:", error))

    fetch("https://my-art-server.onrender.com/api/placeFeel/places")
      .then((response) => response.json())
      .then((data) => {
        const randomPlace = data[Math.floor(Math.random() * data.length)]
        setPlace(randomPlace)
      })
      .catch((error) => console.error("Error fetching places:", error))

    setShowContent(true)
  }

  return (
    <div className="Random">
      <div className="feeling-section">
        <h2>Random Feeling:</h2>
        {showContent && <p>{feeling}</p>}{" "}
      </div>
      <div className="place-section">
        <h2>Random Place:</h2>
        {showContent && <p>{place}</p>}
      </div>
      <div className="character-btn">
        <button className="generate-btn" onClick={generateRandom}>
          Generate Place And Feeling
        </button>
      </div>
    </div>
  )
}

export default PlaceAndFeelG
