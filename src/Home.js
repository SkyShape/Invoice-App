import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import "./styles/Home.css";
import arrowRight from "./assets/icon-arrow-right.svg";
import HomeTop from "./Components/HomeTop";
import Form from "./Components/Form";

function Home() {
  const {
    data,
    setChosenId,
    statuses,
    setInfo,
    infoFormat,
    setConfDelete,
    showForm,
    setShowForm,
  } = useGlobalContext();

  useEffect(() => {
    setInfo({ ...infoFormat });
    setShowForm(false);
    setConfDelete(false);
  }, []);

  return (
    <>
      <div className={showForm ? "darken-bg" : ""}>
        <div className="info__component flex-vertical">
          <HomeTop />
          <Form />
          {data.map((el) => {
            const { id, paymentDue, clientName, total, status } = el;
            if (
              statuses[status] === true ||
              (statuses.draft === statuses.paid &&
                statuses.paid === statuses.pending &&
                statuses.draft === statuses.pending)
            ) {
              return (
                <Link
                  onClick={() => {
                    setChosenId(id);
                  }}
                  to={`/invoice/${id}`}
                  style={{ textDecoration: "none" }}
                  className="flex-horizontal width list"
                  key={id}
                >
                  <ul className="info__component--section1">
                    <li>
                      <h3>
                        <span className="hashtag">#</span>
                        {id || "-"}
                      </h3>
                    </li>
                    <li>
                      Due{" "}
                      {new Date(paymentDue).toDateString() === "Invalid Date"
                        ? "-"
                        : new Date(paymentDue).toDateString().slice(4)}
                    </li>
                    <li>{clientName || "-"}</li>
                  </ul>
                  <ul className="info__component--section2">
                    <li>
                      <h2>${total || "0.00"}</h2>
                    </li>
                    <li
                      className={`${
                        status === "paid"
                          ? "paid status"
                          : status === "pending"
                          ? "pending status"
                          : status === "draft"
                          ? "draft status"
                          : "status"
                      }`}
                    >
                      <h3>{status || "-"}</h3>
                    </li>
                    <img src={arrowRight} alt="" />
                  </ul>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
