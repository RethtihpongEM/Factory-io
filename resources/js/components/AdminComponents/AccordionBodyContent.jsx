import React, {Fragment, useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import AdminPopUp from "../Modals/AdminPopUp.jsx";
import {ImageExpand} from "../ImageExpand.jsx";
import {Accordion, AccordionBody, AccordionHeader} from "@material-tailwind/react";
import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";

const libraries = ['places'];
export const AccordionBodyContent = (props) => {
  const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
      libraries
    }
  );
  const [map, setMap] = useState(/** @type google.maps.Map*/ (null))
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // const {invProd, setInvProd} = props;
  const {totalPrice, status, invoice_product, user, address, placeId} = props.invoice;

  // useEffect(() => {
  //   console.log(invoice_product)
  // }, [])

  const {items, getType} = useContext(ProductContext);
  const {handleQty} = useContext(InvoiceContext);
  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    const geoCode = new google.maps.Geocoder();
    await geoCode.geocode({placeId: placeId})
      .then(({results}) => {
        setLatitude(results[0].geometry.location.lat())
        setLongitude(results[0].geometry.location.lng())
      })
  };

  if(!isLoaded) {
    return <div>Loading...</div>
  }

  if(isLoaded) {
    return (
      <div className="text-blackFactory px-2 flex flex-col gap-1 font-semibold">
        <section className="">
          <div className="
          flex flex-col
          lg:text-base md:text-sm
          text-[10px]
          gap-2 mb-3">
            <div className="flex justify-between">
              <div>Username: {user[0].username}</div>
              <div>Phone Number: {user[0].phoneNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "-")}
              </div>
            </div>
            <Fragment>
              <Accordion open={open}>
                <AccordionHeader className="border-0 p-0" onClick={async () => {
                  setOpen(!open);
                  await handleOpen()
                }}>
                  <div className="flex items-center justify-between bg-tealActive px-2 py-1 rounded-lg w-full">
                    <div className='md:text-sm text-[10px] text-whiteFactory'>
                      {address}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-4 h-4">
                      <path className="text-blueActive" strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path className="text-blueActive" strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                </AccordionHeader>
                <AccordionBody className={`mt-2 border-0 p-0 ${open ? '' : 'hidden'}`}>
                  <GoogleMap
                    center={{lat: latitude, lng: longitude}}
                    zoom={15}
                    mapContainerStyle={{width: 100 + "%", height: 200 + "px"}}
                    onLoad={map => setMap(map)}
                    options={{
                      disableDefaultUI: true,
                      fullscreenControl: true,
                      zoomControl: true
                    }}
                  >
                    <MarkerF position={{lat: latitude, lng: longitude}}/>
                  </GoogleMap>
                </AccordionBody>
              </Accordion>
            </Fragment>

          </div>


          {/*<div>*/}
          {/*  <Fragment>*/}
          {/*    <Accordion open={open}>*/}
          {/*      <AccordionBody className={`mt-2 border-0 p-0 ${open ? '' : 'hidden'}`}>*/}
          {/*        <GoogleMap*/}
          {/*          center={{lat: latitude, lng: longitude}}*/}
          {/*          zoom={15}*/}
          {/*          mapContainerStyle={{width: 100 + "%", height: 200 + "px"}}*/}
          {/*          onLoad={map => setMap(map)}*/}
          {/*          options={{*/}
          {/*            disableDefaultUI: true,*/}
          {/*            fullscreenControl: true,*/}
          {/*            zoomControl: true*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          <MarkerF position={{lat: latitude, lng: longitude}}/>*/}
          {/*        </GoogleMap>*/}
          {/*      </AccordionBody>*/}
          {/*    </Accordion>*/}
          {/*  </Fragment>*/}
          {/*</div>*/}

        </section>
        {invoice_product.map((item) => {
          const stockItem = items?.find((i) => i.id === item.product_id);
          const inputStyle = 'border-none'
          const {products} = item;
          return (
            <section key={item.id} className="
              flex gap-4 items-center justify-between
              lg:text-base md:text-sm
              text-[10px]">
              {/*qty*/}
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                {/*for user view*/}
                <div
                  className={`${user[0]?.acc_type === 1 && 'text-sm'}`}>
                  {item.qty}
                </div>
                {/*--for user view*/}

                {/*for admin to update qty if no stock*/}
                <div className={`${user[0]?.acc_type === 1 ? 'hidden' : 'flex flex-col items-center'}`}>
                  <input onChange={handleQty(invoice_product, item)}
                         min="1"
                         className={`${props.invoice.status >= 2 && inputStyle} max-w-[64px] p-0 border text-center`}
                         disabled={props.invoice.status >= 2}
                         type="text"
                         placeholder={item.qty}/>
                  <div
                    className="text-redBase">{(item.qty > stockItem?.qty && status === -2) && ` Stock QTY: ${stockItem?.qty}`}</div>
                  {/*--for admin to update qty if no stock*/}
                </div>
              </div>
              {/*name*/}
              <div className='flex-1'>
                <div>
                  {products.map((product) => {
                    return product.name
                  })}
                </div>
                {/*type*/}
                <div className={"text-redHover"}>
                  {products.map((product) => {
                    return getType(product?.type)
                  })}
                </div>
              </div>
              {/*subtotal*/}
              <div className={""}>${item.cart_item_price}</div>
            </section>
          );
        })}
        <hr className="border-b-1 border-blackFactory rounded-lg"/>
        <div className={`flex justify-between
      lg:text-base md:text-sm text-[12px]`}>
          <div>Grand Total</div>
          <div>${totalPrice}</div>
        </div>
      </div>
    );
  }
}
