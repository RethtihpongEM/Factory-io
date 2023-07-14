import React, {useContext, useEffect, useRef, useState} from "react";
import {CartItem} from "../../components/CartComponents/CartItem.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {Payment} from "../../components/ui/Payment.jsx";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";
import {Dropdown} from "flowbite-react";
import UserContext from "../../context/UserContext.jsx";
import Axios from "axios";
import {getLatLng} from "use-places-autocomplete";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

export const CartView = () => {
  const {user, isLoading} = useAuthContext();
  const {cartItem, getCartItem} = useContext(CartContext);
  const {
    checkAddress,
    setAddress,
    address,
    latitude,
    longitude,
    getAddress,
    userAddress,
    getUserAddress,
    getLtLgPl,
    placeId,
    setPlaceId
  } = useContext(GoogleMapsContext);
  const {invoiceError} = useContext(InvoiceContext);

  useEffect(() => {
    getUserAddress(user?.id)
    getCartItem();
  }, [])

  useEffect(() => {
    checkAddress(placeId)
  }, [placeId, latitude, longitude])

  const ref = useRef();

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }

  const handleNewAddress = () => {
    ref.current.focus();
    setAddress('');
  }

  useEffect(() => {
    const defaultAddress = async (user) => {
      await Axios.get(`getLastAddress/${user?.id}`).then(({data}) => {
        if (data) {
          setAddress(data?.address);
          setPlaceId(data?.placeId)
        } else {
          navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            getAddress(latitude, longitude)
          })
        }
      })
    }
    defaultAddress(user);
  }, [])

  const DropDownLabel = () => {
    return (
      <span className={"text-[12px]"}>Select Address</span>
    )
  }

  return (
    <div>
      {/*<AddressForm />*/}
      <div className="w-full flex md:flex-row md:gap-0 flex-col gap-y-3 md:mb-3 mb-6 justify-between">
        <div className="font-bold text-blueBase text-lg">Cart</div>
        <div className="flex flex-col
            xl:w-[50%]
            lg:w-[60%] lg:text-base
            md:w-[60%] md:text-xs">
          <div className={`md:flex-row md:gap-0 flex flex-col gap-2 ${cartItem.length <= 0 && 'hidden'}`}>
            <div className="whitespace-nowrap md:self-center self-end">
              <Dropdown style={{padding: 0, border: "none", backgroundColor: "#18264B"}} label={<DropDownLabel/>}>
                {userAddress?.filter(address => address.user_id === user?.id)?.map(address => {
                  return (
                    <Dropdown.Item dismissOnClick={true} onClick={() => {
                      setAddress(address.address)
                      setPlaceId(address.placeId)
                      getLtLgPl(address.placeId)
                    }} key={address.id}>
                      {address.address}
                    </Dropdown.Item>
                  )
                })}
                <Dropdown.Item onClick={handleNewAddress}>
                  Another Address?
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="w-full flex flex-col">
              <textarea ref={ref} id="search-dropdown"
                        className={"w-full text-sm ring-2 ring-tealHover font-semibold bg-tealActive text-blackFactory px-3 py-2 rounded-md"}
                        value={address}
                        onChange={event => handleAddressChange(event)}
                        placeholder="#, Street No., ..." required>
              </textarea>
              <span className="text-redHover text-sm">{invoiceError && invoiceError[0]?.addressError}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-3 pb-6 border-b-2 border-tealActive mb-6">
        {cartItem.length === 0 && 'Empty Cart'}
        {cartItem.map((item, pos) => {
          if (item.id) {
            return (
              <CartItem key={pos} item={item}/>
            );
          }
        })}
      </div>
      <Link
        className={`${cartItem.length > 0 && 'hidden'} transition px-2 py-1 shadow-md shadow-blueBase duration-500 font-semibold text-blueActive cursor-pointer hover:text-whiteFactory hover:bg-blueBase`}
        to={'/shop'}>
        Browse product
      </Link>
      <div className={`${cartItem.length === 0 && 'hidden'}`}>
        <Payment/>
      </div>
    </div>
  );

};
