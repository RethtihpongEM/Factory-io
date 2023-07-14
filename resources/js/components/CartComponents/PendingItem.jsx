import {Link} from "react-router-dom";
import React, {useContext} from "react";
import CartContext from "../../context/CartContext.jsx";
const imgUrl = import.meta.env.VITE_APP_URL;
export const PendingItem = (props) => {
  const {invoice_product, date, status} = props.invoice
  const Label = ({status, inv_prd, products}) => {
    if (status === -2) {
      return (
        <>
          {inv_prd.qty > products[0].qty ? 'Not enough stock' : 'In Stock'}
        </>
      )
    }
  }
  const View = ({image, name, price, products, inv_prd}) => {
    return (
      <>
        <div
          className="min-h-[150px] lg:px-12 md:px-6 px-3 md:py-3 py-1 flex mb-3 items-center justify-between border-2 border-tealActive shadow-2xl">
          <div className="flex-1 flex items-center gap-x-6 lg:text-base md:text-sm text-[10px]">
            <div className="md:max-w-[100px] max-w-[90px]">
              {/*<img src={`/assets/images/${image}`} alt=""/>*/}
              {
                (image === null || image === undefined)
                  ? <img src="/assets/images/makerio.png" alt={name}/>
                  : <img src={`${imgUrl}/${image}`} alt={name}/>
              }
            </div>
            <div>
              <Link to={`/item/${products[0].id}`}>
                <div
                  className="highlight-hover transition duration-150 mb-1 text-tealHover md:leading-0 leading-5 font-bold">{name}
                  <sup
                    className={`ml-1 md:text-[13px] md:leading-0 text-[10px] font-bold text-blueActive`}>x{inv_prd.qty}</sup>
                </div>
              </Link>
              <div className="mb-1 text-blackFactory font-semibold">
                    <span className="md:inline hidden">
                      Order date:
                    </span>
                <span
                  className="font-normal">{date}</span></div>
              <div
                className={`${status === -1 && 'text-redBase'} ${status === 1 && 'text-green-600'} ${status === 2 && 'text-tealBase'} ${inv_prd.qty > products[0].qty ? 'text-orange-400' : 'text-green-500'} mb-1 font-semibold text-blackFactory`}>
                {/*{status === -1 && 'Pending'}*/}
                {/*{status === 1 && 'Accepted'}*/}
                {/*{status === 2 && 'Delivering'}*/}
                <Label products={products} inv_prd={inv_prd} status={status}/>
              </div>
            </div>
          </div>

          <div className="md:text-base text-xs">
            <span className="font-bold text-redBase"> ${inv_prd.qty * price}</span>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      {invoice_product?.map((inv_prd) => {
        const {products} = inv_prd;
        const {image, name, price} = products[0];
        return (
          <View key={inv_prd?.id} inv_prd={inv_prd} name={name} image={image} products={products} price={price}/>
        );
      })}
    </>
  );
};
