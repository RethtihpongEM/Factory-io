import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ProductContext from "../../context/ProductContext.jsx";
import {AddToCart} from "../../components/ui/AddToCart.jsx";

const imgUrl = import.meta.env.VITE_APP_URL;
export const ItemCard = (props) => {
  const navigate = useNavigate()
  const {name, price, id, image, status} = props.item;
  // const {addToCart} = useContext(CartContext);
  //
  // const [open, setOpen] = React.useState(false);
  // const CustomTooltip = styled(({className, ...props}) => (
  //   <Tooltip {...props} arrow classes={{popper: className}}/>
  // ))({
  //   [`& .${tooltipClasses.tooltip}`]: {
  //     backgroundColor: "white",
  //     border: "1px solid #048D95",
  //     fontSize: "12px",
  //     maxWidth: "120px"
  //   },
  //   [`& .${tooltipClasses.arrow}`]: {
  //     color: "#048D95",
  //   },
  // });
  // const handleTooltipClose = () => {
  //   setOpen(false);
  // };
  //
  // const handleTooltipOpen = () => {
  //   props.item?.status === 1 && setOpen(true);
  //   addToCart(props.item);
  // };

  return (
    <>
      {/*cart-item */}
      <div className="flex justify-center">
        <div
          className="min-[1920px]:max-w-[300px] xl:max-w-[260px] lg:max-w-[250px] md:max-w-[250px] max-w-[260px] shadow-2xl border-2 border-tealActive p-6 flex flex-col items-center">
          <Link className="flex-1 text-center font-semibold" to={`/item/${id}`}>
            {name}
          </Link>
          <Link className="flex-2" to={`/item/${id}`}>
            {
              (image === null || image === undefined)
                ?
                <img loading={"lazy"} className="hover:scale-75 ease-in-out duration-300 object-contain"
                     src="/assets/images/makerio.png"
                     alt={name}/>
                : <img loading={"lazy"} className="hover:scale-75 ease-in-out duration-300 object-contain"
                       src={`${imgUrl}/${image}`} alt={name}/>
            }
          </Link>
          <div className="flex-1 flex flex-col items-center">
            <div className="mt-auto flex items-center">
              <div className="mr-3 font-bold text-[#00727A]">
                {price}$
              </div>
              <div className="mr-3 text-[#8A0000]">
                <span className="font-bold">
                  {status === 1 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <AddToCart item={props.item} iconSize={"w-8"}/>
              {/*<ClickAwayListener onClickAway={handleTooltipClose}>*/}
              {/*  <div>*/}
              {/*    <CustomTooltip*/}
              {/*      PopperProps={{*/}
              {/*        disablePortal: true,*/}
              {/*      }}*/}
              {/*      onClose={handleTooltipClose}*/}
              {/*      open={open}*/}
              {/*      placement={"right"}*/}
              {/*      disableFocusListener*/}
              {/*      disableHoverListener*/}
              {/*      title={<span className='text-tealBase'>Item has been added to cart</span>}*/}
              {/*    >*/}
              {/*      <button*/}
              {/*        className={`${props.item?.status === 0 && 'hidden'} rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300`}*/}
              {/*        onClick={handleTooltipOpen}>*/}
              {/*        <img loading={"lazy"} width="36" src="/assets/images/cart-icon.png" alt=""/>*/}
              {/*      </button>*/}
              {/*    </CustomTooltip>*/}
              {/*  </div>*/}
              {/*</ClickAwayListener>*/}


              {/*<Tooltip*/}
              {/*  */}
              {/*  arrow={false}*/}
              {/*  className="text-tealBase border-2 border-tealBase"*/}
              {/*  content={props.item.tooltip && 'Item has been added to cart'}*/}
              {/*  trigger="click"*/}
              {/*  style="light"*/}
              {/*  animation="duration-500"*/}
              {/*>*/}
              {/*  <button*/}
              {/*    className={" rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300"}*/}
              {/*    onClick={() => {*/}
              {/*      addToCart(props.item);*/}
              {/*    }}>*/}
              {/*    <img loading={"lazy"} width="36" src="/assets/images/cart-icon.png" alt=""/>*/}
              {/*  </button>*/}
              {/*</Tooltip>*/}

            </div>
          </div>
          {/*<div className="text-redBase text-sm">{!token &&*/}
          {/*  <Link className={'text-blueActive cursor-pointer font-semibold'} to="/signup"> Sign Up</Link>}</div>*/}
        </div>
      </div>

      {/*cart-item */}
    </>
  );
};
