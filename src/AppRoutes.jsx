import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./home/Home"
import Character from "./character/Character"
import PlaceAndFeel from "./placefeel/PlaceAndFeel"
import WhoAndWhat from "./whowhat/WhoAndWhat"
import CharacterGenerator from "./character/CharacterGenerator"
import WhoAndWhatG from "./whowhat/WhoAndWhatG"
import PlaceAndFeelG from "./placefeel/PlaceAndFeelG"
import ArtGalleryPage from "./gallery/ArtGalleryPage"
import ChatPage from "./chat/ChatPage"
import Login from "./userPage/auth/Login"
import Register from "./userPage/auth/Register"
import MyPage from "./userPage/user/MyPage"
import Friends from "./userPage/user/Friends"
import LikedPosts from "./userPage/user/LikedPosts"
import PrivateChat from "./userPage/user/PrivateChat"
import FriendRequests from "./userPage/user/FriendRequests"
import UserPage from "./userPage/user/UserPage"
import { isLoggedIn } from "./userPage/auth/authUtils"

const AppRoutes = ({ onLogin, onRegister }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/draw" element={<Character />} />
      <Route path="/character" element={<Character />} />
      <Route path="/place" element={<PlaceAndFeel />} />
      <Route path="/who-and-what" element={<WhoAndWhat />} />
      <Route path="/CharacterGenerator" element={<CharacterGenerator />} />
      <Route path="/WhoAndWhatG" element={<WhoAndWhatG />} />
      <Route path="/PlaceAndFeelG" element={<PlaceAndFeelG />} />
      <Route path="/art-gallery" element={<ArtGalleryPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/register" element={<Register onRegister={onRegister} />} />
      <Route
        path="/MyPage/*"
        element={isLoggedIn() ? <MyPage /> : <Navigate to="/login" />}
      >
        <Route path="friends" element={<Friends />} />
        <Route path="liked-posts" element={<LikedPosts />} />
        <Route path="private-chat" element={<PrivateChat />} />
        <Route path="friend-requests" element={<FriendRequests />} />
      </Route>
      <Route path="/UserPage/:userId" element={<UserPage />} />
    </Routes>
  )
}

export default AppRoutes