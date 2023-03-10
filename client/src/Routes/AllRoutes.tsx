import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GameOver from '../components/Game/GameOver'
import Round1 from '../components/Game/Round1'
import Round2 from '../components/Game/Round2'
import Round3 from '../components/Game/Round3'
import Round4 from '../components/Game/Round4'
import Home from '../pages/Home'
import Lobby from '../pages/Lobby'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/round1" element={<Round1 />} />
        <Route path="/round2" element={<Round2 />} />
        <Route path="/round3" element={<Round3 />} />
        <Route path="/round4" element={<Round4 />} />
        <Route path="/gameover" element={<GameOver />} />
    </Routes>
  )
}

export default AllRoutes