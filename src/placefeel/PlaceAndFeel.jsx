import "../css/Draw.css"
import IconSVG from "../assets/Chevron.svg"
import ImgOne from "../assets/drawN.jpg"
import ImgTwo from "../assets/drawNA.jpg"
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
      <div className="under-title">
        <h3>Random Place And Mood Generator</h3>{" "}
      </div>
      <div className="text">
        <p>
          Feeling stuck in a rut? Enter our random place and mood generator,
          your ultimate remedy for creative block! Our innovative tool crafts
          vivid settings and evocative atmospheres, transporting you to realms
          both fantastical and familiar. Whether you're shaping the backdrop for
          your next narrative masterpiece or seeking inspiration for your visual
          artistry, our generator provides the spark you crave. Prepare to
          immerse yourself in a tapestry of landscapes, from bustling cityscapes
          to serene natural wonders, each infused with a spectrum of emotions,
          from joy to melancholy. Embark on a journey of imagination with our
          random place and mood generator, and unlock a universe brimming with
          boundless possibilities!
        </p>
      </div>
      <div className="character-btn">
        <Link to="/PlaceAndFeelG" className="generate-btn">
          Generate Place And Mood
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
        <div className="container">
          <img src={ImgOne} alt="img one" className="one" />
          <h3>Lorem Ipsum</h3>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
        <div className="container">
          <img src={ImgTwo} alt="img two" className="two" />
          <h3>Lorem Ipsum</h3>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
        <div className="container">
          <img src={ImgOne} alt="img three" className="three" />
          <h3>Lorem Ipsum</h3>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
        <div className="container">
          <img src={ImgTwo} alt="img fore" className="fore" />
          <h3>Lorem Ipsum</h3>
          <p>Lorem ipsum lorem ipsum lorem ipsum</p>
        </div>
      </div>
    </div>
  )
}

export default Character
