import React, { useState } from "react";
import { useGlobalContext } from "../context";
import iconPlus from "../assets/icon-plus.svg";
import arrowDown from "../assets/icon-arrow-down.svg";

function HomeTop() {
  const {
    data,
    statuses,
    setStatuses,
    setShowForm,
    useWindowSize,
  } = useGlobalContext();

  const [showFilter, setShowFilter] = useState(false);
  const [innerWidth, innerHeight] = useWindowSize();
 

  const handleChange = (e) => {
    setStatuses({
      ...statuses,
      [e.target.value]: !statuses[e.target.value],
    });
  };

  return (
    <div className="flex-horizontal width home__top">
      <div>
        <h1>Invoices</h1>
        <p>
          {innerWidth > 768
            ? `There are ${data.length} total invoices`
            : `${data.length} invoices`}
        </p>
      </div>

      <div className="flex-horizontal">
        <div
          className="flex-horizontal home__top__filter"
          onClick={() => {
            setShowFilter(!showFilter);
          }}
        >
          <h3>{innerWidth > 768 ? "Filter By Status" : "Filter"}</h3>
          <img
            src={arrowDown}
            alt=""
            className={`${!showFilter ? "arrowDown" : "arrowDown turnAround"}`}
          />
        </div>
        <div className={`${!showFilter ? "invisible" : "filter"}`}>
          <div className="flex-horizontal">
            <input
              type="checkbox"
              name="Draft"
              value="draft"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="Draft"> Draft</label>
          </div>
          <div className="flex-horizontal">
            <input
              type="checkbox"
              name="Pending"
              value="pending"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="checkbox"> Pending</label>
          </div>

          <div className="flex-horizontal">
            <input
              type="checkbox"
              name="Paid"
              value="paid"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="Paid"> Paid</label>
          </div>
        </div>
        <button
          className="home__top__filter__btn"
          onClick={() => {
            setShowForm(true);
          }}
        >
          <img
            src={iconPlus}
            alt=""
            className="home__top__filter__btn__iconplus"
          />
          <h3> {innerWidth > 768 ? "New Invoice" : "New"}</h3>
        </button>
      </div>
    </div>
  );
}

export default HomeTop;
