import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useContext, useEffect, useState} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext, {InvoiceProvider} from "../../context/InvoiceContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {Spinner} from "flowbite-react";
import {Link, useNavigate} from "react-router-dom";
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";
import {InvoiceView} from "../ui/InvoiceView.jsx";

export default function CheckoutButton() {
  const {user, token} = useAuthContext();
  const {getType} = useContext(ProductContext);
  const {
    setCartItem,
    cartItem,
    totalPrice,
    success,
    setSuccess,
    clearCart
  } = useContext(CartContext);
  const {
    invoiceError,
    paymentPic,
    setPaymentPic,
    scrollTop,
    validateInvoice,
    storeInvoice
  } = useContext(InvoiceContext);
  const {address} = useContext(GoogleMapsContext);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // getCartItem();
    scrollTop(0);
  }, []);
  const navigate = useNavigate();
  const style = {
    display: "flex",
    flexDirection: "column",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  }

  if (cartItem.length > 0) {
    return (
      <div key={"cart-pay-preview"}>
        <button
          onClick={() => {
            token ? setModalOpen(true) : navigate('/login')
          }}
          className={`transition duration-500 hover:shadow-blueBase hover:shadow-md bg-redHover text-[18px] text-whiteFactory px-4 py-1 rounded-[20px] md:text-base text-sm`}>
          Check out
        </button>

        <Modal
          open={modalOpen}
          // onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <div className="md:w-full w-[270px]">
              <Typography id="modal-modal-title" variant="div">
                Are you sure to proceed order?
              </Typography>
              <Typography variant="div" id="modal-modal-description" sx={{mt: 2}}>
                <section className="flex flex-col gap-3 text-blackFactory mb-3 font-semibold">
                  <section className="text-sm flex">
                    <div className="flex flex-col gap-2">
                      <div>Username:
                        {user?.username}
                      </div>
                      <div className={`bg-[#D9D9D9] w-[90%] px-2 py-1 rounded-lg`}>
                        {address}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div>Phone Number:</div>
                      <div>
                        {user?.phoneNumber}
                      </div>
                    </div>
                  </section>
                  <section className="">
                    {cartItem.map((i) => {
                      return (
                        <div key={i.id} className={`text-sm items-center flex gap-x-2`}>
                          <div className="flex items-center">
                            <div className="whitespace-nowrap">{i.qty}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="w-[70%]">{i.name}</div>
                            <div className="whitespace-nowrap text-redHover">
                              {getType(i.type)}
                            </div>
                          </div>
                          <div className="text-right ">
                            <div className="whitespace-nowrap">${i.cart_item_price}</div>
                          </div>
                        </div>
                      )
                    })}
                  </section>
                  <hr className="border-b-1 border-blackFactory rounded-lg"/>
                  <section className={`text-sm flex justify-between`}>
                    <div>Grand Total</div>
                    <div>${totalPrice}</div>
                  </section>
                </section>

                <section className="flex gap-x-3 justify-center mt-3">
                  <button
                    disabled={!success}
                    className={`${!success && 'bg-tealHover'}
                      flex justify-center gap-x-3 flex-1 transition duration-500 bg-tealActive text-whiteFactory py-2 rounded-md hover:bg-tealHover/80 active:bg-tealActive`}
                    onClick={(e) => {
                      if (token) {
                        e.stopPropagation();
                        setSuccess(false);
                        storeInvoice(totalPrice, cartItem, paymentPic, clearCart, setCartItem, setModalOpen, setSuccess).then(() => {
                          navigate('/order');
                          setPaymentPic('');
                        });
                      }
                    }}>
                    <span>Confirm</span>
                    <div className={`${success && 'hidden'}`}>
                      {!success && <Spinner color="purple" size="md"/>}
                    </div>
                  </button>
                  <button
                    disabled={!success}
                    className={`${!success ? 'bg-grayFactory text-blackFactory' : 'bg-redBase text-whiteFactory hover:bg-redHover active:bg-redActive'}
                      flex-1 transition duration-500 py-2 rounded-md cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalOpen(false)
                    }}>Cancel
                  </button>
                </section>

                <p className="text-xs text-grayFactory text-center mt-3">
                  *Once order is accepted, you cannot cancel it
                </p>
              </Typography>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
}
