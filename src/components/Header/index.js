import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header-part d-flex">
      <div className="header-part-heading">
        CSM1
      </div>
      <div className="header-part-infomation">
        <Link to="" className="header-part-infomation-home">
          Home
        </Link>
        <Link to="" className="header-part-infomation-about">
          About
        </Link>
        <Link to="" className="header-part-infomation-bell">
          <img src="assests/images/bell-icon.png" alt="" />
        </Link>
        <Link to="" className="header-part-infomation-avatar">
          <img src="assests/images/manager-avatar.png" alt="" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
