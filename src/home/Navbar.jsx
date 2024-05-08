import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import "../css/Navbar.css"

const Navbar = () => {
  const [isToggled, setToggle] = useState(false)

  const navContainer = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const navList = {
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.07,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const navItem = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  }

  const items = ["Home", "Products", "Services", "About"]

  return (
    <>
      <div className="navbar-header">
        <h1 className="navbar-title">
          ArtCanva
          <span
            style={{ padding: "5px", letterSpacing: "0" }}
            class="brand-mark"
          >
            S
          </span>
        </h1>
        <button className="btn" onClick={() => setToggle(!isToggled)}>
          =
        </button>
      </div>
      <AnimatePresence>
        {isToggled && (
          <motion.div
            className="navbar"
            initial="hidden"
            animate={isToggled ? "visible" : "hidden"}
            exit="hidden"
            variants={navContainer}
          >
            <motion.ul
              className="navList"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navList}
            >
              {items.map((item) => (
                <motion.li className="nav-item" variants={navItem} key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
