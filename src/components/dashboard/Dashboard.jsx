import React from "react";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div style={{display:"flex"}}>
        
        <Navbar />
        <div >
          This is dashboard
        </div>
      </div>
     
    </div>
  );
};

export default Dashboard;
