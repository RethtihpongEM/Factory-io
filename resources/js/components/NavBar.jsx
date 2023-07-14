import {Link, useLocation} from "react-router-dom";
import React, {Suspense, useContext, useEffect, useRef, useState} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import CartContext from "../context/CartContext.jsx";
import ChatContext from "../context/ChatContext.jsx";
import InvoiceContext from "../context/InvoiceContext.jsx";
import ProductContext from "../context/ProductContext.jsx";
import {Fragment} from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {ProfileDropdown} from "./ui/NavBarui/ProfileDropdown.jsx";
import {NoAccount} from "./ui/NavBarui/NoAccount.jsx";
import {DropdownMenu} from "./ui/NavBarui/DropdownMenu.jsx";
import AdminPopUp from "./Modals/AdminPopUp.jsx";
import {CustomerService} from "../views/Makerio/CustomerService.jsx";

const imgUrl = import.meta.env.VITE_APP_URL

export const NavBar = (props) => {
  const {token, user, onLogout} = useAuthContext()
  const [searchInput, setSearchInput] = useState('')
  const {itemsQueryReFetch, items, getItem} = useContext(ProductContext);
  const {cartItem, getCartItem} = useContext(CartContext);
  const [filteredItem, setFilteredItem] = useState([])
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
    setFilteredItem(
      items?.filter((item) => {
        if (searchInput !== "") {
          if (item?.name.toLowerCase().includes(searchInput.toLowerCase()) || item?.type.toLowerCase().includes(searchInput.toLowerCase())) {
            return item
          }
        }
      })
    )
  }

  useEffect(() => {
    itemsQueryReFetch();
    getCartItem();
  }, []);

  const location = useLocation();
  const {invoices} = useContext(InvoiceContext)
  const {message, findChat, setSeen, initChat} = useContext(ChatContext);

  const readMessage = message?.filter((msg) => msg.chat_id === findChat(user.username, 'admin')?.id && msg.is_read === 0 && msg.sender_id !== user.username);
  const orders = invoices?.filter((inv) => inv.user_id === user.id && inv.status !== 3);

  // console.log(invoices?.filter(inv => inv.user_id === user.id))

  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <nav className="shadow-md z-50 fixed top-0 flex flex-col w-full bg-whiteFactory
    min-[1880px]:px-96 min-[1920px]:py-4
    lg:px-16 lg:py-3
    md:px-6 md:py-2
    px-6 py-2">
      <section className="flex justify-between items-center w-full">
        {/*left section*/}
        <div className="md:flex md:flex-row md:items-center md:gap-x-2 flex gap-x-1 items-center">
          <Link to="/">
            <img className={"lg:w-[100px] md:w-[120px] w-[100px]"} src="/assets/images/makerio.png" alt=""/>
          </Link>
          {
            user?.acc_type === 1 &&
            <div
              // onClick={() => {initChat(user.username, 'admin')}}
              className={"transition duration-500 flex relative hover:rounded-md rounded-md hover:bg-blackFactory/10 p-2 cursor-pointer"}
              onClick={async (event) => {
                await initChat(user.username, 'admin')
                event.stopPropagation();
                setModalOpen(true);
                setSeen(readMessage, user.username);
              }} title="Customer Support">
              <svg xmlns="http://www.w3.org/2000/svg"
                   className="md:w-[22px] md:h-[22px] w-[18px] h-[18px]" viewBox="0 0 30 30"
                   fill="none">
                <path
                  d="M23.4 18.4499C23.8375 17.3874 24.075 16.2499 24.075 14.9999C24.075 14.0999 23.9375 13.2374 23.7 12.4374C22.8875 12.6249 22.0375 12.7249 21.15 12.7249C19.3325 12.7268 17.5411 12.2918 15.9269 11.4564C14.3127 10.621 12.923 9.40982 11.875 7.92487C10.7539 10.6376 8.63891 12.8196 5.9625 14.0249C5.9125 14.3374 5.9125 14.6749 5.9125 14.9999C5.9125 16.1933 6.14756 17.375 6.60424 18.4775C7.06093 19.5801 7.73031 20.5819 8.57417 21.4257C10.2784 23.1299 12.5898 24.0874 15 24.0874C16.3125 24.0874 17.575 23.7999 18.7125 23.2874C19.425 24.6499 19.75 25.3249 19.725 25.3249C17.675 26.0124 16.0875 26.3499 15 26.3499C11.975 26.3499 9.0875 25.1624 6.9625 23.0249C5.67 21.7363 4.70921 20.1536 4.1625 18.4124H2.5V12.7249H3.8625C4.2753 10.7155 5.22437 8.85538 6.60899 7.34186C7.99361 5.82834 9.76214 4.71788 11.7269 4.12832C13.6917 3.53876 15.7794 3.49209 17.7686 3.99326C19.7577 4.49442 21.5741 5.52474 23.025 6.97487C24.6003 8.54394 25.6748 10.545 26.1125 12.7249H27.5V18.4124H27.425L22.975 22.4999L16.35 21.7499V19.6624H22.3875L23.4 18.4499ZM11.5875 14.7124C11.9625 14.7124 12.325 14.8624 12.5875 15.1374C12.8513 15.4033 12.9993 15.7628 12.9993 16.1374C12.9993 16.512 12.8513 16.8714 12.5875 17.1374C12.325 17.3999 11.9625 17.5499 11.5875 17.5499C10.8 17.5499 10.1625 16.9249 10.1625 16.1374C10.1625 15.3499 10.8 14.7124 11.5875 14.7124ZM18.4 14.7124C19.1875 14.7124 19.8125 15.3499 19.8125 16.1374C19.8125 16.9249 19.1875 17.5499 18.4 17.5499C17.6125 17.5499 16.975 16.9249 16.975 16.1374C16.975 15.7594 17.1251 15.397 17.3924 15.1297C17.6596 14.8625 18.0221 14.7124 18.4 14.7124Z"
                  fill="#2D335B"/>
              </svg>
              <span
                className={`${readMessage?.length === 0 && 'hidden'} absolute top-[-4px] right-[-4px] bg-tealActive w-[18px] h-[18px] rounded-[50%] flex items-center justify-center text-whiteFactory text-[12px]`}>
              {readMessage?.length}
            </span>
            </div>
          }
          <AdminPopUp modalOpen={modalOpen} setModalOpen={setModalOpen}
                      content={<CustomerService setModalOpen={setModalOpen}/>} id={100}/>
        </div>

        {/*search bar*/}
        <div className="md:flex md:items-center md:gap-x-12 lg:w-[384px] hidden">
          <input type="text"
                 placeholder="Search..."
                 style={{
                   backgroundColor: "#D9D9D9",
                 }}
                 className="w-[100%] px-12 search-bar py-1 border rounded-[50px] bg-[#D9D9D9]"
                 value={searchInput}
                 onChange={event => {
                   handleSearchInput(event)
                 }}/>
          <div
            className={`flex flex-col gap-4 z-10 border border-gray-200 rounded-md absolute bg-white top-[75px] lg:w-[384px] cursor-pointer ${searchInput === "" && 'hidden'}`}>
            {filteredItem?.length === 0 && <div className="mx-auto mt-2"> No item found</div>}
            {filteredItem?.slice(0, 5).map((item, key) => {
              return (
                <Link to={`/item/${item.id}`} onClick={e => {
                  e.stopPropagation()
                  getItem(item.id)
                  setSearchInput("")
                }} key={key} className="px-4 py-2 flex flex-row justify-between items-center hover:bg-gray-100">
                  <p>
                    {item.name}
                  </p>
                  <img className="w-[50px]" src={`${imgUrl}/${item.image}`} alt={item.name}/>
                </Link>
              )
            })}
          </div>
        </div>

        {/*right section*/}
        <div className="md:flex md:items-center md:gap-x-2 hidden">
          {/*home icon*/}
          <div title="Home" className="highlight-hover p-2 hover:rounded-md hover:bg-blackFactory/5 text-[#8A0000]">
            <Link to="shop">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path
                  d="M29.1667 27.7087V15.3128C29.1667 15.0864 29.114 14.8631 29.0127 14.6606C28.9115 14.4581 28.7645 14.282 28.5833 14.1462L18.375 6.48991C18.1226 6.30058 17.8156 6.19824 17.5 6.19824C17.1845 6.19824 16.8774 6.30058 16.625 6.48991L6.41668 14.1462C6.23556 14.282 6.08855 14.4581 5.9873 14.6606C5.88605 14.8631 5.83334 15.0864 5.83334 15.3128V27.7087C5.83334 28.0954 5.98699 28.4664 6.26048 28.7399C6.53397 29.0133 6.9049 29.167 7.29168 29.167H13.125C13.5118 29.167 13.8827 29.0133 14.1562 28.7399C14.4297 28.4664 14.5833 28.0954 14.5833 27.7087V23.3337C14.5833 22.9469 14.737 22.576 15.0105 22.3025C15.284 22.029 15.6549 21.8753 16.0417 21.8753H18.9583C19.3451 21.8753 19.7161 22.029 19.9895 22.3025C20.263 22.576 20.4167 22.9469 20.4167 23.3337V27.7087C20.4167 28.0954 20.5703 28.4664 20.8438 28.7399C21.1173 29.0133 21.4882 29.167 21.875 29.167H27.7083C28.0951 29.167 28.4661 29.0133 28.7395 28.7399C29.013 28.4664 29.1667 28.0954 29.1667 27.7087Z"
                  stroke={`${location.pathname === 'shop' ? '#8A0000' : '#00727A'}`} strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/*cart icon*/}
          <div title="Cart" className="highlight-hover p-2 hover:rounded-md hover:bg-blackFactory/5 relative">
            {user['acc_type'] === 0 ?
              <Link to="/admin/dashboard">
                Dashboard
              </Link>
              :
              <>
                <Link to={"cart"}>
                  {/*<img src="/assets/images/carticon.png" alt=""/>*/}
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path
                      d="M0 2.8125C0 2.56386 0.0987721 2.3254 0.274587 2.14959C0.450403 1.97377 0.68886 1.875 0.9375 1.875H3.75C3.95912 1.87506 4.16222 1.94503 4.327 2.0738C4.49177 2.20256 4.60877 2.38272 4.65937 2.58562L5.41875 5.625H27.1875C27.3252 5.62513 27.4611 5.65557 27.5857 5.71416C27.7102 5.77275 27.8204 5.85805 27.9082 5.96401C27.9961 6.06996 28.0596 6.19397 28.0941 6.32722C28.1287 6.46047 28.1335 6.59969 28.1081 6.735L25.2956 21.735C25.2554 21.9498 25.1414 22.1439 24.9733 22.2836C24.8052 22.4232 24.5936 22.4998 24.375 22.5H7.5C7.28144 22.4998 7.06981 22.4232 6.90171 22.2836C6.7336 22.1439 6.61959 21.9498 6.57938 21.735L3.76875 6.76313L3.01875 3.75H0.9375C0.68886 3.75 0.450403 3.65123 0.274587 3.47541C0.0987721 3.2996 0 3.06114 0 2.8125ZM5.81625 7.5L8.27812 20.625H23.5969L26.0588 7.5H5.81625ZM9.375 22.5C8.38044 22.5 7.42661 22.8951 6.72335 23.5984C6.02009 24.3016 5.625 25.2554 5.625 26.25C5.625 27.2446 6.02009 28.1984 6.72335 28.9016C7.42661 29.6049 8.38044 30 9.375 30C10.3696 30 11.3234 29.6049 12.0267 28.9016C12.7299 28.1984 13.125 27.2446 13.125 26.25C13.125 25.2554 12.7299 24.3016 12.0267 23.5984C11.3234 22.8951 10.3696 22.5 9.375 22.5ZM22.5 22.5C21.5054 22.5 20.5516 22.8951 19.8484 23.5984C19.1451 24.3016 18.75 25.2554 18.75 26.25C18.75 27.2446 19.1451 28.1984 19.8484 28.9016C20.5516 29.6049 21.5054 30 22.5 30C23.4946 30 24.4484 29.6049 25.1516 28.9016C25.8549 28.1984 26.25 27.2446 26.25 26.25C26.25 25.2554 25.8549 24.3016 25.1516 23.5984C24.4484 22.8951 23.4946 22.5 22.5 22.5ZM9.375 24.375C9.87228 24.375 10.3492 24.5725 10.7008 24.9242C11.0525 25.2758 11.25 25.7527 11.25 26.25C11.25 26.7473 11.0525 27.2242 10.7008 27.5758C10.3492 27.9275 9.87228 28.125 9.375 28.125C8.87772 28.125 8.40081 27.9275 8.04918 27.5758C7.69754 27.2242 7.5 26.7473 7.5 26.25C7.5 25.7527 7.69754 25.2758 8.04918 24.9242C8.40081 24.5725 8.87772 24.375 9.375 24.375ZM22.5 24.375C22.9973 24.375 23.4742 24.5725 23.8258 24.9242C24.1775 25.2758 24.375 25.7527 24.375 26.25C24.375 26.7473 24.1775 27.2242 23.8258 27.5758C23.4742 27.9275 22.9973 28.125 22.5 28.125C22.0027 28.125 21.5258 27.9275 21.1742 27.5758C20.8225 27.2242 20.625 26.7473 20.625 26.25C20.625 25.7527 20.8225 25.2758 21.1742 24.9242C21.5258 24.5725 22.0027 24.375 22.5 24.375Z"
                      fill={`${location.pathname === 'cart' ? '#8A0000' : '#00727A'}`}/>
                  </svg>
                </Link>
                <span
                  className={cartItem.length === 0 ? 'hidden' : " flex justify-center items-center w-[16px] h-[16px] absolute top-[0px] right-[-6px] bg-redBase text-whiteFactory rounded-[50%] text-[12px]"}>
                      {cartItem?.reduce((total, i) => total += i.qty, 0)}
                  </span>
              </>
            }
          </div>

          {/*order icon*/}
          <div title="Current Orders" className="highlight-hover p-2 hover:rounded-md hover:bg-blackFactory/5">
            {
              user['acc_type'] === 0 ? null :
                <><Link className="relative" to={
                  token ? "order" : "/login"
                }>
                  {/*<img src="/assets/images/ordericon.png" alt=""/>*/}
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path
                      d="M5 23.75V10H25V14.1125C25.9 14.3875 26.75 14.7875 27.5 15.325V10C27.5 8.6125 26.3875 7.5 25 7.5H20V5C20 3.6125 18.8875 2.5 17.5 2.5H12.5C11.1125 2.5 10 3.6125 10 5V7.5H5C3.6125 7.5 2.5125 8.6125 2.5125 10L2.5 23.75C2.5 25.1375 3.6125 26.25 5 26.25H14.6C14.225 25.475 13.975 24.6375 13.85 23.75H5ZM12.5 5H17.5V7.5H12.5V5Z"
                      fill={`${location.pathname === 'order' ? '#8A0000' : '#00727A'}`}/>
                    <path
                      d="M22.5 16.25C19.05 16.25 16.25 19.05 16.25 22.5C16.25 25.95 19.05 28.75 22.5 28.75C25.95 28.75 28.75 25.95 28.75 22.5C28.75 19.05 25.95 16.25 22.5 16.25ZM24.5625 25.4375L21.875 22.75V18.75H23.125V22.2375L25.4375 24.55L24.5625 25.4375Z"
                      fill={`${location.pathname === 'order' ? '#8A0000' : '#00727A'}`}/>
                  </svg>
                  <span
                    className={`${orders?.length === 0 && 'hidden'} flex justify-center items-center w-[16px] h-[16px] absolute top-[-6px] right-[-16px] bg-tealActive text-whiteFactory rounded-[50%] text-[12px]`}>
                    {orders?.length}
                  </span>
                </Link>
                </>
            }
          </div>

          {/*profile icon*/}
          {token ?
            <ProfileDropdown to="user" user={user} arrowIcon={true}/>
            :
            <NoAccount/>
          }
          {user?.acc_type === 0 &&
            <button
              className="transition ease-out duration-300 bg-redBase text-whiteFactory px-4 py-1 rounded-[20px] hover:bg-redHover"
              onClick={event => onLogout(event)}>
              Sign out
            </button>
          }
        </div>

        {/*phone nav view*/}
        <div className="md:hidden flex gap-x-1 items-center">
          {/*profile icon*/}
          <div>
            {token ?
              <ProfileDropdown to="user" user={user} arrowIcon={false}/>
              :
              <NoAccount/>
            }
          </div>
          {/*dropdown menu*/}
          <DropdownMenu orders={orders} user={user} cartItem={cartItem}/>
          {/*search icon*/}
          <div>
            <Fragment>
              <Accordion open={open === 1}>
                <AccordionHeader className="border-0 p-0" onClick={() => handleOpen(1)}>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className={`w-6 h-6`}>
                      <path className="text-tealHover" strokeLinecap="round" strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                    </svg>
                  </div>
                </AccordionHeader>
              </Accordion>
            </Fragment>
          </div>
        </div>
      </section>
      <div className="md:hidden w-full">
        <Fragment>
          <Accordion open={open === 1}>
            <AccordionBody className={`mt-2 border-0 p-0 ${open ? '' : 'hidden'}`}>
              {/*<input className="w-full" placeholder="Search..." type="text"/>*/}
              <input type="text"
                     placeholder="Search..."
                     className="w-full rounded-md focus:ring-0 focus:border-tealBase border-2 border-tealBase"
                     value={searchInput}
                     onChange={event => {
                       handleSearchInput(event)
                     }}/>
              <div
                className={`flex flex-col gap-4 z-10 border border-gray-200 rounded-md absolute bg-white top-[75px] lg:w-[384px] cursor-pointer ${searchInput === "" && 'hidden'}`}>
                {filteredItem?.length === 0 && <div className="mx-auto mt-2"> No item found</div>}
                {filteredItem?.slice(0, 5).map((item, key) => {
                  return (
                    <Link to={`/item/${item.id}`} onClick={e => {
                      e.stopPropagation()
                      getItem(item.id)
                      setSearchInput("")
                    }} key={key} className="px-4 py-2 flex flex-row justify-between items-center hover:bg-gray-100">
                      <p>
                        {item.name}
                      </p>
                      <img className="w-[50px]" src={`${imgUrl}/${item.image}`} alt={item.name}/>
                    </Link>
                  )
                })}
              </div>
            </AccordionBody>
          </Accordion>
        </Fragment>
      </div>
    </nav>
  );


};


