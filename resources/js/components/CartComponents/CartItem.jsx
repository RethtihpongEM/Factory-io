import React, {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import {Link} from "react-router-dom"
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import UserContext from "../../context/UserContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
const imgUrl = import.meta.env.VITE_APP_URL;
export const CartItem = (props) => {
  const {item} = props;
  const {
    increaseItemQty,
    decreaseItemQty,
    cartItem,
    setCartItem,
    saveLocalCartItem,
    handleQty,
    setItemQty,
    itemQty,
  } = useContext(CartContext);
  useEffect(() => {
    setItemQty(item.qty);
  }, [item.qty])
  const {token} = useAuthContext();
  // if (token) {
  //
  // }

  return (
    <div className="flex md:items-center justify-between border-2 border-tealActive shadow-2xl
      lg:px-12 lg:text-base
      md:px-3 md:text-sm
      px-2 py-3 text-[12px]">
      <div className="flex-1 inline-flex items-center gap-x-6">
        {/*item image*/}
        <div>
          {
            (item.image === null || item.image === undefined)
              ? <img className="md:w-[150px] w-[100px]" src="/assets/images/makerio.png" alt={item.name}/> :
              <img className="md:w-[150px] w-[100px]" src={`${imgUrl}/${item.image}`} alt={item.name}/>
          }
          {/*<img width="150" src={`/assets/images/${stockItem?.image ?? 'makerio.png'}`} alt=""/>*/}
        </div>

        {/*item descriptions*/}
        <div>
          <div className="mb-1 font-bold text-blueBase">${item.price}</div>
          <Link to={`/item/${item.id}`}>
            <div className="highlight-hover transition duration-150 mb-1 text-tealHover font-bold">{item.name}</div>
          </Link>
          <div className="mb-1 text-blackFactory">Item Type: {item.type}</div>
          <div className="mb-1 flex items-center md:gap-x-2">
            <button
              className="transition duration-150 px-3 py-1 hover:rounded-[50%] hover:bg-whiteFactory active:bg-grayFactory"
              onClick={() => {
                decreaseItemQty(item)
              }}>-
            </button>
            <input
              type="text"
              min="1"
              value={item.qty}
              pattern="/[^0-9]/g"
              onChange={event => {
                setItemQty(Number(event.target.value));
                handleQty(event, item)
              }}
              className="text-center text-sm border-tealActive w-[20%] md:py-2 p-0"
              placeholder={item.qty}
            />
            <button
              className="transition duration-150 px-3 py-1 hover:rounded-[50%] hover:bg-whiteFactory active:bg-grayFactory"
              onClick={() => {
                increaseItemQty(item)
              }}>+
            </button>
            <span className="text-redBase text-xs">{item.warning}</span>
          </div>
          <p className={"md:inline hidden"}>
            <span className="underline underline-offset-2">Sub-total:</span>
            <span className="font-bold text-redBase">${item.qty * item.price}</span>
          </p>
          <p className="text-redBase text-xs">
            {item.errorStatus}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className="mb-auto">
          <button onClick={() => {
            cartItem.splice(cartItem.indexOf(item), 1);
            saveLocalCartItem(cartItem);
            setCartItem([...cartItem]);
          }}>
            <img className="lg:w-[20px] md:w-[16px] w-[12px]" src="/assets/images/trashcan.png" alt=""/>
          </button>
        </div>
        <p className={"md:hidden mt-auto"}>
          <span className="underline underline-offset-2 text-xs">Sub-total:</span>
          <span className="font-bold text-redBase text-xs">${item.qty * item.price}</span>
        </p>
      </div>
    </div>
  );

};

