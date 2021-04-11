import React, { useState } from "react";
import { useGlobalContext } from "../context";
import garbage from "../assets/icon-delete.svg";

const Item = ({ register, watch,}) => {
  const { info,} = useGlobalContext();
  const [item, setItem] = useState([...info.items]);

  const addItem = () => {
    setItem((prevItem) => [...prevItem, {}]);
  };

  const removeItem = (index) => {
    setItem((prevItem) => [
      ...prevItem.filter((item, i) => {
        console.log(i !== index);
        return i !== index;
      }),
    ]);
  };

  return (
    <div>
      {item.map((el, i) => {
        const fieldName = `items[${i}]`;
        const quantity = watch(`${fieldName}.quantity`);
        const price = watch(`${fieldName}.price`);
        return (
          <div name={fieldName} key={i}>
            <div className="items">
              <div className="item__input__name">
                <label>
                  Item Name
                  <input
                    // style={{
                    //   border: `${errors?.fieldName?.name}` ? "1px solid red" : "",
                    // }}
                    type="text"
                    name={`${fieldName}.name`}
                    ref={register({ required: true, maxLength: 80 })}
                  />
                </label>
              </div>

              <div className="items__total">
                <div className="items__input__fields">
                  <div className="qty input">
                    <label>
                      Item Qty
                      <input
                        type="number"
                        name={`${fieldName}.quantity`}
                        ref={register({ required: true, maxLength: 5 })}
                      />
                    </label>
                  </div>

                  <div className="price">
                    <label>
                      Item Price
                      <input
                        type="number"
                        name={`${fieldName}.price`}
                        ref={register({ required: true, maxLength: 8 })}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <h3>Total</h3>
                  <h3>{quantity * price || "0.00"}</h3>
                </div>
                <img
                  className="garbage"
                  src={garbage}
                  alt=""
                  onClick={() => {
                    item.length > 1 && removeItem(i);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      <button type="button" onClick={addItem} className="add-item btn">
        <h3>+ Add Item </h3>
      </button>
    </div>
  );
};

export default Item;
