import React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import ProductContext from "./ProductContext.jsx";
import Axios from "axios";
import InvoiceContext, {InvoiceProvider} from "./InvoiceContext.jsx";
import invoiceContext from "./InvoiceContext.jsx";
import {useAuthContext} from "./AuthContext.jsx";
import InvoiceProductContext from "./InvoiceProductContext.jsx";
import {redirect, useNavigate, useNavigation} from "react-router-dom";
import UserContext from "./UserContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL+"/api/v1/";
const CartContext = createContext();
export const CartProvider = ({children}) => {
  // const {isLoading} = useContext(InvoiceContext);
  const [itemQty, setItemQty] = useState('');
  const [cartItem, setCartItem] = useState([]);
  const [cartError, setCartError] = useState([]);
  const [success, setSuccess] = useState(true);
  const totalPrice = cartItem.reduce((total, i) => total += i.price * i.qty, 0);
  const {token, user} = useAuthContext();
  const {getUsers} = useContext(UserContext);
  useEffect(() => {
    getUsers();
  }, []);

  const storeItem = (item) => {
    if (itemExist(item)) {
      // find and update that existed item qty
      const itemCart = cartItem.find((i) => i.id === item.id);
      itemCart.qty = itemCart.qty + 1;
      itemCart.cart_item_price = item.price * itemCart.qty;
      setCartItem([...cartItem]);
    } else if (!itemExist(item)) {
      setCartItem([...cartItem, {
        // user_id: user?.id,
        id: item.id, // referenced from stock items
        product_id: item.id, //for cart product database
        name: item.name,
        type: item.type,
        price: item.price,
        qty: 1,
        status: item.status,
        cart_item_price: item.price * 1,
        image: item.image,
      }]);
    }
    saveLocalCartItem(cartItem);
  }

  const addToCart = (item) => {
    item.tooltip = true;
    if (item.qty) {
      storeItem(item);
      // if item doesnt exist in cart, save item
      !cartItem.find((i) => item.id === i.product_id) && saveLocalCartItem([...cartItem, ({
        ...item,
        user_id: user.id,
        product_id: item.id,
        type: item.type,
        qty: 1,
        cart_item_price: item.price * 1,
        image: item.image,
      })])
    }
  }

  function itemExist(item) {
    for (let i = 0; i < cartItem.length; i++) {
      if (cartItem[i].id === item.id) {
        return true;
      }
    }
    return false;
  }

  const saveLocalCartItem = (itemSave) => {
    localStorage.setItem('CART_ITEM', JSON.stringify(itemSave ?? []));
  }

  const handleQty = (event, item) => {
    item.warning = '';
    if (Number(event.target.value) >= 1) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
      event.target.value = event.target.value.replace(/(\..*)\./g, '$1');
      item.qty = Number(event.target.value)
    } else if (!Number(event.target.value)) {
      item.qty = 0;
      item.warning = 'Item quantity must be at least 1';
      event.target.value = '';
      setItemQty('')
    }
    setCartItem([...cartItem])
    saveLocalCartItem(cartItem);
  }

  const increaseItemQty = (item) => {
    item.qty = item.qty + 1;
    setItemQty(item.qty);
    item.cart_item_price = item.price * item.qty;
    setCartItem([...cartItem]);
    saveLocalCartItem(cartItem);
  };
  const decreaseItemQty = (item) => {
    item.qty > 1 ? item.qty = item.qty - 1 : cartItem.splice(cartItem.indexOf(item), 1);
    setItemQty(item.qty);
    item.cart_item_price = item.price * item.qty;
    setCartItem([...cartItem]);
    saveLocalCartItem(cartItem);
  };

  const getCartItem = () => {
    setCartItem(JSON.parse(localStorage.getItem('CART_ITEM')) ?? []);
  };

  function clearCart() {
    localStorage.removeItem('CART_ITEM');
  }

  return <CartContext.Provider value={{
    clearCart,
    setItemQty,
    itemQty,
    handleQty,
    setCartError,
    cartItem,
    setCartItem,
    cartError,
    success,
    setSuccess,
    addToCart,
    getCartItem,
    saveLocalCartItem,
    increaseItemQty,
    totalPrice,
    decreaseItemQty
  }}>
    {children}</CartContext.Provider>;
};

export default CartContext;
