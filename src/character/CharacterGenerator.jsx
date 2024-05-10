import React, { useState, useEffect } from "react"
import "../css/CharacterGenerator.css"

const CharacterGenerator = () => {
  const [characterDetails, setCharacterDetails] = useState({})
  const [selectedProperties, setSelectedProperties] = useState({})
  const [categoryVisibility, setCategoryVisibility] = useState({})

  useEffect(() => {
    fetch("https://my-art-server.onrender.com/api/drawing-details")
      .then((response) => response.json())
      .then((data) => {
        setCharacterDetails(data)
        setCategoryVisibility(
          Object.keys(data).reduce((acc, category) => {
            acc[category] = true
            return acc
          }, {})
        )
      })
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  const handleRandomize = () => {
    const newSelectedProperties = {}
    for (const category in characterDetails) {
      const subcategories = characterDetails[category]
      const categoryProperties = {}
      for (const subcategory in subcategories) {
        const properties = subcategories[subcategory]
        const randomProperty =
          properties[Math.floor(Math.random() * properties.length)]
        categoryProperties[subcategory] = randomProperty
      }
      newSelectedProperties[category] = categoryProperties
    }
    setSelectedProperties(newSelectedProperties)
  }

  const toggleCategoryVisibility = (category) => {
    setCategoryVisibility((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }))
  }

  return (
    <div>
      <div className="character-btn">
        <button className="generate-btn" onClick={handleRandomize}>
          Generate Character
        </button>
      </div>
      {Object.keys(characterDetails).map((category) => (
        <div key={category} className={`category-box category-${category}`}>
          <h3 onClick={() => toggleCategoryVisibility(category)}>{category}</h3>
          {categoryVisibility[category] && (
            <ul>
              {Object.keys(selectedProperties[category] || {}).map(
                (subcategory) => (
                  <li key={subcategory}>
                    <strong>{subcategory}:</strong>{" "}
                    {selectedProperties[category][subcategory]}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default CharacterGenerator
