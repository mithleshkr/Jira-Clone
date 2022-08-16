import React from 'react'
import Header from '../header/Header'
import Navbar from '../navbar/Navbar'

const Backlogs = () => {
  return (
    <div>
      <Header />
      <div style={{display:"flex"}}>
        
        <Navbar />
        <div >
          This is backlog
        </div>
      </div>
     
    </div>
  )
}

export default Backlogs
