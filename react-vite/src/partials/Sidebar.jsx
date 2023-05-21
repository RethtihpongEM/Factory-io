// import React, {useState, useEffect, useRef, useContext} from 'react';
// import {NavLink, useLocation} from 'react-router-dom';
//
// import SidebarLinkGroup from './SidebarLinkGroup';
// import InvoiceContext from "../context/InvoiceContext.jsx";
// import notifications from "./header/Notifications.jsx";
//
// function Sidebar({sidebarOpen, setSidebarOpen}) {
//   const location = useLocation();
//   const {pathname} = location;
//
//   const trigger = useRef(null);
//   const sidebar = useRef(null);
//
//   const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
//   const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');
//
//   // close on click outside
//   useEffect(() => {
//     const clickHandler = ({target}) => {
//       if (!sidebar.current || !trigger.current) return;
//       if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener('click', clickHandler);
//     return () => document.removeEventListener('click', clickHandler);
//   });
//
//   // close if the esc key is pressed
//   useEffect(() => {
//     const keyHandler = ({keyCode}) => {
//       if (!sidebarOpen || keyCode !== 27) return;
//       setSidebarOpen(false);
//     };
//     document.addEventListener('keydown', keyHandler);
//     return () => document.removeEventListener('keydown', keyHandler);
//   });
//
//   useEffect(() => {
//     localStorage.setItem('sidebar-expanded', sidebarExpanded);
//     if (sidebarExpanded) {
//       document.querySelector('body').classList.add('sidebar-expanded');
//     } else {
//       document.querySelector('body').classList.remove('sidebar-expanded');
//     }
//   }, [sidebarExpanded]);
//
//   const {invoices, setInvStatus, invStatus} = useContext(InvoiceContext);
//   const notificationCounter = status => {
//     const invoiceType = invoices?.filter((inv) => inv.status === status);
//     if (invoiceType?.length > 0) {
//       return invoiceType?.length;
//     } else if (invoiceType?.length > 10) {
//       return "10+";
//     } else {
//       return false;
//     }
//   }
//
//   return (
//     <div>
//       {/* Sidebar backdrop (mobile only) */}
//       <div
//         className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
//           sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`}
//         aria-hidden="true"
//       ></div>
//
//       {/* Sidebar */}
//       <div
//         id="sidebar"
//         ref={sidebar}
//         className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-64'
//         }`}
//       >
//         {/* Sidebar header */}
//         <div className="flex justify-between mb-10 pr-3 sm:px-2">
//           {/* Close button */}
//           <button
//             ref={trigger}
//             className="lg:hidden text-slate-500 hover:text-slate-400"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             aria-controls="sidebar"
//             aria-expanded={sidebarOpen}
//           >
//             <span className="sr-only">Close sidebar</span>
//             <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"/>
//             </svg>
//           </button>
//           {/* Logo */}
//           <NavLink end to="/" className="block">
//             <svg width="32" height="32" viewBox="0 0 32 32">
//               <defs>
//                 <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
//                   <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%"/>
//                   <stop stopColor="#A5B4FC" offset="100%"/>
//                 </linearGradient>
//                 <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
//                   <stop stopColor="#38BDF8" stopOpacity="0" offset="0%"/>
//                   <stop stopColor="#38BDF8" offset="100%"/>
//                 </linearGradient>
//               </defs>
//               <rect fill="#6366F1" width="32" height="32" rx="16"/>
//               <path
//                 d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
//                 fill="#4F46E5"/>
//               <path
//                 d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
//                 fill="url(#logo-a)"
//               />
//               <path
//                 d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
//                 fill="url(#logo-b)"
//               />
//             </svg>
//           </NavLink>
//         </div>
//
//         {/* Links */}
//         <div className="space-y-8">
//           {/* Pages group */}
//           <div>
//             <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
//               <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
//                     aria-hidden="true">
//                 •••
//               </span>
//               <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Features</span>
//             </h3>
//             <ul className="mt-3">
//
//               {/* Dashboard */}
//               <li
//                 className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('messages') && 'bg-slate-900'}`}>
//                 <NavLink
//                   end
//                   to="/admin/dashboard"
//                   className={`block text-slate-200 truncate transition duration-150 ${
//                     pathname.includes('messages') ? 'hover:text-slate-200' : 'hover:text-white'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="grow flex items-center">
//                       <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
//                         <path
//                           className={`fill-current ${pathname.includes('messages') ? 'text-indigo-500' : 'text-slate-600'}`}
//                           d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
//                         />
//                         <path
//                           className={`fill-current ${pathname.includes('messages') ? 'text-indigo-300' : 'text-slate-400'}`}
//                           d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
//                         />
//                       </svg>
//                       <span
//                         className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                         Dashboard
//                       </span>
//                     </div>
//                   </div>
//                 </NavLink>
//               </li>
//
//               {/*Inventory*/}
//               <li
//                 className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('messages') && 'bg-slate-900'}`}>
//                 <NavLink
//                   end
//                   to="/admin/inventory"
//                   className={`block text-slate-200 truncate transition duration-150 ${
//                     pathname.includes('messages') ? 'hover:text-slate-200' : 'hover:text-white'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="grow flex items-center">
//                       <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
//                         <path
//                           className={`fill-current ${pathname.includes('messages') ? 'text-indigo-500' : 'text-slate-600'}`}
//                           d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
//                         />
//                         <path
//                           className={`fill-current ${pathname.includes('messages') ? 'text-indigo-300' : 'text-slate-400'}`}
//                           d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
//                         />
//                       </svg>
//                       <span
//                         className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                         Inventory
//                       </span>
//                     </div>
//                   </div>
//                 </NavLink>
//               </li>
//               {/*Users*/}
//               <li
//                 className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('messages') && 'bg-slate-900'}`}>
//                 <NavLink
//                   end
//                   to="/admin/users"
//                   className={`block text-slate-200 truncate transition duration-150 ${
//                     pathname.includes('messages') ? 'hover:text-slate-200' : 'hover:text-white'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="grow flex items-center">
//                       <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
//                         <path
//                           className={`fill-current ${pathname.includes('messages') ? 'text-indigo-500' : 'text-slate-600'}`}
//                           d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
//                         />
//                         <path
//                           className={`fill-current ${pathname.includes('messages') ? 'text-indigo-300' : 'text-slate-400'}`}
//                           d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
//                         />
//                       </svg>
//                       <span
//                         className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                         Users
//                       </span>
//                     </div>
//                   </div>
//                 </NavLink>
//               </li>
//
//               <li
//                 className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('messages') && 'bg-slate-900'}`}>
//                 <NavLink
//                   end
//                   to="/admin/customer-service"
//                   className={`block text-slate-200 truncate transition duration-150 ${
//                     pathname.includes('messages') ? 'hover:text-slate-200' : 'hover:text-white'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="grow flex items-center">
//                       <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
//                         <path
//                           className={`fill-current ${pathname.includes('messages') ? 'text-indigo-500' : 'text-slate-600'}`}
//                           d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
//                         />
//                         <path
//                           className={`fill-current ${pathname.includes('messages') ? 'text-indigo-300' : 'text-slate-400'}`}
//                           d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
//                         />
//                       </svg>
//                       <span
//                         className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                         Customer Service
//                       </span>
//                     </div>
//                   </div>
//                 </NavLink>
//               </li>
//
//               {/* Utility */}
//               <SidebarLinkGroup activecondition={pathname.includes('utility')}>
//                 {(handleClick, open) => {
//                   return (
//                     <React.Fragment>
//                       <a
//                         href="#0"
//                         className={`block text-slate-200 truncate transition duration-150 ${
//                           pathname.includes('utility') ? 'hover:text-slate-200' : 'hover:text-white'
//                         }`}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           sidebarExpanded ? handleClick() : setSidebarExpanded(true);
//                         }}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center">
//                             <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
//                               <circle
//                                 className={`fill-current ${pathname.includes('utility') ? 'text-indigo-300' : 'text-slate-400'}`}
//                                 cx="18.5"
//                                 cy="5.5"
//                                 r="4.5"
//                               />
//                               <circle
//                                 className={`fill-current ${pathname.includes('utility') ? 'text-indigo-500' : 'text-slate-600'}`}
//                                 cx="5.5"
//                                 cy="5.5"
//                                 r="4.5"
//                               />
//                               <circle
//                                 className={`fill-current ${pathname.includes('utility') ? 'text-indigo-500' : 'text-slate-600'}`}
//                                 cx="18.5"
//                                 cy="18.5"
//                                 r="4.5"
//                               />
//                               <circle
//                                 className={`fill-current ${pathname.includes('utility') ? 'text-indigo-300' : 'text-slate-400'}`}
//                                 cx="5.5"
//                                 cy="18.5"
//                                 r="4.5"
//                               />
//                             </svg>
//                             <span
//                               className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                               Orders
//                             </span>
//                           </div>
//                           {/* Icon */}
//                           <div className="flex shrink-0 ml-2">
//                             <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`}
//                                  viewBox="0 0 12 12">
//                               <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
//                             </svg>
//                           </div>
//                         </div>
//                       </a>
//                       <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
//                         <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
//                           <li className="mb-1 last:mb-0">
//                             <NavLink
//                               onClick={() => {setInvStatus(-1)}}
//                               end
//                               to="/admin/orders"
//                               className={'block transition duration-150 truncate ' + (invStatus === -1 ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}
//                             >
//                               <span
//                                 className="flex items-center gap-x-2 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                                 Pending
//                                 <div
//                                   className={`${notificationCounter(-1) || 'hidden'} flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-indigo-500 text-whiteFactory`}>
//                                   {notificationCounter(-1)}
//                                 </div>
//                               </span>
//                             </NavLink>
//                           </li>
//                           <li className="mb-1 last:mb-0">
//                             <NavLink
//                               end
//                               onClick={() => {setInvStatus(1)}}
//                               to="/admin/orders"
//                               className={'block transition duration-150 truncate ' + (invStatus === 1 ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}
//                             >
//                               <span
//                                 className="flex items-center gap-x-2 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                                 Accepted
//                                 <div
//                                   className={`${notificationCounter(1) || 'hidden'} flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-indigo-500 text-whiteFactory`}>{notificationCounter(1)}</div>
//                               </span>
//                             </NavLink>
//                           </li>
//                           <li className="mb-1 last:mb-0">
//                             <NavLink
//                               onClick={() => {setInvStatus(2)}}
//                               end
//                               to="/admin/orders"
//                               className={'block transition duration-150 truncate ' + (invStatus === 2 ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}
//                             >
//                               <span
//                                 className="flex items-center gap-x-2 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                                 Delivering
//                                 <div
//                                   className={`${notificationCounter(2) || 'hidden'} flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-indigo-500 text-whiteFactory`}>{notificationCounter(2)}</div>
//                               </span>
//                             </NavLink>
//                           </li>
//                           <li className="mb-1 last:mb-0">
//                             <NavLink
//                               onClick={() => {setInvStatus(3)}}
//                               end
//                               to="/admin/orders"
//                               className={'block transition duration-150 truncate ' + (invStatus === 3 ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}
//                             >
//                               <span
//                                 className="flex items-center gap-x-2 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                                 Arrived
//                               <div
//                                 className={`${notificationCounter(3) || 'hidden'} flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-indigo-500 text-whiteFactory`}>{notificationCounter(3)}</div>
//                               </span>
//                             </NavLink>
//                           </li>
//                           <li className="mb-1 last:mb-0">
//                             <NavLink
//                               onClick={() => {setInvStatus(-2)}}
//                               end
//                               to="/admin/orders"
//                               className={'block transition duration-150 truncate ' + (invStatus === -2 ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}
//                             >
//                               <span
//                                 className="flex items-center gap-x-2 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
//                                 No Stock
//                                 <div
//                                   className={`${notificationCounter(-2) || 'hidden'} flex items-center justify-center text-[12px] w-[20px] h-[20px] rounded-[50%] bg-indigo-500 text-whiteFactory`}>{notificationCounter(-2)}</div>
//                               </span>
//                             </NavLink>
//                           </li>
//                         </ul>
//                       </div>
//                     </React.Fragment>
//                   );
//                 }}
//               </SidebarLinkGroup>
//             </ul>
//           </div>
//         </div>
//
//
//         {/* Expand / collapse button */}
//         <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
//           <div className="px-3 py-2">
//             <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
//               <span className="sr-only">Expand / collapse sidebar</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default Sidebar;


