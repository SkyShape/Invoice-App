import React from "react";
import "./styles/Invoice.css";
import { Link } from "react-router-dom";
import iconLeft from "./assets/icon-arrow-left.svg";
function Error() {
  return (
    <div className="invoice">
      <h1>Error!</h1>;
      <Link to="/" className="back">
        <img src={iconLeft} alt="" />
        <h3>Go back</h3>
      </Link>
    </div>
  );
}

export default Error;
