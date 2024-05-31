import React from "react"
import { Link } from "react-router-dom"
import "../../css/sidebar.css"
const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/my-page">
            <i className="far fa-user"></i>
          </Link>
        </li>
        <li>
          <Link to="/my-page/friends">
            <i className="fas fa-users"></i>
          </Link>
        </li>
        <li>
          <Link to="/my-page/chat">
            <i className="fas fa-comments"></i>
          </Link>
        </li>
        <li>
          <Link to="/my-page/search-component">
            <i className="fas fa-search"></i>
          </Link>
        </li>
        <li>
          <Link to="/my-page/friend-requests">
            <i className="fas fa-exchange-alt"></i> 
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