import React, {useState} from "react";
import {HiMenuAlt3} from "react-icons/hi";
import {MdOutlineDashboard} from "react-icons/md";
import {RiSettings4Line} from "react-icons/ri";
import {TbReportAnalytics} from "react-icons/tb";
import {AiOutlineUser, AiOutlineHeart} from "react-icons/ai";
import {FiMessageSquare, FiFolder, FiShoppingCart} from "react-icons/fi";
import {Link, NavLink} from "react-router-dom";

const Sidebar = () => {
  const menus = [
    {name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard},
    {name: "Users", link: "/admin/users", icon: AiOutlineUser},
    {name: "Inventory", link: "/admin/inventory", icon: FiFolder},
    // {name: "messages", link: "/", icon: FiMessageSquare},
    // {name: "analytics", link: "/", icon: TbReportAnalytics, margin: true},
    // {name: "Cart", link: "/", icon: FiShoppingCart},
    // {name: "Saved", link: "/", icon: AiOutlineHeart, margin: true},
    // {name: "Setting", link: "/", icon: RiSettings4Line},
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-whiteFactory min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-between">
          <NavLink to={'/'}><img
            className={`${
              !open && "hidden"
            }`}
            width="150" src="/assets/images/makerio.png" alt=""/></NavLink>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer text-teal-500"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 rounded-md`}
            >
              <div className="text-teal-500">{React.createElement(menu?.icon, {size: "20"})}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 text-teal-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Sidebar;

