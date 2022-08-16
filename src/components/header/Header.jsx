import React from 'react'
import './Style.css'
import { AccountCircle } from '@material-ui/icons'

const Header = () => {
  return (
    <div>
      <div className='header-main-div'>
       <div style={{display:"flex",width:"95%",alignItems:"center"}}>
         <img 
         width="60px"
         height='50px'
         src="https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png"
         alt="" />
         <h2 style={{color:"white"}}>iTaskManagement</h2>
       </div>
       
       <div style={{display:"flex",width:"6%",alignItems:"center"}}>
        <AccountCircle fontSize='large' style={{color:"white"}} />
       </div>
      </div>
      
        
    </div>
  )
}

export default Header
