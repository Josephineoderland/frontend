import "../css/Draw.css"
import ImgOne from "../assets/Who.jpg"
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
      <div className="under-title">
        <h3>Random Character And Action Generator</h3>{" "}
      </div>
      <div className="text">
        <p>
          Feeling uninspired and in need of a creative boost? Introducing our
          random character and action generator, your go-to solution when
          imagination runs dry! Our innovative tool brings forth a myriad of
          unique characters engaged in captivating actions, from epic quests to
          everyday adventures. Whether you're crafting a new protagonist for
          your story or seeking inspiration for your visual storytelling, our
          generator offers the creative spark you need. Prepare to be enthralled
          by the diverse cast of characters, each embarking on their own
          journey, from daring escapades to heartfelt encounters. Ignite your
          creativity with our random character and action generator, and explore
          a realm filled with infinite storytelling possibilities!
        </p>
      </div>
      <div className="character-btn">
        <Link to="/WhoAndWhatG" className="generate-btn">
          Generate Character And Action
        </Link>
      </div>

      <div className="arrow-more">
        <p onClick={handleScroll}>More</p>
        <i className="fas fa-chevron-down" style={{ cursor: "pointer" }}></i>
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
