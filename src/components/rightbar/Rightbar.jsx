import React from "react";
import Topbar from "../topbar/Topbar";

const Rightbar = ({ children }) => {
  return (
    <div className="rightbar-container">
      <Topbar />
      {children}
    </div>
  );
};

export default Rightbar;
