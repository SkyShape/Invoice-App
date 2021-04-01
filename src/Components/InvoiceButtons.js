import React from "react";
import { useGlobalContext } from "../context";

function InvoiceButtons() {
  const {
    data,
    setData,
    info,
    setInfo,
    idx,
    setConfDelete,
    setShowForm,
    setEdit,
  } = useGlobalContext();

  const { status } = info;

  return (
    <>
      <button
        className={`${status === "paid" ? "invisible" : "btn edit"}`}
        onClick={() => {
          setEdit(true);
          setShowForm(true);
        }}
      >
        <h3>Edit</h3>
      </button>
      <button
        className="delete btn"
        onClick={() => {
          setConfDelete(true);
        }}
      >
        <h3>Delete</h3>
      </button>
      <button
        className={`${
          status === "paid"
            ? "invisible"
            : status === "draft"
            ? "invisible"
            : "btn markpaid"
        }`}
        onClick={() => {
          data[idx].status = "paid";
          setData([...data]);
          setInfo({ ...data[idx] });
        }}
      >
        <h3>Mark as Paid</h3>
      </button>
    </>
  );
}

export default InvoiceButtons;
