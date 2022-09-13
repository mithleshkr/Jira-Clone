import React from 'react'
import {  Route,Routes,HashRouter } from 'react-router-dom'
import Backlogs from './components/backlogs/Backlogs'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import Loader from './components/loader/Loader'
import Login from './components/login/Login'
import Navbar from './components/navbar/Navbar'
import Project from './components/project/Project'
import Signup from './components/registration/Signup'


const App = () => {
  return (
    <div>
      
      <HashRouter>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/dashboard'  element={<Dashboard />} />
          <Route path='/registration'  element={<Signup />} />
          <Route path='/header'  element={<Header />} />
          <Route path='/nav'  element={<Navbar />} />
          <Route path='/backlog'  element={<Backlogs />} />
          <Route path='/project'  element={<Project />} />
          <Route path ='/loader' element={<Loader />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
