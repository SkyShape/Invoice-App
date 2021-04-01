import React from "react";
import ReactDom from "react-dom";
import "../styles/Delete.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function Delete() {
  const {
    data,
    setData,
    idx,
    info,
    confDelete,
    setConfDelete,
  } = useGlobalContext();

  if (!confDelete) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div
        className="darken-bg"
        style={{ zIndex: "100" }}
        onClick={(e) => {
          setConfDelete(false);
        }}
      >
        <div
          className="delete__component"
          onClick={(e) => {
            // prevent event bubbling
            e.stopPropagation();
          }}
        >
          <h2>Confirm Deletion</h2>
          <p>
            {`Are you sure you want to delete invoice #${info.id}? This action cannot be
        undone.`}
          </p>
          <div className="delete__component__btns">
            <button
              className="edit btn"
              onClick={() => {
                setConfDelete(false);
              }}
            >
              <h3>Cancel</h3>
            </button>
            <Link to="/">
              <button
                className="delete btn"
                onClick={() => {
                  setData((data) => data.filter((el, i) => i !== idx));
                }}
              >
                <h3>Delete</h3>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
