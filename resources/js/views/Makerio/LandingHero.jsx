import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import ProductContext from "../../context/ProductContext.jsx";

export const LandingHero = () => {
  const {setSearchInput} = useContext(ProductContext)
  const navigate = useNavigate()
  return (
    <>
      <div className="min-[1920px]:gap-12
        lg:py-12
        md:py-8 py-4 gap-10 flex flex-col">
        {/*1st section*/}
        <section className="lg:flex lg:flex-row lg:justify-aroundflex flex-col">
          <div className="flex-1 lg:inline-block flex flex-col items-end">
            <div>
              <p className="mb-3 font-bold xl:text-4xl
                lg:text-2xl
                md:text-3xl
                text-xl
              ">
                Shop your component with us
              </p>
              <p className="mb-3 leading-7 text-base">
                Maker.io is an online marketplace that specializes in IoT gadgets. Our business is based on
                inventing, manufacturing, and selling our own Internet of Things devices, such as device controllers
                and sensors. We cater to a wide spectrum of clientele, from individual customers to small enterprises
                and industrial clients.
              </p>
            </div>
            <div>
              <Link
                to={'shop'}
                className=" inline-flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-700 duration-300 bg-[#B21317] rounded-[50px] px-3 py-1">
                GET STARTED
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img className="min-[1920px]:w-[500px] min-[1920px]:h-[220px]
              xl:w-[400px] xl:h-[220px] object-contain
              lg:w-[300px]
              md:w-[400px]
            " src="/assets/images/MQ4-Gas-Sensor.jpg" alt=""/>
          </div>

        </section>
        {/*2nd section*/}
        <section className="flex flex-col justify-center gap-10">
          <span className="font-bold leading-4 md:text-start text-center">
            Featured on
          </span>
          <div className="md:flex md:flex-row md:justify-between flex flex-col items-center justify-center gap-y-12">
            <div className="flex justify-start items-center">
              <a title="Factory.io" href={"https://factoryio.digital/"} target={'_blank'}>
                <img className="object-contain h-[20px] lg:h-[18px] md:h-[16px]" src="/assets/images/factory.png"
                     alt=""/>
              </a>
            </div>
            <div className="flex justify-start items-center">
              <Link title="RobotX" to={"#RobotX"}>
                <img className="object-contain h-[30px] lg:h-[30px]" src="/assets/images/robotx.png" alt=""/>
              </Link>
            </div>
            <div className="flex justify-start items-center">
              <a title="Reachsa.io" href={"https://reachsaio.netlify.app"} target={"_blank"}>
                <img className="object-contain h-[55px] lg:h-[50px] md:h-[46px]" src="/assets/images/reachsa.png"
                     alt=""/>
              </a>
            </div>
          </div>
        </section>
        {/*3rd section*/}
        <section className="flex flex-col gap-10 justify-center">
          <div className="flex font-bold text-lg justify-center ">
            Category
          </div>

          <div className="min-[1880px]:px-36 xl:px-48 lg:px-10 grid auto-rows-fr
            lg:grid-cols-3 gap-y-6
            md:grid-cols-2 md:px-10
          ">

            <div className="flex justify-center">
              <div
                className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                onClick={() => {
                  setSearchInput('Sensor')
                  navigate('shop')
                }}
              >
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/Sound-Detection-Sensor-Module.jpg" alt=""/>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="font-bold text-[#00727A]">
                    Sensor
                  </div>
                  <button>
                    <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                onClick={() => {
                  setSearchInput('microcontroller')
                  navigate('shop')
                }}
                className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/Microcon.png"
                       alt=""/>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="mr-3 font-bold text-[#00727A]">
                    Micro-Controller
                  </div>
                  <button>
                    <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                onClick={() => {
                  setSearchInput('microprocessor')
                  navigate('shop')
                }}
                className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/mproc.jpg"
                       alt=""/>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="mr-3 font-bold text-[#00727A]">
                    Micro-Processor
                  </div>
                  <button>
                    <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                onClick={() => {
                  setSearchInput('tools')
                  navigate('shop')
                }}
                className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/toolpic.jpg"
                       alt=""/>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="mr-3 font-bold text-[#00727A]">
                    Tools
                  </div>
                  <button>
                    <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                onClick={() => {
                  setSearchInput('resistor')
                  navigate('shop')
                }}
                className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/electro.jpg"
                       alt=""/>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="mr-3 font-bold text-[#00727A]">
                    Electronic Component
                  </div>
                  <button>
                    <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                onClick={() => {
                  setSearchInput('battery')
                  navigate('shop')
                }}
                className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/battery.jpg"
                       alt=""/>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="mr-3 font-bold text-[#00727A]">
                    Battery
                  </div>
                  <button>
                    <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-center">
            <Link to="shop" onClick={() => {
              setSearchInput('')
            }}
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-700 duration-300 bg-[#B21317] rounded-[50px] px-3 py-1">
              SEE MORE
            </Link>
          </div>

        </section>
        {/*4th section*/}
        <section className="flex flex-col gap-y-6 justify-center">
          <div className="font-bold text-lg md:text-start text-center">
            About Us
          </div>
          <div className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300
                border border-gray-300 shadow-lg rounded-lg w-full
                lg:p-8
                md:flex md:flex-row md:justify-between
                flex flex-col items-center gap-6 p-6">

            <div className="flex-1 flex flex-col justify-start">
              <div className="font-semibold text-lg">
                Our Mojo
              </div>
              <div className="font-normal">
                To provide Cambodians with the newest technology through readily available and inexpensive electrical
                components.
              </div>
            </div>

            <div className="flex-1 flex justify-end">
              <img className="w-[250px] h-[150px] object-contain" src="/assets/images/Sound-Detection-Sensor-Module.jpg"
                   alt=""/>
            </div>

          </div>
        </section>
      </div>
    </>
  )
    ;
};
