import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import LoginPage from './Login'
import Chat from './Chat'
import Bug from './Bug'
import RegisterPage from './Signup'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth' element={<LoginPage/>}/>
            <Route path='/authregister' element={<RegisterPage/>}/>
            <Route path='/chat' element={<Chat/>}/>
            <Route path='/bug' element={<Bug/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes