import React from "react"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"
import SearchComponent from "../components/SearchComponent"
import "../../css/myPage.css"

const MyPage = () => {
  return (
    <div>
      <Sidebar />
      <h1>My Page</h1>
      <SearchComponent />
      <Outlet />
    </div>
  )
}

export default MyPage
