import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import inv from "./data.json";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const infoFormat = {
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientEmail: "",
    clientName: "",
    createdOn: "",
    description: "",
    id: "",
    items: [{ total: "" }],
    paymentDue: "",
    paymentTerms: "1",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    status: "",
    total: "",
  };

  const [data, setData] = useState([...inv]);
  const [info, setInfo] = useState({ ...infoFormat });
  const [chosenId, setChosenId] = useState([]);
  const [idx, setIdx] = useState(0);

  const [statuses, setStatuses] = useState({
    draft: false,
    pending: false,
    paid: false,
  });
  const [confDelete, setConfDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  useEffect(() => {
    const json = localStorage.getItem("testObj");
    if (json) {
      setData(JSON.parse(json));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("testObj", JSON.stringify(data));
    if (data.length === 0) {
      setData([...inv]);
    }
  });

  const handleCancel = () => {
    setEdit(false);
    setShowForm(false);
  };

  const onSubmit = (dat) => {
    let total = 0;
    dat.items.map((el) => {
      el.total = el.quantity * el.price;
      total += parseInt(el.total);
    });
    if (edit) {
      const final = {
        ...info,
        ...dat,
        status: "pending",
        total,
      };

      setInfo({
        ...info,
        ...final,
      });
      data.splice(idx, 1, final);
      setData([...data]);
      handleCancel();
    } else {
      setData([
        ...data,
        { ...info, ...dat, id: idGen(), status: "pending", total },
      ]);
      handleCancel();
    }
  };

  const idGen = function () {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };


  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        useWindowSize,
        setChosenId,
        chosenId,
        info,
        setInfo,
        statuses,
        setStatuses,
        infoFormat,
        idx,
        setIdx,
        confDelete,
        setConfDelete,
        showForm,
        setShowForm,
        edit,
        setEdit,
        handleCancel,
        onSubmit,
        idGen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
