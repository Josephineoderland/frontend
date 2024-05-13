import React from "react"
import { Link } from "react-router-dom"
import ImageCarousel from "./ImageCarousel"
import "../css/Home.css"
import artGalleryImage from "../assets/pexels-tima-miroshnichenko-5725589.jpg"

const Home = () => {
  return (
    <div className="home-page">
      <div className="page">
        <ImageCarousel />
        <div className="scrolling-text-container">
          <div className="scrolling-text"> Out of ideas? We can help! </div>
        </div>
      </div>
      <div className="art-map">
        <Link to="/art-gallery">
          <img src={artGalleryImage} alt="Explore Art Galleries" />
          <h1 className="overlay-text">Find an Art Gallery Near You</h1>
        </Link>
      </div>
    </div>
  )
}

export default Home
