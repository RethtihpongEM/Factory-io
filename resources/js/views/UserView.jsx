import {useAuthContext} from "../context/AuthContext"
import {Link, Navigate} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from 'react';
import UserContext from "../context/UserContext.jsx";
import ConfirmPasswordModal from "../components/ConfirmPasswordModal.jsx";
import axiosClient from "../axios-client.js";
import {Spinner} from "flowbite-react";
import AddressPopUp from "../components/Modals/AddressPopUp.jsx";

export const UserView = () => {
  const {token, user, setIsLoading, isLoading, setUser, setToken} = useAuthContext()
  const {formValues, setUserToFormValues, onChange} = useContext(UserContext)
  const [confirmPasswordModalOpen, setConfirmPasswordModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [addressModalOpen, setAddressModalOpen] = useState(false)
  const handleClick = () => {
    setIsDisabled(!isDisabled)
  };
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
        setUserToFormValues(data)
        setIsLoading(false)
      }).catch((e) => {
      if (e.response.status === 401) {
        setIsLoading(false);
        setUser({})
        setToken(null);
      }
    })
  }, [])
  if (!token) {
    return <Navigate to="/"/>
  }
  if (!isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-1/2 flex-col">
          <img alt={user?.username} className="md:w-[150px] w-[120px] mb-5 rounded-[50%] shadow-2xl"
               src={`https://robohash.org/${user.username}`}/>
          <div className='mb-[10px]'>
            <h1 className="flex flex-wrap font-semibold lg:text-2xl text-xl"><span
              className={"break-words max-w-[300px]"}>{user.firstName} {user.lastName}</span></h1>
            <div className="text-xs font-normal text-center text-slate-600">@{user.username}</div>
          </div>

          <div className="flex flex-col gap-3 max-w-[500px]">
            {/*firstname, lastname, gender*/}
            <div className="flex md:gap-5 gap-2">
              <div className="w-1/2">
                <label className="text-sm">First Name</label>
                <input type="firstName" name="firstName" id="firstName"
                       className="bg-tealActive border-none text-blackFactory rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       value={formValues['firstName']}
                       onChange={onChange}
                       disabled={isDisabled}
                       required/>

              </div>
              <div className="w-1/2">
                <label className="text-sm">Last name</label>
                <input type="lastName" id="lastName" name="lastName"
                       className="bg-tealActive border-none text-blackFactory rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       value={formValues['lastName']}
                       onChange={onChange}
                       disabled={isDisabled}
                       required
                />
              </div>
              <div className="w-1/3">
                <label className="text-sm">Gender</label>
                <input type="name" id="gender" name="gender"
                       className="bg-tealActive border-none text-blackFactory rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                       value={formValues['gender']}
                       onChange={onChange}
                       disabled={isDisabled}
                />
              </div>
            </div>
            {/*firstname, lastname, gender*/}

            {/*phonenumber*/}
            <div className="">
              <label className="text-sm">Phone Number</label>
              <input id="phoneNumber"
                     name="phoneNumber"
                     className="bg-tealActive border-none text-blackFactory rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     value={formValues['phoneNumber']}
                     onChange={onChange}
                     disabled={isDisabled}
              />
            </div>
            {/*phonenumber*/}

            {/*email*/}
            <div className="">
              <label className="text-sm">Email</label>
              <input type="email" id="email"
                     name="email"
                     className="bg-tealActive border-none text-blackFactory rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     value={formValues['email']}
                     onChange={onChange}
                     disabled={isDisabled}
              />
            </div>
            {/*email*/}

            {/*address*/}
            <div className="">
              <label className="text-sm">Address</label>
              <input type="name" id="address"
                     name="address"
                     className="bg-tealActive border-none text-blackFactory rounded-[4px] focus:ring-tealHover focus:border-tealHover block w-full p-2.5 placeholder:text-blackFactory"
                     value={formValues['address']}
                     onChange={onChange}
                     disabled={isDisabled}
              />
            </div>
            {/*address*/}

            {/*edit btn*/}
            <div className="flex justify-between items-center">
              {isDisabled ?
                <button
                  className="font-bold text-center text-blackFactory border border-redBase px-[35px] py-[7px] rounded-[4px] shadow-2xl lg:text-base text-sm"
                  type="button"
                  onClick={handleClick}
                >
                  Edit
                </button>
                :
                <div className="flex gap-4">
                  <button
                    className="font-bold text-center text-blackFactory border border-redBase lg:px-[35px] lg:py-[7px] px-4 py-2 rounded-[4px] shadow-2xl lg:text-base text-sm"
                    type="button"
                    onClick={() => {
                      handleClick()
                      setUserToFormValues(user)
                      // location.reload()
                    }}
                  >
                    Cancel
                  </button>

                  <button onClick={(e) => {
                    e.stopPropagation();
                    setConfirmPasswordModalOpen(true);
                  }}
                          className="font-bold text-center text-blackFactory border border-redBase lg:px-[35px] lg:py-[7px] rounded-[4px] shadow-2xl lg:text-base text-sm
                              px-4 py-2
                            ">
                    Update
                  </button>
                  <ConfirmPasswordModal id="confirm-password-modal" modalOpen={confirmPasswordModalOpen}
                                        setModalOpen={setConfirmPasswordModalOpen}/>
                </div>
              }
            </div>

            {/*change password, manage address*/}
            <div className="flex justify-between items-center">
              <Link className="text-tealHover hover:underline lg:text-base text-xs" to={`change-password`}>Change
                Password</Link>
              <button onClick={(e) => {
                e.stopPropagation()
                setAddressModalOpen(true)
              }}
                      className="font-bold text-center text-blackFactory border border-redBase px-2 py-2 rounded-md shadow-2xl lg:text-base text-xs">
                Delivery Addresses
              </button>
              <AddressPopUp id="address-pop-up" user={user} modalOpen={addressModalOpen}
                            setModalOpen={setAddressModalOpen}/>
            </div>

          </div>
        </div>
      </>
    )
  } else {
    return (
      <Spinner
        className="absolute top-1/2 left-1/2"
        size="xl"
        color="purple"
        aria-label="Purple spinner example"
      />
    )
  }

}
