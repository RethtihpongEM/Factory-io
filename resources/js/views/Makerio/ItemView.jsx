import {Link, useNavigate, useParams} from "react-router-dom";
import React, {Suspense, useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {ItemCardCarousel} from "../../components/CartComponents/ItemCardCarousel.jsx";
import {ProductReview} from "../../components/ProductReview.jsx";
import {Spinner} from "flowbite-react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import {AddToCart} from "@/components/ui/AddToCart.jsx";

const imgUrl = import.meta.env.VITE_APP_URL;
export const ItemView = (props) => {
  let {id} = useParams();
  const {item, getItem, items, itemsQueryReFetch, reviewsQueryReFetch, getType} = useContext(ProductContext);
  const {scrollTop} = useContext(InvoiceContext);
  useEffect(() => {
    getItem(id);
    itemsQueryReFetch();
    reviewsQueryReFetch();
    scrollTop(0);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: {max: 2560, min: 1920},
      items: 6
    },
    xl: {
      // the naming can be any, depends on you.
      breakpoint: {max: 1920, min: 1024},
      items: 4
    },
    // lg: {
    //   breakpoint: {max: 1280, min: 1024},
    //   items: 4
    // },
    md: {
      breakpoint: {max: 1024, min: 768},
      items: 3
    },
    sm: {
      breakpoint: {max: 640, min: 0},
      items: 1
    }
  };

  // const [open, setOpen] = useState(false);
  //
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
  //   setOpen(true);
  //   addToCart(item);
  // };

  const {addToCart, cartItem} = useContext(CartContext);
  const itemCart = cartItem.find((i) => i.id === item.id);
  const currentQty = item.qty - (itemCart?.qty || 0);
  let navigate = useNavigate();
  return (
    <>
      <div className="w-[50%] flex items-center justify-between">
        <button onClick={() => {
          navigate(-1)
        }}>
          <img width="24" src="/assets/images/arrow-left.png" alt=""/>
        </button>
        <span className="font-bold text-xl">Product</span>
      </div>
      <section className="xl:px-48 mt-12 lg:flex lg:flex-row lg:justify-center lg:gap-x-12
        flex flex-col gap-6">
        {/*product image*/}
        <div className="max-h-[500px] xl:flex-grow-0 flex-1 flex items-center justify-center border-2 border-tealBase p-4">
          {(item?.image === null || item?.image === undefined)
            ? <img className="xl:min-w-[500px] xl:min-h-[500px]
                lg:max-w-[300px]
                object-contain"
                   src="/assets/images/makerio.png" alt={item.name}/>
            : <img
              className="xl:min-h-[500px]
                lg:max-w-[500px]
                object-contain"
              src={`${imgUrl}/${item.image}`} alt={item.name}/>
          }
        </div>
        {/*product description*/}
        <div
          className="max-h-[500px] xl:flex-grow-0 flex-1 flex flex-col xl:min-w-[500px] xl:min-h-[500px]
          lg:min-w-[300px] lg:text-lg shadow-2xl rounded-[20px] p-4 ">
          <div className="lg:text-lg md:text-base text-sm mb-2 font-bold text-blueBase">${item.price}</div>
          <div className="lg:text-lg md:text-base text-sm mb-2 font-bold text-tealBase">{item.name}</div>
          <div className="lg:text-lg md:text-base text-sm mb-2 text-blackFactory">Item Type: <span
            className={`font-semibold`}>{item.type}</span></div>
          <div
            className="lg:text-lg md:text-base text-sm mb-2 text-redBase font-bold">{currentQty === 0 ? "Out of Stock" : "In stock"}</div>

          {/*Description*/}
          <div className="overflow-auto sm:max-w-[80%] md:max-w-full">
            <p className="whitespace-pre-wrap lg:text-lg md:text-base text-sm mb-3 text-blackFactory font-Poppins">
              {item.description}
            </p>
          </div>
          <div className="mt-auto flex justify-end items-center">

            <AddToCart item={item} iconSize={"md:w-12 w-10"}/>

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
            {/*        className={`${item.status === 0 && 'hidden'} rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300`}*/}
            {/*        onClick={handleTooltipOpen}>*/}
            {/*        <img loading={"lazy"} className={"md:w-12 w-10"} src="/assets/images/cart-icon.png" alt=""/>*/}
            {/*      </button>*/}
            {/*    </CustomTooltip>*/}
            {/*  </div>*/}
            {/*</ClickAwayListener>*/}

            {/*<button*/}
            {/*  className={`${item.status === 0 && 'hidden'} rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300`}*/}
            {/*  onClick={() => {*/}
            {/*    addToCart(item, currentQty);*/}
            {/*  }}>*/}
            {/*  <img className="md:w-12 w-10" src="/assets/images/cart-icon.png" alt=""/>*/}
            {/*</button>*/}
          </div>
        </div>
      </section>
      <ProductReview item={item}/>
      <div className="mt-16">
        <div className="mb-6 text-tealHover font-semibold">Related items</div>
        <Carousel itemClass={'flex justify-center'} responsive={responsive}>
          {items?.filter(itemFilter => itemFilter.type === item.type && itemFilter.id !== item.id)
            .map((item, key) => {
              return (
                <ItemCardCarousel item={item} key={key}/>
              )
            })}
        </Carousel>
      </div>
    </>
  );
};
