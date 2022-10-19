import React, { useState } from "react";
import { SideBar, Header, Title } from "components";
import "./Layout.css";

const Layout = ({ children, title }) => {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="right-part">
        <Header />
        <Title title={title} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
