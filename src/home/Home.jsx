import React from "react"
import { Link } from "react-router-dom"
import ImageCarousel from "./ImageCarousel"
import RecentMessages from "./RecentMessages"
import "../css/Home.css"
import artGalleryImage from "../assets/pexels-tima-miroshnichenko-5725589.jpg"

const Home = () => {
  return (
    <div className="home-page">
      <div className="page">
        <ImageCarousel />
        <div className="scrolling-text-container">
          <h2 className="scrolling-text"> Out of ideas? We can help! </h2>
        </div>
      </div>
      <div className="art-map-container">
        <div className="art-map">
          <Link to="/art-gallery">
            <img src={artGalleryImage} alt="Explore Art Galleries" />
            <h1 className="overlay-text">Find an Art Gallery Near You</h1>
          </Link>
        </div>
      </div>
      <div className="scrolling-text-container">
        <h2 className="scrolling-text"> Recent Messages! </h2>
      </div>
      <RecentMessages />
    </div>
  )
}

export default Home
