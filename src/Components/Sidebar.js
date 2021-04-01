import React from "react";

import logo from "../assets/logo.png";
import "../styles/Sidebar.css";
import avatar from "../assets/image-avatar.jpg";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={logo} alt="logo" className="sidebar__logo" />
      <section className="sidebar__section">
        <img src={avatar} className="sidebar__section__avatar" alt="avatar" />
      </section>
    </div>
  );
}

export default Sidebar;
