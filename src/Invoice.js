import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import "./styles/Invoice.css";
import iconLeft from "./assets/icon-arrow-left.svg";
import Delete from "./Components/Delete";
import InvoiceButtons from "./Components/InvoiceButtons";
import Form from "./Components/Form";

function Invoice() {
  const {
    data,
    chosenId,
    info,
    setInfo,
    setIdx,
    confDelete,
    showForm,
  } = useGlobalContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    data.forEach((el, i) => {
      if (el.id === chosenId) {
        setInfo({ ...el });
        setIdx(i);
      }
    });
  }, []);

  const {
    id,
    createdOn,
    paymentDue,
    description,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = info;

  return (
    <>
      <Form />
      <Delete />
      <div className={showForm || confDelete ? "darken-bg" : ""}>
        <div className="invoice">
          <Link to="/" className="back">
            <img src={iconLeft} alt="" />
            <h3>Go back</h3>
          </Link>
          <div className="top__component box">
            <div className="flex-horizontal">
              <p>Status</p>
              <div
                style={{ ["marginRight"]: "none" }}
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
              </div>
            </div>
            <div className="flex-horizontal top__component__btns">
              <InvoiceButtons />
            </div>
          </div>

          <div className="bottom__buttons">
            <InvoiceButtons />
          </div>

          <div className="bottom__component box">
            <section className="top">
              <div className="id-description">
                <h2>
                  <span className="hashtag">#</span>
                  {id || "-"}
                </h2>
                <p>{description || "-"}</p>
              </div>

              <div className="sender--address">
                <p>{senderAddress.street || "-"}</p>
                <p>{senderAddress.city || "-"}</p>
                <p>{senderAddress.postCode || "-"}</p>
                <p>{senderAddress.country || "-"}</p>
              </div>
            </section>

            <section className="bottom">
              <div className="dates">
                <div>
                  <p className="description">Invoice Date</p>
                  <h2>
                    {new Date(createdOn).toDateString() === "Invalid Date"
                      ? "-"
                      : new Date(createdOn).toDateString().slice(4)}
                  </h2>
                </div>
                <div>
                  <p className="description">Payment Due</p>
                  <h2>
                    {new Date(paymentDue).toDateString() === "Invalid Date"
                      ? "-"
                      : new Date(paymentDue).toDateString().slice(4)}
                  </h2>
                </div>
              </div>

              <div className="client--address">
                <p className="description">Bill To</p>
                <h2 className="description">{clientName || "-"}</h2>
                <p>{clientAddress.street || "-"}</p>
                <p>{clientAddress.city || "-"}</p>
                <p>{clientAddress.postCode || "-"}</p>
                <p>{clientAddress.country || "-"}</p>
              </div>
              <div className="sender">
                <p className="description">Sent To</p>
                <h2>{clientEmail || "-"}</h2>
              </div>
            </section>
            <section>
              <section className="calculations">
                {items.map((el, i) => {
                  if (
                    el.total === undefined ||
                    NaN ||
                    el.quantity === 0 ||
                    "" ||
                    undefined ||
                    el.price === 0 ||
                    ""
                  ) {
                    return items.length > 1 ? (
                      <p key={i} className="description">
                        Not Enough Info
                      </p>
                    ) : (
                      <p key={i} className="description">
                        No Items To Display
                      </p>
                    );
                  } else {
                    return (
                      <div key={i} className="calculations--top">
                        <div className="calculations--top__amount">
                          <h3>{el.name}</h3>
                          <p>{`\$${el.price} x ${el.quantity}`}</p>
                        </div>
                        <div>
                          <h3>${el.total}</h3>
                        </div>
                      </div>
                    );
                  }
                })}
              </section>
              <div className="calculations--bottom">
                <p>Total</p>
                <h2>${total || "0.00"}</h2>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
