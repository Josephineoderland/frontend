import React, { useState, useEffect } from "react"
import "../css/generate.css"
import { jsonApiRequest } from "../utils/api"

const PlaceAndFeelG = () => {
  const [feeling, setFeeling] = useState("")
  const [place, setPlace] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    // fetch("https://my-art-server.onrender.com/api/placeFeel/feelings")
    jsonApiRequest("GET", "/api/placeFeel/feelings")
      .then((response) => response.json())
      .then((data) => {
        const randomFeeling = data[Math.floor(Math.random() * data.length)]
        setFeeling(randomFeeling)
      })
      .catch((error) => console.error("Error fetching feelings:", error))

      // fetch("https://my-art-server.onrender.com/api/placeFeel/places")
    jsonApiRequest("GET", "/api/placeFeel/places")
      .then((response) => response.json())
      .then((data) => {
        const randomPlace = data[Math.floor(Math.random() * data.length)]
        setPlace(randomPlace)
      })
      .catch((error) => console.error("Error fetching places:", error))
  }

  const generateRandom = () => {
    fetchData()
    setShowContent(true)
  }

  return (
    <div className="Random">
      <div className="feeling-section">
        <h2>Random Feeling:</h2>
        {showContent && <p>{feeling}</p>}
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