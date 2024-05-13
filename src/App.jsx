import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.jsx"
import Home from "./home/Home.jsx"
import Navbar from "./home/Navbar"
import Character from "./character/Character.jsx"
import CharacterGenerator from "./character/CharacterGenerator"
import ArtGalleryPage from "./gallery/ArtGalleryPage"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/character" element={<Character />} />
        <Route path="/CharacterGenerator" element={<CharacterGenerator />} />
        <Route path="/art-gallery" element={<ArtGalleryPage />} />
      </Routes>
    </Router>
  )
}

export default App
