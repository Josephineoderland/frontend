import React from "react"
import "../css/Character.css"
import IconSVG from "../assets/Chevron.svg"
import ImgOne from "../assets/pexels-craytive-1478477.jpg"
import ImgTwo from "../assets/pexels-messalaciulla-2831797.jpg"
import { Link } from "react-router-dom"

const Character = () => {
  const handleScroll = () => {
    const element = document.querySelector(".page-img")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="character-page">
      <div className="character-title">Random Character Generator</div>
      <div className="text">
        <p>
          Struggling with a creative dry spell? Introducing our random character
          generator, your go-to solution when inspiration runs dry! Our
          generator constructs unique characters with intricate details spanning
          from nose shape to hairstyle. Whether you're crafting a new
          protagonist for your story or simply seeking a muse for your artwork,
          our generator offers the creative spark you need. Prepare to be
          captivated by the diverse combinations of features, from facial
          expressions to clothing styles, that our algorithm can conjure.
          Jumpstart your creativity with our random character generator and
          explore a realm brimming with infinite possibilities!
        </p>
      </div>
      <div className="character-btn">
        <Link to="/CharacterGenerator" className="generate-btn">
          Generate Character
        </Link>
      </div>

      <div className="arrow-more">
        <p onClick={handleScroll}>More</p>
        <img
          src={IconSVG}
          alt="SVG Icon"
          onClick={handleScroll}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="page-img">
        <div className="one-container">
          <img src={ImgOne} alt="img one" className="one" />
          <h2>Lorem Ipsum</h2>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
        <div className="two-container">
          <img src={ImgTwo} alt="img two" className="two" />
          <h2>Lorem Ipsum</h2>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
        <div className="three-container">
          <img src={ImgOne} alt="img three" className="three" />
          <h2>Lorem Ipsum</h2>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
        <div className="fore-container">
          <img src={ImgTwo} alt="img fore" className="fore" />
          <h2>Lorem Ipsum</h2>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
      </div>
    </div>
  )
}

export default Character