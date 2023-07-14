import ClickAwayListener from "@mui/material/ClickAwayListener";
import React, {useContext} from "react";
import CartContext from "../../context/CartContext.jsx";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";

export const AddToCart = (props) => {
  const {item, iconSize} = props;
  const {addToCart} = useContext(CartContext);
  const [open, setOpen] = React.useState(false);
  const CustomTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} arrow classes={{popper: className}}/>
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      border: "1px solid #048D95",
      fontSize: "12px",
      maxWidth: "120px"
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "#048D95",
    },
  });
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    item?.status === 1 && setOpen(true);
    addToCart(item);
  };

    return (
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <CustomTooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            placement={"right"}
            disableFocusListener
            disableHoverListener
            title={<span className='text-tealBase'>Item has been added to cart</span>}
          >
            <button
              className={`${props.item?.status === 0 && 'hidden'} rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300`}
              onClick={handleTooltipOpen}>
              <img loading={"lazy"} className={`${iconSize}`} src="/assets/images/cart-icon.png" alt=""/>
            </button>
          </CustomTooltip>
        </div>
      </ClickAwayListener>
    );
};
