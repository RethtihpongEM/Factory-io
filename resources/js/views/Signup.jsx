import React from "react";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {Link, Navigate} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import {Spinner} from "flowbite-react";

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const phoneNumberRef = useRef();
  const usernameRef = useRef();

  const [errors, setErrors] = useState(null)
  const {setUser, setToken, token} = useAuthContext()

  const onSubmit = (event) => {
    event.preventDefault()
    const formValues = {
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      username: usernameRef.current.value,
    }
    // console.log(formValues)
    axiosClient.post('/signup', formValues)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
        history.back()
      })
      .catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }
  if (!token) {
    return (
      <main className="h-screen border flex flex-col md:justify-center items-center">
        {/*absolute top-[20px] left-[30px]*/}
        <div className="flex self-start p-6">
          <div>
            <Link to="/">
              <ArrowLeftIcon className="h-6 mr-5"/>
            </Link>
          </div>
          <img loading="lazy" alt={"makerio-logo"} src="/assets/images/makerio.png" className='object-contain'
               style={{width: 167 + 'px'}}/>
        </div>
        <form className="m-auto flex flex-col gap-12" onSubmit={onSubmit}>
          <div className="text-tealHover text-center font-bold md:text-5xl text-3xl
          ">Create a new account
          </div>
          {/*{*/}
          {/*  errors && <div className="text-white text-semibold mb-5 p-5 bg-red-500 rounded-[4px]">*/}
          {/*    {Object.keys(errors).map(key => (*/}
          {/*      <p key={key}>{errors[key][0]}</p>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*}*/}
          <div className="flex flex-col items-center justify-center md:px-0 px-12">
            <div className="flex w-full mb-6 gap-5">
              <div className="w-1/2">
                <input type="name" id="firstName"
                       ref={firstNameRef}
                       className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       placeholder="First name"
                />
                <span className='text-redHover self-start text-xs'>
                  {errors && errors?.firstName?.map(error => error)}
                </span>
              </div>
              <div className="w-1/2">
                <input type="name" id="lastName"
                       ref={lastNameRef}
                       className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       placeholder="Last name"
                />
                <span className='text-redHover self-start text-xs'>
                  {errors && errors?.lastName?.map(error => error)}
                </span>
              </div>
            </div>
            <div className="mb-6 w-full">
              <input type="name" id="phoneNumber"
                     ref={phoneNumberRef}
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder="Phone Number"
              />
              <span className='text-redHover self-start text-xs'>
                  {errors && errors?.phoneNumber?.map(error => error)}
                </span>
            </div>
            <div className="mb-6 w-full">
              <input type="name" id="username"
                     ref={usernameRef}
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder="Username"
              />
              <span className='text-redHover self-start text-xs'>
                  {errors && errors?.username?.map(error => error)}
                </span>
            </div>
            <div className="mb-6 w-full">
              <input type="email" id="email"
                     ref={emailRef}
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder="Email"
              />
              <span className='text-redHover self-start text-xs'>
                  {errors && errors?.email?.map(error => error)}
                </span>
            </div>
            <div className="mb-6 w-full">
              <input type="password" id="password"
                     ref={passwordRef}
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder="Password"
              />
              <span className='text-redHover self-start text-xs'>
                  {errors && errors?.password?.map(error => <span>{error}<br/></span>)}
              </span>
            </div>
            <div className="mb-6 w-full">
              <input type="password" id="confpassword"
                     ref={passwordConfirmationRef}
                     className="bg-tealActive border-none text-blackFactory text-lg rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     placeholder="Confirm Password"
              />
            </div>
            <div className="flex md:flex-row flex-col items-center justify-between w-full gap-2">
              <button
                className="font-bold text-center text-blackFactory border border-redBase md:px-[35px] md:py-[7px] md:text-base text-sm whitespace-nowrap px-4 py-2 rounded-[4px] shadow-2xl md:w-fit w-full">
                Create account
              </button>
              <div className="flex gap-x-1 md:text-base text-sm">
                <p className={"whitespace-nowrap"}>Already a member?</p>
                <Link to="/login"
                      className="text-tealHover font-bold self-end"
                >Log in
                </Link>
              </div>
            </div>
          </div>
        </form>
      </main>
    )
  } else {
    return <Navigate to="/"/>
  }

}
