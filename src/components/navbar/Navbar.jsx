import React from "react";
import "./Style.css";
//import { Tabs, Tab } from "@material-ui/core";
import { NavLink } from "react-router-dom";


function Navbar() {
  // const navigate = useNavigate();
 

  return (
    <div>
      <div className="sidebar-main-div">
        <div style={{ color: "white" }}>
          <ul>
        <li className="li-div"><NavLink exact activeClassName="active" to='/dashboard' >DASHBOARD</NavLink></li>
                <li className="li-div" ><NavLink activeClassName="active" to='/backlog'>BACKLOGS </NavLink></li>
                <li className="li-div"><NavLink activeClassName="active" to='/project'>PROJECT</NavLink></li>
                </ul>
       
          {/* <Tabs
            orientation="vertical"
            
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Dashboard"  />
            <Tab label="Backlogs"  />
            <Tab label="Project"  />
            
          </Tabs> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
