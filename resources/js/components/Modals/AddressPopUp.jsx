import React, {useEffect, useState, useContext, useRef} from 'react';
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";
import AdminPopUp from "./AdminPopUp.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Spinner} from "flowbite-react";

function AddressPopUp({modalOpen, setModalOpen}) {
  const {user} = useAuthContext();
  const [editBtn, setEditBtn] = useState(false)
  const {
    GoogleMaps,
    addresses,
    setAddress,
    address,
    longitude,
    latitude,
    getAddress,
    checkAddress,
    storeAddress,
    setPlaceId,
    placeId,
    getLtLgPl,
    editAddress,
    deleteAddress,
    errors,
    setErrors,
    addressExist,
    isPostAddress,
    setIsPostAddress,
    isDeleteAddress,
    setIsDeleteAddress,
  } = useContext(GoogleMapsContext);
  const ref = useRef();

  const [currentAddress, setCurrentAddress] = useState({
    address: '',
    placeId: '',
    user_id: user?.id
  });
  const handleAddressChange = (event) => {
    setErrors([{...errors, addressExist: ''}])
    setCurrentAddress({...currentAddress, address: event.target.value})
  }

  useEffect(() => {
    checkAddress(placeId)
    setCurrentAddress({...currentAddress, placeId: placeId, address: address})
  }, [address, latitude, longitude]);

  useEffect(() => {
    getLtLgPl(placeId)
  }, [placeId]);

  return (
    <>
      <AdminPopUp
        modalOpen={modalOpen} setModalOpen={setModalOpen} id={"address-pop-up"}
        content={
          <div className={"flex justify-center items-center w-screen h-screen"}>
            <div
              className={"overflow-auto flex flex-col md:w-[60%] h-[70%] w-[80%] bg-white py-8 md:px-12 px-6 gap-4 rounded-md"}>
              <div className="flex flex-col gap-4">
                <div className={"flex justify-between items-center"}>
                  <label htmlFor="address"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                  <button onClick={e => {
                    e.stopPropagation()
                    setModalOpen(false)
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <input ref={ref} type="address" name="address" id="address" placeholder={"Address..."}
                       className="border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                       onChange={(e) => handleAddressChange(e)}
                       value={currentAddress?.address ?? ''}
                       required/>
                <span className="text-redBase text-xs">{errors && errors?.address?.map(error => error)}</span>
                <GoogleMaps height="300" hideSearch={true}/>
                {/*{errors.address && <span className="text-sm text-red-400">{errors.address[0]}</span>}*/}
              </div>
              {!editBtn ?
                <div className={"flex justify-center"}>
                  <button disabled={isPostAddress || false}
                          onClick={(e) => {
                            e.stopPropagation()
                            storeAddress(currentAddress).then(() => {
                              setEditBtn(false);
                              setCurrentAddress({...currentAddress, address: ''})
                            })
                          }}
                          className={`w-fit mx-auto font-bold text-center text-blackFactory border border-redBase px-4 py-2 rounded-md shadow-2xl md:text-base text-xs`}>
                    Create new
                    {isPostAddress && <span className={"ml-2"}><Spinner color={"purple"} size={"md"}/></span>}
                  </button>

                  <div className={"absolute bottom-[-24px] text-sm text-redBase"}>
                    {errors && errors[0]?.addressExist}
                  </div>
                </div>
                :
                <div className="flex justify-between gap-4">
                  <button onClick={(e) => {
                    e.stopPropagation()
                    setAddress('')
                    setEditBtn(!editBtn)
                  }}
                          className={`w-full mx-auto font-bold text-center text-blackFactory border border-redBase px-4 py-2 rounded-[4px] shadow-2xl md:text-base text-xs`}>
                    Cancel
                  </button>
                  <button disabled={isPostAddress || false} onClick={(e) => {
                    e.stopPropagation()
                    editAddress(currentAddress, setCurrentAddress)
                  }}
                          className={`w-full mx-auto font-bold text-center text-blackFactory border border-redBase px-4 py-2 rounded-[4px] shadow-2xl md:text-base text-xs`}>
                    Edit
                    {isPostAddress && <span className={"ml-2"}><Spinner color={"purple"} size={"md"}/></span>}
                  </button>
                </div>}
              <div className={"xl:text-base text-sm"}>
                {addresses?.filter(address => address.user_id === user.id).length === 0 &&
                  <div>No delivery address</div>}
                {addresses?.filter(address => address.user_id === user.id).map((address, key) => {
                  return (
                    <div key={key}
                         className="flex md:flex-row flex-col gap-2 md:gap-4 justify-between border-b-2 px-4 py-2">
                      <p className=''>{address.address}</p>
                      <div className="flex flex-row md:justify-normal justify-end gap-4">
                        <button onClick={(e) => {
                          e.stopPropagation()
                          setEditBtn(true)
                          setAddress(address.address)
                          setPlaceId(address.placeId)
                          setCurrentAddress(address)
                          ref.current.focus();
                        }} className="text-tealActive hover:underline">Edit
                        </button>
                        <button disabled={isDeleteAddress || false} onClick={(e) => {
                          // e.stopPropagation()
                          // setIsPostAddress(false)
                          deleteAddress(address?.id)
                        }} className="text-redActive hover:underline">
                          Delete {isDeleteAddress && <span className={"ml-2"}><Spinner color={"purple"} size={"md"}/></span>}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        }/>
    </>
  );
}

export default AddressPopUp;
