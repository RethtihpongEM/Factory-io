import {Slide} from "@mui/material";
import React, {useRef, useState} from "react";
import {useProjectProtoContext} from "../../context/Factory/ProjectProtoContext.jsx";
import {Carousel} from "flowbite-react";

export const PrototypeView = ({prototype, id}) => {
  const {prototypeList, setPrototypeList, prjPrototypeValues, setPrjPrototypeValues} = useProjectProtoContext();
  const [activeProto, setActiveProto] = useState({});

  return (
    <>
      <Slide direction={"up"} in={true} unmountOnExit mountOnEnter>
        <section className={'flex flex-col'}>
          <div className="flex gap-x-4 lg:flex-row flex-col border border-blackFactory h-full rounded-md gap-3 p-4">
            <div className="flex flex-1 bg-whiteFactory bg-opacity-50 shadow-blueActive rounded-md justify-center">
              <Carousel indicators={false}>
                {prototype.image && Array.from(prototype.image)?.map((img, key) => {
                  return (
                    <div key={key} className="relative flex flex-col gap-2">
                      <div className={"flex justify-center"}>
                        <img loading="lazy" className="object-contain max-h-[450px]"
                             src={URL.createObjectURL(img)} alt=""/>
                      </div>
                      <button onClick={(e) => {
                        e.stopPropagation()
                        const fileArr = [...prototype.image];
                        fileArr.splice(key, 1)
                        prototypeList[id].image = fileArr;
                        setPrototypeList([...prototypeList])
                      }} className="bg-blackFactory text-whiteFactory w-full py-2">
                        Remove
                      </button>
                    </div>
                  )
                })}
              </Carousel>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-col gap-1 text-lg">
                <label htmlFor="proto_name">
                  <span className="font-semibold text-blueActive">{prototype.proto_name}</span></label>
                <label htmlFor="price">Price: <span
                  className="font-semibold text-redBase">${prototype.price}</span></label>
              </div>
              <div className={"flex flex-col gap-1 text-lg"}>
                <label htmlFor="description">Description</label>
                <div>{prototype.description}</div>
                <div className="flex gap-3">
                  <button className="bg-redHover px-2 py-1 rounded-md text-whiteFactory " onClick={() => {
                    prototypeList.splice(id, 1)
                    setPrototypeList([...prototypeList]);
                  }}>Delete
                  </button>
                  <label onClick={() => {
                    console.log(prototypeList)
                  }}
                         className={`flex justify-center  items-center w-8 h-8 cursor-pointer bg-blackFactory p-1 text-whiteFactory transition duration-200 rounded-[50%] hover:bg-blackFactory/50`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M12.475 4.71768L9.2875 1.56768L10.3375 0.517676C10.625 0.230176 10.9782 0.0864258 11.3973 0.0864258C11.8162 0.0864258 12.1692 0.230176 12.4562 0.517676L13.5062 1.56768C13.7937 1.85518 13.9437 2.20218 13.9562 2.60868C13.9687 3.01518 13.8312 3.36193 13.5437 3.64893L12.475 4.71768ZM11.3875 5.82393L3.4375 13.7739H0.25V10.5864L8.2 2.63643L11.3875 5.82393Z"
                        fill={"#fff"}/>
                    </svg>
                    <input multiple type="file" id={"protoImg"} className="hidden" accept={"image/*"}
                           onChange={(event) => {
                             // console.log(prototypeList)
                             prototypeList[id].image = [...prototypeList[id].image, ...event.target.files]
                             setPrototypeList([...prototypeList])
                             // prototype.image =
                           }}/>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Slide>
    </>
  );
};
