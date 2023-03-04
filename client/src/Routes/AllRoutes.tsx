import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Round1 from '../components/Game/Round1'
import Round2 from '../components/Game/Round2'
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
<<<<<<< HEAD
        <Route path="/lobby" element={<Lobby />} />
=======
        <Route path="/round1" element={<Round1 />} />
        <Route path="/round2" element={<Round2 />} />
>>>>>>> 84d9e231495c9a6542ca3c832b2e2018fe01eb1f
    </Routes>
  )
}

export default AllRoutes