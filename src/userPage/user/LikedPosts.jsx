import React from "react"
import "../../css/likedposts.css" // Kontrollera att sökvägen är korrekt

const Test = () => {
  return (
    <div className="container">
      <nav>
        <a href="#first">
          <i className="far fa-user"></i>
        </a>
        <a href="#second">
          <i class="fas fa-users"></i>
        </a>
        <a href="#third">
          <i class="fas fa-comments"></i>
        </a>
        <a href="#fourth">
          <i class="fas fa-search"></i>
        </a>
        <a href="#fifth">
          <i class="fas fa-exchange-alt"></i>
        </a>
      </nav>

      <div className="container">
        <section id="first">
          <h1>First</h1>
        </section>

        <section id="second">
          <h1>Second</h1>
        </section>

        <section id="third">
          <h1>Third</h1>
        </section>

        <section id="fourth">
          <h1>Fourth</h1>
        </section>

        <section id="fifth">
          <h1>Fifth</h1>
        </section>
      </div>
    </div>
  )
}

export default Test
