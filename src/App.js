import React from 'react'
import {  Route,Routes,HashRouter } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/login/Login'
import Signup from './components/registration/Signup'

const App = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/registration' exact element={<Signup />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
