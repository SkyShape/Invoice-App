import React from "react";
import "../styles/FormButtons.css";
import { useGlobalContext } from "../context";

export const FormButtons = ({ handleSubmit, onSubmit, getValues }) => {
  const {
    data,
    setData,
    edit,
    idx,
    handleCancel,
    setShowForm,
    setEdit,
    info,
    setInfo,
    idGen,
  } = useGlobalContext();

  const handleDraft = () => {
    let total = 0;
    const draft = { ...info, ...getValues() };
    draft.items.map((el) => {
      el.total = el.quantity * el.price;
      total += parseInt(el.total);
      draft.total = total;
    });
    setInfo({ ...info, ...draft });
    !edit
      ? setData([...data, { ...draft, id: idGen(), status: "draft" }])
      : data.splice(idx, 1, draft);
  };

  return (
    <div className="form__buttons">
      {!edit || info.status == "draft" ? (
        <div className="submit__buttons">
          <button
            className="btn edit"
            onClick={() => {
              setEdit(false);
              handleCancel();
            }}
          >
            <h3>Discard</h3>
          </button>
          <div className="submit__buttons__section">
            <button
              className="btn edit"
              onClick={() => {
                setShowForm(false);
                setEdit(false);
                handleDraft();
              }}
            >
              <h3>Save as Draft</h3>
            </button>

            <button
              className="btn markpaid "
              onClick={() => {
                handleSubmit(onSubmit)();
                setEdit(false);
              }}
            >
              <h3>Save & Send</h3>
            </button>
          </div>
        </div>
      ) : (
        <div className="edit__buttons">
          <button
            className="btn edit"
            onClick={() => {
              setEdit(false);
              handleCancel();
            }}
          >
            <h3>Cancel</h3>
          </button>

          <button
            className="btn markpaid"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            <h3>Save Changes</h3>
          </button>
        </div>
      )}
    </div>
  );
};

export default FormButtons;
