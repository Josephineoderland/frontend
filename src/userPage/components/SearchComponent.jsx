import React, { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

axios.defaults.baseURL = "https://my-art-server.onrender.com"

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [showResults, setShowResults] = useState(true)

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?searchTerm=${searchTerm}`)
      setSearchResult(response.data)
      setShowResults(true)
    } catch (error) {
      console.error("Error searching users:", error)
    }
  }

  const toggleResults = () => {
    setShowResults(!showResults)
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResult.length > 0 && (
        <div>
          <button onClick={toggleResults}>
            {showResults ? "Hide" : "Show"}
          </button>
          {showResults && (
            <div>
              <h2>Search results:</h2>
              <ul>
                {searchResult.map((user) => (
                  <li key={user._id}>
                    <Link to={`/UserPage/${user._id}`}>{user.username}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchComponent
