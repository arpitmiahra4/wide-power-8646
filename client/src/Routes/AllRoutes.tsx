import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Lobby from '../pages/Lobby'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lobby" element={<Lobby />} />
    </Routes>
  )
}

export default AllRoutes