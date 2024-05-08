import React from "react"
import ImageCarousel from "./ImageCarousel"
import "../css/Home.css"

const Home = () => {
  return (
    <div className="page">
      <ImageCarousel />
      <div className="scrolling-text-container">
      <div className="scrolling-text"> Out of ideas? We can help! </div>
      </div>
    </div>
  )
}

export default Home
