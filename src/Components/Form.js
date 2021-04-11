import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../context";
import "../styles/Form.css";
import FormButtons from "./FormButtons";
import Item from "./Item";

export default function Form() {
  const { info, edit, showForm, handleCancel, onSubmit } = useGlobalContext();

  const { register, handleSubmit, errors, reset, getValues, watch } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    setTimeout(() => {
      reset({ ...info });
    }, 1000);
  }, [info]);

  if (!showForm) {
    return null;
  }

  return ReactDom.createPortal(
    <div
      className="darken-bg"
      onClick={() => {
        handleCancel();
      }}
    >
      <div
        className="form"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="form__header">
          {edit ? (
            <h1>
              Edit <span className="hashtag">#</span>
              {info.id}
            </h1>
          ) : (
            <h1>New Invoice</h1>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="bill">Bill From</h3>
          <div className="sender">
            <div className="input">
              <label htmlFor="senderAddressStreet">Street Address</label>
              <input
                style={{
                  border: errors.senderAddress?.street ? "1px solid red" : "",
                }}
                type="text"
                placeholder="Chaisubani Street 4"
                name="senderAddress.street"
                ref={register({
                  required: {
                    value: true,
                    message: "You must enter your name",
                  },
                  maxLength: 80,
                })}
              />
              {/* {errors.senderAddress["street"] && (
              <div className="error">{errors.senderAddress.street.message}</div>
            )} */}
            </div>
            <div className="sender__horizontal grid__horizontal">
              <div className="input">
                <label htmlFor="senderAddressCity">City</label>
                <input
                  style={{
                    border: errors.senderAddress?.city ? "1px solid red" : "",
                  }}
                  type="text"
                  placeholder="Tbilisi"
                  name="senderAddress.city"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </div>
              <div className="input">
                <label htmlFor="senderAddressPostCode">Post Code</label>
                <input
                  style={{
                    border: errors.senderAddress?.postCode
                      ? "1px solid red"
                      : "",
                  }}
                  type="text"
                  placeholder="1212"
                  name="senderAddress.postCode"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </div>
              <div className="input grid__third">
                <label htmlFor="senderAddressCountry">Country</label>
                <input
                  style={{
                    border: errors.senderAddress?.country
                      ? "1px solid red"
                      : "",
                  }}
                  type="text"
                  placeholder="Georgia"
                  name="senderAddress.country"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </div>
            </div>
          </div>

          <h3 className="bill">Bill To</h3>
          <div className="input">
            <label htmlFor="clientName">Client's Name</label>
            <input
              style={{ border: errors.clientName ? "1px solid red" : "" }}
              type="text"
              placeholder="John Blaze"
              name="clientName"
              ref={register({ required: true, maxLength: 80 })}
            />
          </div>
          <div className="input">
            <label htmlFor="clientEmail">Client's Email</label>
            <input
              style={{ border: errors.clientEmail ? "1px solid red" : "" }}
              type="email"
              placeholder="ceo@blaze.com"
              name="clientEmail"
              ref={register({ required: true, maxLength: 80 })}
            />
          </div>
          <div className="input">
            <label htmlFor="clientAddressStreet">Street Address</label>
            <input
              style={{
                border: errors.clientAddress?.street ? "1px solid red" : "",
              }}
              type="text"
              placeholder="17 W 32nd Street"
              name="clientAddress.street"
              ref={register({ required: true, maxLength: 80 })}
            />
          </div>
          <div className="client__horizontal grid__horizontal">
            <div className="input">
              <label htmlFor="clientAddressCity">City</label>
              <input
                style={{
                  border: errors.clientAddress?.city ? "1px solid red" : "",
                }}
                type="text"
                placeholder="New York City"
                name="clientAddress.city"
                ref={register({ required: true, maxLength: 80 })}
              />
            </div>
            <div className="input">
              <label htmlFor="clientAddressPostCode">Post Code</label>
              <input
                style={{
                  border: errors.clientAddress?.postCode ? "1px solid red" : "",
                }}
                type="text"
                placeholder="10001"
                name="clientAddress.postCode"
                ref={register({ required: true, maxLength: 80 })}
              />
            </div>
            <div className="input  grid__third">
              <label htmlFor="clientAddressCountry">Country</label>
              <input
                style={{
                  border: errors.clientAddress?.country ? "1px solid red" : "",
                }}
                type="text"
                placeholder="United States"
                name="clientAddress.country"
                ref={register({ required: true, maxLength: 80 })}
              />
            </div>
          </div>
          <div className="client__date grid__horizontal">
            <div className="input">
              <label htmlFor="createdOn">Invoice Date</label>
              <input
                style={{
                  border: errors.createdOn ? "1px solid red" : "",
                }}
                type="date"
                placeholder="createdOn"
                name="createdOn"
                ref={register({ required: true })}
              />
            </div>
            <div className="input">
              <label htmlFor="paymentTerms">Payment Terms</label>
              <select name="paymentTerms" ref={register({ required: true })}>
                <option value="1">Net 1 Day</option>
                <option value="7">Net7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
            </div>
          </div>
          <div className="input">
            <label htmlFor="description">Project Description</label>
            <input
              style={{
                border: errors.description ? "1px solid red" : "",
              }}
              type="text"
              placeholder="Motorcycle Re-Design"
              name="description"
              ref={register({ required: true, maxLength: 80 })}
            />
          </div>

          <Item register={register} info={info} watch={watch} />
        </form>
        <FormButtons
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          getValues={getValues}
          errors={errors}
        />
      </div>
    </div>,
    document.getElementById("portal")
  );
}
