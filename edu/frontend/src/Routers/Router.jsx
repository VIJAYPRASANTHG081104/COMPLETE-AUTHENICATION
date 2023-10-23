import React from 'react'
import Home from '../Pages/Home'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from '../Pages/login'
import Register from '../Pages/register'

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default Router