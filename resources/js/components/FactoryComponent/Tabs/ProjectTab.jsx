import React, {useState} from "react";
import {Slide} from "@mui/material";
import {useProjectProtoContext} from "../../../context/Factory/ProjectProtoContext.jsx";
import {PrototypeView} from "../PrototypeView.jsx";
import {body} from "@material-tailwind/react/theme/base/typography.js";
import {Carousel} from "flowbite-react";

const imgUrl = import.meta.env.VITE_APP_URL;
export const ProjectTab = () => {
  const [open, setOpen] = useState(false);

  const {
    picture,
    setPicture,
    handlePicture,
    prjPrototypeValues,
    setPrjPrototypeValues,
    submitPrototype,
    prototypeList
  } = useProjectProtoContext();

  return (
    <div className={'transition duration-500 flex flex-col gap-4'}>
      <div className={"grid grid-cols-1 gap-4 auto-rows-fr"}>
        {prototypeList?.map((prototype, key) => {
          return (
            <PrototypeView key={key} id={key} prototype={prototype}/>
          )
        })}
      </div>
      <button onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }} className="self-start flex items-center gap-x-2 bg-[#D9D9D9] border rounded-[20px] px-4 py-2">
        Add Template
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M10.3333 23.6663V13.6663H0.333313V10.333H10.3333V0.333008H13.6666V10.333H23.6666V13.6663H13.6666V23.6663H10.3333Z"
            fill="#9747FF"/>
        </svg>
      </button>

      {/*{open && <ProjectTmpForm />}*/}
      {open &&
        (
          <Slide direction={"up"} in={open} unmountOnExit mountOnEnter>
            <section className={'flex flex-col'}>
              <div className="flex gap-x-4 lg:flex-row flex-col border border-blackFactory  rounded-md gap-3 p-4">
                <div className="flex-1 flex flex-col gap-2 justify-center">
                  <label
                    className={`${picture?.filter(pic => pic?.type.slice(0, 5) === 'image').length > 0 && 'hidden'} flex-1 transition duration-200 flex items-center justify-center bg-gray-300 border rounded-md hover:bg-gray-500 cursor-pointer`}
                    htmlFor="image">
                    <div
                      className={`${picture?.filter(pic => pic?.type.slice(0, 5) === 'image').length > 0 && 'hidden'} flex items-center gap-2`}>
                      {/*image icon*/}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                      </svg>
                      Add Photos
                    </div>
                    <input onChange={(e) => handlePicture(e)} multiple className="hidden" type="file" accept={"image/*"}
                           id='image'/>
                  </label>
                  {picture?.filter(pic => pic?.type.slice(0, 5) === 'image').length > 0 && (
                    <>
                      <Carousel indicators={false}>
                        {picture?.filter(pic => pic?.type.slice(0, 5) === 'image').map((pic, key) => {
                          return (
                            <div key={key}
                                 className="relative flex-col flex gap-1 justify-center shadow-2xl bg-blackFactory/10">
                              <img loading="lazy" className="object-contain max-h-[350px]"
                                   src={URL.createObjectURL(pic)}
                                   alt=""/>
                              <button
                                className={`self-center py-2 mt-auto bg-blackFactory text-whiteFactory transition w-full duration-200 hover:bg-blackFactory/50`}
                                onClick={() => {
                                  const fileListArr = [...picture]; // convert filelist to arr
                                  fileListArr.splice(key, 1)
                                  setPicture(fileListArr)
                                }}>
                                Remove
                              </button>
                            </div>
                          )
                        })}
                      </Carousel>
                      <label
                        className="transition duration-200 self-center rounded-md bg-blueBase text-sm text-whiteFactory py-2 w-fit px-12 hover:shadow-lg hover:shadow-grayFactory"
                        htmlFor="addMoreProto">
                        Add More
                        <input accept={"image/*"} id={"addMoreProto"} multiple className="hidden" type="file"
                               onChange={event => {
                                 const fileList = [...event.target.files];
                                 setPicture([...picture, ...fileList])
                               }}/>
                      </label>
                    </>
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="price">Price</label>
                    <input min={0} value={prjPrototypeValues.price}
                           onChange={e => setPrjPrototypeValues({...prjPrototypeValues, price: Number(e.target.value)})}
                           className={"rounded-md"} type="number" id={'price'}/>
                  </div>
                  <div className={"flex flex-col gap-1"}>
                    <label htmlFor="description">Description</label>
                    <textarea value={prjPrototypeValues.description} onChange={e => setPrjPrototypeValues({
                      ...prjPrototypeValues,
                      description: e.target.value
                    })} className="rounded-md" id="description" cols="30" rows="10"></textarea>
                  </div>
                  <button onClick={() => {
                    submitPrototype(setOpen);
                  }} className="w-full rounded-md border-2 bg-[#D9D9D9] border-blueBase py-2">
                    Submit
                  </button>
                  <span className={"text-center text-redHover"}>{prjPrototypeValues.errorMsg}</span>
                </div>
              </div>
            </section>
          </Slide>
        )
      }
    </div>
  );
};
