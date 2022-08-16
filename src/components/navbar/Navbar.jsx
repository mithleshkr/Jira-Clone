import React from "react";
import "./Style.css";
import { Tabs, Tab } from "@material-ui/core";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="sidebar-main-div">
        <div style={{ color: "white" }}>
       
          <Tabs
            orientation="vertical"
            
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Dashboard"  onClick={()=>navigate('/dashboard')}/>
            <Tab label="Backlogs"  onClick={()=>navigate('/backlog')}/>
            <Tab label="Project" onClick={()=>navigate('/project')} />
            
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
