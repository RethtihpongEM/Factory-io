import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {AddToCart} from "@/components/ui/AddToCart.jsx";

const imgUrl = import.meta.env.VITE_APP_URL
export const ItemCardCarousel = ({item}) => {
  const {name, price, id, image, status} = item;
  const {getItem} = useContext(ProductContext);
  const {scrollTop} = useContext(InvoiceContext);
  const {addToCart} = useContext(CartContext);
  const {token} = useAuthContext()
  const navigate = useNavigate()
  return (
    <>
      {/*cart-item */}
      <div className="max-w-[250px] border border-[#59C3CB] p-6 flex flex-col items-center">
        <Link className="flex-1 text-center font-semibold text-xs" onClick={() => {
          getItem(id)
          scrollTop(0)
        }} to={`/item/${id}`}>
          {name}
        </Link>
        <Link className="flex-2" onClick={() => {
          getItem(id)
          scrollTop(0)
        }} to={`/item/${id}`}>
          {
            (image === null || image === undefined)
              ? <img className="hover:scale-75 ease-in-out duration-300" src="/assets/images/makerio.png" alt={name}/>
              : <img className="hover:scale-75 ease-in-out duration-300" src={`${imgUrl}/${image}`}
                     alt={name}/>
          }
        </Link>
        <div className="flex-1 flex">
          <div className="mt-auto flex gap-x-2 items-center">
            <div className="mr-1 font-bold text-[#00727A]">
              {price}$
            </div>
            <div className="text-[#8A0000]">
              <span className="font-bold text-sm">
                {status === 1 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <AddToCart item={item} iconSize={"w-[36px]"}/>
            {/*<button*/}
            {/*  className={" rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300"}*/}

            {/*  onClick={() => {*/}
            {/*    if (token) {*/}
            {/*      addToCart(item);*/}
            {/*    } else {*/}
            {/*      navigate('/login')*/}
            {/*    }*/}
            {/*  }}>*/}
            {/*  <img width="36" src="/assets/images/cart-icon.png" alt=""/>*/}
            {/*</button>*/}
          </div>
        </div>
        {/*<div className="text-redBase text-sm">{!token &&*/}
        {/*  <Link className={'text-blueActive cursor-pointer font-semibold'} to="/signup"> Sign Up</Link>}</div>*/}
      </div>

      {/*cart-item */}
    </>
  );
};
