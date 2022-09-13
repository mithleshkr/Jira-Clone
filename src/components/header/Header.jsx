import React from "react";
import "./Style.css";

//material icons
import { AccountCircle, ExitToApp } from "@material-ui/icons";

//ant design popover for logout
import { Popover } from "@material-ui/core";

//react router
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div className="header-main-div">
        <div
          style={{
            display: "flex",
            width: "95%",
            alignItems: "center",
            paddingLeft: "20px",
          }}
        >
          <img
            style={{ marginRight: "15px" }}
            width="60px"
            height="50px"
            src="https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png"
            alt=""
          />
          <h2 style={{ color: "white" }}>iTaskManagement</h2>
        </div>

        <div style={{ display: "flex", width: "6%", alignItems: "center" }}>
          <AccountCircle
            onClick={handleClick}
            fontSize="large"
            style={{ color: "white", cursor: "pointer" }}
          />
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="logout-popover">
              <p onClick={() => navigate("/")}>
                Log out <ExitToApp fontSize="small" />{" "}
              </p>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
