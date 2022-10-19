import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar-part">
      <Logo />
      <Link to="/employee-management">Employee Management</Link>
    </div>
  );
}

export default SideBar;
