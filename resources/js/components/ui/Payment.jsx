import {useContext, useEffect, useState} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import CheckoutButton from "../Modals/CheckoutButton.jsx";
import {Link} from "react-router-dom";
import * as React from "react";
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";
import {ImageExpand} from "@/components/ImageExpand.jsx";

export const Payment = () => {
  const {totalPrice} = useContext(CartContext);
  const {invoiceError, setPaymentPic, paymentPic} = useContext(InvoiceContext);
  const {GoogleMaps, placeId} = useContext(GoogleMapsContext);
  const options = [
    {value: '1', text: 'ABA - $$$'},
    {value: '2', text: 'ABA - KHR'},
  ];
  const [selected, setSelected] = useState(1);
  const handleChange = event => {
    setSelected(Number(event.target.value));
  };

  const [imgExpand, setImgExpand] = useState(false);

  return (
    <>
      {/*google map and exchange rate ui*/}
      <div className="lg:px-16 md:px-12 md:flex justify-between md:mb-12">
        <div className="md:w-[50%] w-full md:mb-0 mb-3">
          <GoogleMaps height={250}/>
        </div>
        <div className="md:text-xl text-base flex flex-col items-end px-6">
          <div>
            <span className="underline underline-offset-[2px]">Exchange Rate:</span> <span
            className="font-bold text-grayFactory">&#x17DB;{(4100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
          <div className="text-end mb-6">Total: <span
            className="font-bold text-blueActive">${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span>
            <span
              className="font-bold text-tealBase">| &#x17DB;{(totalPrice * 4100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
        </div>
      </div>

      {/*payment ui*/}
      <div
        className="bg-tealActive lg:px-12
        lg:flex lg:justify-between lg:border border-blackFactory
        md:py-6 md:flex md:flex-row md:justify-around md:items-start
        p-2 flex flex-col gap-2 justify-center overflow-hidden">
        {/*left section parent*/}
        <div className="lg:flex-1 lg:flex lg:flex-row lg:items-start
          md:flex md:flex-col md:gap-y-3 md:items-start
          grid grid-cols-3 gap-2">
          {/*payment method selection*/}
          <div className="lg:flex lg:flex-col lg:mr-6
            md:flex md:flex-col md:gap-x-2 md:px-0 md:order-1
            flex flex-col gap-x-2
            ">
            <h1 className="tracking-wider text-whiteFactory font-bold
            md:text-[24px] text-[14px]">Payment
            </h1>
            <select
              value={selected}
              onChange={event => handleChange(event)}
              className="bg-whiteFactory py-0 px-2 rounded-sm w-full
              md:text-base text-blackFactory font-semibold text-[10px]">
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="md:hidden"></div>
          {/* for grid*/}
          <div className="md:hidden"></div>
          {/* for grid*/}
          <div className="md:hidden"></div>
          {/* for grid*/}
          <div className="md:order-2">
            {/*payment method selection*/}
            {selected === 1 &&
              <img className={`object-contain
              md:w-[200px] md:h-[200px] md:mt-0 mt-2
              `} src="/assets/images/qr-dollars.jpg"
                   alt=""/>}

            {selected === 2 &&
              <img className={`object-contain
              md:w-[200px] md:h-[200px] md:mt-0 mt-2
              `} src="/assets/images/qr-riel.jpg"
                   alt=""/>}
          </div>
          <div className="md:hidden"></div>
          {/* for grid*/}
        </div>
        {/*right section parent*/}
        <div className="lg:flex-1 lg:flex lg:flex-col
           md:flex md:flex-col
           grid grid-cols-3 gap-2 md:px-0">
          <div className="">
            <p className="md:font-bold text-[#D9D9D9] md:text-base text-[12px] whitespace-nowrap">
              Submit Screenshot
            </p>
            <label
              className="cursor-pointer lg:inline-flex md:px-3 md:py-1 md:w-60
                flex px-2 py-[0.1rem] bg-whiteFactory rounded-lg text-[#989A9C]
                md:text-base text-[12px] w-fit" htmlFor="files">
              Select Image
              <input className='hidden' type="file"
                     id="files" accept="image/*"
                     onChange={(e) => {
                       // cartItem.paymentError = '';
                       setPaymentPic(e.target.files[0])
                     }}/>
            </label>
          </div>
          <div className="md:hidden"></div>
          {/* for grid*/}
          <div className="md:hidden"></div>
          {/* for grid*/}
          <div className="md:hidden"></div>
          {/* for grid*/}
          <div className="flex flex-col gap-y-2 md:items-start items-center">
            <div className="text-redBase text-xs">{invoiceError && invoiceError?.payment_pic?.map((error, pos) => <span key={pos}>{error}</span>)}
            </div>
            {paymentPic &&
              <>
                <div className="">
                  <img onClick={(e) => {
                   e.stopPropagation();
                   setImgExpand(true);
                  }} className="md:w-[250px] object-contain"
                       src={URL.createObjectURL(paymentPic)} alt=""/>
                  <ImageExpand imgSrc={URL.createObjectURL(paymentPic)} open={imgExpand} setOpen={setImgExpand}/>
                </div>
                <div className="flex gap-x-2">
                  <button className="rounded-md md:text-base text-[14px] bg-redHover text-whiteFactory px-2 py-1"
                          onClick={() => setPaymentPic('')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                  </button>
                  <label
                    className="text-center rounded-md md:text-base text-[14px] text-whiteFactory bg-blueBase px-2 py-1"
                    htmlFor="files">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                    </svg>
                  </label>
                </div>
              </>
            }
          </div>
          <div className="md:hidden"></div>
        </div>
      </div>

      <div className="flex justify-between sm:px-12 mt-6 ">
        <Link
          className={`transition px-2 py-1 shadow-md shadow-blueBase duration-500 font-semibold text-blueActive flex justify-center items-center cursor-pointer hover:text-whiteFactory hover:bg-blueBase
          md:text-base text-sm`}
          to={'/shop'}>
          Browse product
        </Link>
        <div className="flex items-center gap-x-2">
          <CheckoutButton />
        </div>
      </div>
    </>
  )
    ;
};
