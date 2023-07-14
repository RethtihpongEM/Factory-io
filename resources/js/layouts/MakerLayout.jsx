import {NavBar} from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";
import React, {lazy, Suspense, useContext, useEffect} from "react";
import axiosClient from "../axios-client.js";
import ChatContext from "../context/ChatContext.jsx";
import UserContext from "../context/UserContext.jsx";
import {Spinner} from "flowbite-react";
import InvoiceProductContext from "../context/InvoiceProductContext.jsx";
import InvoiceContext from "../context/InvoiceContext.jsx";
import {useJsApiLoader} from "@react-google-maps/api";
import CartContext from "../context/CartContext.jsx";
import {useQuery} from "@tanstack/react-query";

export const MakerLayout = () => {
  const {setUser, token, setToken} = useAuthContext()

  // useEffect(() => {
  //   if (token) {
  //     setIsLoading(true)
  //     axiosClient.get('/user')
  //       .then(({data}) => {
  //         setUser(data)
  //         setIsLoading(false)
  //       }).catch((e) => {
  //       if (e.response.status === 401) {
  //         setIsLoading(false);
  //         setUser({})
  //         setToken(null);
  //       }
  //     })
  //   }
  // }, []);
  if (token) {
    const {isLoading} = useQuery(["user"], () => {
      return axiosClient.get('/user').then((res) => {
        setUser(res.data)
        return res.data
      }).catch((e) => {
        if (e.response.status === 401) {
          setUser({})
          setToken(null);
        }
      })
    })
    if (!isLoading) {
      return (
        <>
          <div className="min-h-screen flex flex-col overflow-auto">
            <NavBar/>
            <main className="
          min-[1880px]:px-96
          xl:pb-8
          lg:px-16
          md:px-6 md:pt-24 md:pb-2
          pb-6 px-6 pt-16">
              <Outlet/>
            </main>
            <Footer/>
          </div>
        </>
      );
    } else {
      return (
        <div className="h-screen flex justify-center items-center flex-col gap-8">
          <img className={"lg:w-[300px] md:w-[200px] w-[100px]"} src="/assets/images/makerio.png" alt=""/>
          <Spinner
            size="xl"
            color="purple"
            aria-label="Purple spinner example"
          />
        </div>
      )
    }
  } else {
    return (
      <>
        <div className="min-h-screen flex flex-col overflow-auto">
          <NavBar/>
          <main className="
          min-[1880px]:px-96
          xl:pb-8
          lg:px-16
          md:px-6 md:pt-24 md:pb-2
          pb-6 px-6 pt-16">
            <Outlet/>
          </main>
          <Footer/>
        </div>
      </>
    )
  }
};
