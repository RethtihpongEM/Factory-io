import React, {useContext, useEffect, useState} from "react";
import DonateContext from "../context/DonateContext.jsx";
// import {FilePond} from "react-filepond";
import {ProposalTab} from "../components/FactoryComponent/Tabs/ProposalTab.jsx";
import {ProjectTab} from "../components/FactoryComponent/Tabs/ProjectTab.jsx";
import {Slide} from "@mui/material";
import {Carousel} from "flowbite-react";
import {ImageExpand} from "../components/ImageExpand.jsx";
import BackProjectContext from "../context/BackProjectContext.jsx";
import ChatContext from "../context/ChatContext.jsx";

const imgUrl = `${import.meta.env.VITE_APP_URL}/projects`
export const BackProjectTab = ({projectPrototypes, project}) => {
  const [img, setImg] = useState('')
  const [expand, setExpand] = useState(false);
  const {
    totalAmount,
    setTotalAmount,
    errors,
    setComment,
    comment,
    image,
    setImage,
    setQty,
    qty,
    isHidden,
    setIsHidden,
    currentItem,
    setCurrentItem,
    storeBackProjectFunding
  } = useContext(BackProjectContext)

  const {
    setMessageImage,
  } = useContext(ChatContext);

  const options = [
    {value: '1', text: 'ABA - $$$'},
    {value: '2', text: 'ABA - KHR'},
  ];
  const [selected, setSelected] = useState(1);
  const handleChange = event => {
    setSelected(Number(event.target.value));
  };
  return (
    <div className={`flex flex-col`}>
      <div className={`flex w-full items-center flex-col justify-center gap-y-8 max-w-[500px]`}>
        <div className={`${isHidden && 'hidden'} flex flex-col gap-y-4`}>
          <div className="flex justify-start items-start flex-row gap-x-2">
            <div className="items-start flex flex-col gap-y-2">
              <h1 className="font-bold text-2xl">Back Project</h1>
              <p>Project name: {project?.name}</p>
              <p>Created by: {project?.user.firstName + ' ' + project?.user.lastName}</p>
              <p>List of prototypes: </p>
            </div>
          </div>
          {projectPrototypes?.map(projectPrototype => {
            const {id, description, price, project_prototype_assets} = projectPrototype;
            return (
              <Slide key={id} mountOnEnter unmountOnExit direction={"up"} in={true}>
                <section
                  className="grid grid-cols-2 auto-cols-fr gap-10 p-4 border-2 border-[#D9D9D9] rounded-md shadow-[#D9D9D9] shadow-md">
                  <Carousel>
                    {project_prototype_assets?.map(pro => {
                      const {image} = pro;
                      return (
                        <button onClick={(e) => {
                          e.stopPropagation();
                          setExpand(!expand);
                          setImg(image);
                        }} key={pro.id}
                                className="relative flex justify-center bg-[#D9D9D9] shadow-blueActive shadow-sm">
                          <img className="object-cover rounded-md max-h-[250px]" loading={"lazy"}
                               src={`${imgUrl}/${image}`}
                               alt={`prototype-${id}`}/>
                        </button>
                      )
                    })}
                  </Carousel>
                  <ImageExpand open={expand} setOpen={setExpand} imgSrc={`${imgUrl}/${img}`}/>
                  <div className=''>
                    <div className="flex flex-col text-lg">
                      <p className='font-semibold text-redBase'>$ {price}</p>
                      <div className="text-blackFactory">Description:
                        <p>
                          {description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        setIsHidden(true)
                        setCurrentItem(projectPrototype)
                        setTotalAmount(price)
                        setQty(1)
                      }}
                      className={"w-fit text-whiteFactory bg-[#1037A9] rounded-[20px] px-4 py-2"}>Back this
                      project
                    </button>
                  </div>
                </section>
              </Slide>
            )
          })}
        </div>
        <div className={`${!isHidden && 'hidden'} flex flex-col gap-y-2 text-blackFactory w-full min-w-[500px]`}>
          <div className="items-start flex flex-col gap-y-2">
            <h1 className="font-bold text-2xl">Back Project</h1>
            <p className={`font-semibold`}>Prototype Info:</p>
            <p>Description: {currentItem?.description}</p>
            <p>Price: $ {currentItem?.price}</p>
          </div>
          <div className="flex items-center md:gap-x-1">
            Qty :
            <button
              className={`${qty <= 1 && 'hidden'} transition duration-150 px-3 py-1 hover:rounded-[50%] hover:bg-whiteFactory active:bg-grayFactory`}
              onClick={() => {
                setQty(qty - 1)
                setTotalAmount(totalAmount - currentItem?.price)
              }}>-
            </button>
            <input
              type="text"
              min="1"
              value={qty}
              pattern="/[^0-9]/g"
              onChange={event => {
                setQty(Number(event.target.value));
                setTotalAmount(totalAmount * qty)
              }}
              className="text-center text-sm border-blackFactory w-[10%] md:py-2 p-0"
              placeholder={qty}
            />
            <button
              className="transition duration-150 px-3 py-1 hover:rounded-[50%] hover:bg-whiteFactory active:bg-grayFactory"
              onClick={() => {
                setQty(qty + 1)
                setTotalAmount(totalAmount + currentItem?.price)
              }}>+
            </button>
            {errors && <span className="text-red-600 text-sm mt-2">{errors.qty}</span>}
          </div>
          <h1 className={`text-xl font-bold`}>
            Total: $ {totalAmount}
          </h1>
          {errors && <span className="text-red-600 text-sm mt-2">{errors.amount}</span>}
          <div className={`justify-center items-center flex flex-col`}>
            <div className="flex flex-col w-full">
              <label htmlFor="comment">Comment</label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value)
                }}
                name="comment" id="comment" className="text-blackFactory border border-slate-600 rounded-md"/>
              {errors && <span className="text-red-600 text-sm mt-2">{errors.comment}</span>}
            </div>
            <div>
              <div className={`flex flex-col gap-y-4 justify-center items-center`}>
                <select
                  value={selected}
                  onChange={event => handleChange(event)}
                  className="bg-whiteFactory py-0 px-2 rounded-sm w-full
              md:text-base text-blackFactory font-semibold text-[10px]">
                  {options.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    );
                  })}
                </select>
                <div>
                  {selected === 1 &&
                    (
                      <img className={`object-contain
              md:w-[200px] md:h-[200px] md:mt-0 mt-2
              `} src="/assets/images/qr-dollars.jpg"
                           alt=""/>
                    )
                  }

                  {selected === 2 &&
                    <img className={`object-contain
              md:w-[200px] md:h-[200px] md:mt-0 mt-2
              `} src="/assets/images/qr-riel.jpg"
                         alt=""/>}
                </div>
                <div className={`flex flex-col`}>
                  <label
                    className="cursor-pointer lg:inline-flex md:px-3 md:py-1 md:w-60 bg-whiteFactory
                flex px-2 py-[0.1rem] border border-slate-600 rounded-lg text-blackFactory
                md:text-base text-[12px] mb-2" htmlFor="file">
                    Select Image
                    <input className='hidden' type="file"
                           id="file" accept="image/*"
                           onChange={(e) => {
                             setImage(e.target.files[0])
                             setMessageImage(e.target.files[0])
                           }}/>
                  </label>
                  {image &&
                    <div className={"flex flex-col gap-2"}>
                      <div className="">
                        <img className="md:w-[250px] object-contain"
                             src={URL.createObjectURL(image)} alt=""/>
                      </div>
                      <div className="flex gap-x-2">
                        <button className="rounded-md md:text-base text-[14px] bg-redHover text-whiteFactory px-2 py-1"
                                onClick={(e) => {
                                  setImage('')
                                  setMessageImage('')
                                }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                               stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                          </svg>
                        </button>
                        <label
                          className="text-center rounded-md md:text-base text-[14px] text-whiteFactory bg-blueBase px-2 py-1"
                          htmlFor="files">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                               stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                          </svg>
                        </label>
                      </div>
                    </div>
                  }
                  {errors && <span className="text-red-600 text-sm mt-2 mb-2">{errors.image}</span>}
                  <button
                    onClick={(e) => {
                      setMessageImage(image)
                      storeBackProjectFunding(project)
                    }}
                    className="rounded-[20px] px-6 py-2 text-whiteFactory bg-redHover">Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
