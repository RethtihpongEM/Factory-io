import {GoogleMap, useJsApiLoader, MarkerF} from "@react-google-maps/api";
import React, {createContext, useContext, useEffect, useState} from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete"
import Axios from "axios";
import {useAuthContext} from "./AuthContext.jsx";
import {useQuery} from "@tanstack/react-query";
import {isRouteErrorResponse} from "react-router-dom";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL + "/api/v1/";

export const GoogleMapsContext = createContext();
const libraries = ['places'];
export const GoogleMapsProvider = ({children}) => {
  const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
      libraries
    }
  );
  const {user} = useAuthContext();
  const [placeId, setPlaceId] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState([]);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [marker, setMarker] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const {data: addresses, refetch: addressesReFetch, isLoading: addressesIsLoading} = useQuery(['addresses'], () => {
    return Axios.get(`addresses`).then(({data}) => {
      return data.data;
    })
  })
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressExist, setAddressExist] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setMarker([{lat: latitude, lng: longitude}])
    })
  }, []);

  const getLtLgPl = (placeId) => {
    const geocode = new google.maps.Geocoder();
    geocode.geocode({placeId: placeId}, (results, status) => {
      if (status === 'OK' && results[0]) {
        const {lat, lng} = getLatLng(results[0]);
        setLatitude(lat);
        setLongitude(lng);
        setMarker([{lat, lng}]);
      }
    })
  }

  const getAddress = async (lat, lng) => {
    const geoCode = new google.maps.Geocoder();
    await geoCode.geocode({location: {lat, lng}})
      .then(res => {
        if (res.results[0]) {
          setAddress(res.results[0].formatted_address);
          checkAddress(res.results[0].place_id)
          setPlaceId(res.results[0].place_id)
        }
      }).catch(e => {
        setErrors(e.response.data.errors)
      })
  }

  const [isPostAddress, setIsPostAddress] = useState(false);

  const storeAddress = async (postAddress) => {
    if (!addressExist) {
      setIsPostAddress(true)
      try {
        await Axios.post('addresses', postAddress).then(async (res) => {
          await addressesReFetch()
          setIsPostAddress(false);
          return res
        })
      } catch (e) {
        setErrors(e.response.data.errors)
        // console.log(e.response.data.errors)
      }
    } else {
      setErrors([{...errors, addressExist: 'That address is already in your list'}])
    }
    setIsPostAddress(false);
  }

  const getUserAddress = async (id) => {
    setAddressLoading(true);
    await Axios.get(`userAddress/${id}`).then(({data}) => {
      setUserAddress(data);
      setAddressLoading(false);
      return data.data
    });
  }

  const checkAddress = async (placeId) => {
    if (placeId) {
      await Axios.get(`/checkAddress/${user?.id}/${placeId}`).then((res) => setAddressExist(res.data))
    }
  }

  const [isDeleteAddress, setIsDeleteAddress] = useState(false);
  const deleteAddress = async (addressID) => {
    try {
      setIsDeleteAddress(true);
      await Axios.delete(`addresses/${addressID}`).then(async () => {
        setIsDeleteAddress(false);
        await addressesReFetch()
      })
    } catch (e) {
      setErrors(e.response.data.errors)
      // console.log(e)
    }
    setIsDeleteAddress(false);
  }

  const editAddress = async (currentAddress, setCurrentAddress) => {
    try {
      setIsPostAddress(true);
      await Axios.put(`addresses/${currentAddress?.id}`, currentAddress).then((res) => {
        addressesReFetch()
      }).then(res => {
        setIsPostAddress(false);
        setCurrentAddress({...currentAddress, address: ''})
      })
    } catch (e) {
      setErrors(e.response.data.errors)
      // console.log(e)
    }
    setIsPostAddress(false);
  }
  const PlacesAutoComplete = ({setMarker}) => {
    const {
      ready,
      value,
      setValue,
      suggestions: {status, data},
      clearSuggestions
    } = usePlacesAutocomplete();
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
      const results = await getGeocode({address})
      const {lat, lng} = await getLatLng(results[0]);
      setLatitude(lat);
      setLongitude(lng);
      getAddress(lat, lng);
      setMarker([{lat, lng}]);
    };
    return (
      <>
        <input type="text"
               placeholder="Search..."
               style={{
                 backgroundColor: "white"
               }}
               className="w-[100%] px-12 search-bar py-2 border rounded-md border-gray-500"
               value={value}
               onChange={({target}) => setValue(target.value)}/>
        <div className={`flex flex-col ${value && 'my-3'}`}>
          {status === "OK" && data.map(({place_id, description}) => {
            return (
              <button className="text-start px-4 py-2 border" onClick={() => {
                handleSelect(description)
              }} key={place_id}>{description}</button>
            )
          })}
        </div>
      </>
    )
  }

  const GoogleMaps = ({height, hideSearch}) => {
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const currentLocation = async () => {
      navigator.geolocation.getCurrentPosition(position => {
        const {longitude, latitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        getAddress(latitude, longitude)
        setMarker([{
          lng: longitude,
          lat: latitude
        }])
      })
    }

    if (!isLoaded) {
      return (
        <>
          Loading...
        </>
      )
    }

    return (
      <>
        <div className="relative flex-col flex gap-3">
          <span className={`${hideSearch && 'hidden'}`}>
            <PlacesAutoComplete setMarker={setMarker}/>
          </span>
          <div className="absolute flex bottom-0 z-20">
            <button className="border bg-blueBase text-xs text-whiteFactory px-2"
                    onClick={() => {
                      map.panTo(marker[0])
                    }}>
              Pan your Location
            </button>
            <button
              title="Current Location" className="bg-white shadow-xl px-2 py-2"
              onClick={async () => await currentLocation()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path className="text-tealBase" strokeLinecap="round" strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path className="text-tealBase" strokeLinecap="round" strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
            </button>
          </div>
          <GoogleMap
            center={{lat: latitude, lng: longitude}}
            zoom={15}
            mapContainerStyle={{width: 100 + "%", height: height + "px"}}
            onLoad={map => setMap(map)}
            options={{
              disableDefaultUI: true,
              fullscreenControl: true,
              zoomControl: true,
            }}
            onClick={async (event) => {
              setTimeout(() => {
                map.panTo({
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng()
                })
              }, 500)
              setMarker([{
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
              }])
              setLongitude(event.latLng.lng());
              setLatitude(event.latLng.lat());
              await getAddress(event.latLng.lat(), event.latLng.lng())
            }}>
            {marker.map((mark, index) => <MarkerF key={index} position={mark}/>)}
          </GoogleMap>
        </div>
      </>
    );
  };

  return (
    <>
      <GoogleMapsContext.Provider value={{
        isDeleteAddress,
        setIsDeleteAddress,
        isPostAddress,
        setIsPostAddress,
        getLtLgPl,
        editAddress,
        addressExist,
        setAddressExist,
        setAddressLoading,
        addressLoading,
        addresses,
        addressesReFetch,
        addressesIsLoading,
        userAddress,
        setUserAddress,
        getUserAddress,
        deleteAddress,
        checkAddress,
        storeAddress,
        setLatitude,
        latitude,
        setLongitude,
        longitude,
        placeId,
        setPlaceId,
        GoogleMaps,
        address,
        setAddress,
        getAddress,
        errors,
        setErrors
      }}>
        {children}
      </GoogleMapsContext.Provider>
    </>
  );
};

