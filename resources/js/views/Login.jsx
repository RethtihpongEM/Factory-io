import React from "react";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {Link, Navigate, useNavigate} from "react-router-dom";
// import makerio from "../assets/makerio.png"
import {useContext, useEffect, useRef, useState} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import axiosClient from "../axios-client.js";
import UserContext from "../context/UserContext.jsx";
import {Spinner} from "flowbite-react";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null)
  const {setUser, setToken, token} = useAuthContext()
  const navigate = useNavigate()
  const {getAdmin, admin} = useContext(UserContext)
  useEffect(() => {
    getAdmin()
  }, [])


  const [isSignin, setIsSignin] = useState(false);

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const formValues = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setIsSignin(true);
    if (admin['email'] === emailRef.current.value) {
      await axiosClient.post('/loginAsAdmin', formValues)
        .then(({data}) => {
          setIsSignin(false);
          setUser(data.user)
          setToken(data.token)
          navigate("/admin/dashboard")
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422) {
            if (response.data.errors) {
              setErrors(response.data.errors)
            } else {
              setErrors({
                email: [response.data.message]
              })
            }
          }
        })
    } else {
      await axiosClient.post('/login', formValues)
        .then(({data}) => {
          setIsSignin(false);
          setUser(data.user)
          setToken(data.token)
          history.back()
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422) {
            if (response.data.errors) {
              setErrors(response.data.errors)
            } else {
              setErrors({
                email: [response.data.message]
              })
            }
          }
        })
    }
    setIsSignin(false);
  }

  if (!token) {
    return (
      <main className={"h-screen border flex flex-col md:justify-center items-center"}>
        <div className="flex self-start p-6">
          <div>
            <Link to="/">
              <ArrowLeftIcon className="h-6 mr-5"/>
            </Link>
          </div>
          <div>
            <img src="/assets/images/makerio.png" className='object-contain' style={{width: 167 + 'px'}}/>
          </div>
        </div>

        <form className="m-auto flex flex-col items-center w-full" onSubmit={onSubmit}>
          <div className="flex flex-col items-center gap-12 w-full">
            <h1 className="text-center text-tealHover font-bold text-5xl">Sign In</h1>
            {/*{*/}
            {/*  errors && <div className="text-white text-semibold mb-3 p-5 bg-red-500 rounded-[4px]">*/}
            {/*    {Object.keys(errors).map(key => (*/}
            {/*      <p key={key}>{errors[key][0]}</p>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*}*/}
            <div className="flex flex-col gap-4 md:w-[600px] md:p-0 w-full px-6">
              <div className="flex flex-col items-center gap-4">
                <input type="email" id="email"
                       name="email"
                       ref={emailRef}
                       className="bg-tealActive border-none text-BlackNuetral text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       placeholder="Email"
                />
                <span className='text-redHover self-start text-xs'>
                  {errors && errors?.email?.map(error => error)}
                </span>
                <input type="password" id="password"
                       name="password"
                       ref={passwordRef}
                       className="bg-tealActive border-none text-BlackNuetral text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       placeholder="Password"
                />
                <span className='text-redHover self-start text-xs'>
                  {errors && errors?.password?.map(error => error)}
                </span>
              </div>
              <div className="flex md:justify-between md:items-center md:flex-row md:gap-0 flex-col gap-3">
                <button disabled={isSignin || false}
                        className="font-bold text-center text-blackFactory border border-redBase rounded-[4px] shadow-2xl md:px-[35px] md:py-[7px] md:w-fit w-full py-2">
                  Sign In
                  {isSignin && <span className={"ml-2"}><Spinner color={"purple"} size={"md"}/></span>}
                </button>
                <div className="">
                  <div className="justify-center flex gap-x-1">
                    <p>Don't have an account?</p>
                    <Link to="/signup"
                          className="text-tealHover font-bold"
                    >Sign up
                    </Link>
                  </div>
                  <Link to="/forgot-password"
                        className="flex md:justify-end justify-center text-tealHover font-bold hover:underline"
                  >Forgot Password
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </form>

      </main>
    )
  } else {
    return <Navigate to="/user"/>
  }

}
