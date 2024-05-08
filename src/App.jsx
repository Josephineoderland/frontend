import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.jsx"
import Home from "./home/Home.jsx"
import Navbar from "./home/Navbar"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
