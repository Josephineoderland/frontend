import React from "react"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/MyPage/friends">Your Friends</Link>
        </li>
        <li>
          <Link to="/MyPage/liked-posts">Your Liked Posts</Link>
        </li>
        <li>
          <Link to="/MyPage/private-chat">Privat chatt</Link>
        </li>
        <li>
          <Link to="/MyPage/friend-requests">Friend Requests</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
