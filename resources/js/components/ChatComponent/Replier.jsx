import React, {useEffect} from "react";
import {useState} from "react";
import AdminPopUp from "../Modals/AdminPopUp.jsx";
import {ImageExpand} from "../ImageExpand.jsx";

const imgUrl = import.meta.env.VITE_APP_URL;
export const Replier = (props) => {
  const {messageContent, time, image, setModalOpen} = props;
  const [imgExpandReply, setImgExpandReply] = useState(false);
  const timePrefix = new Date(time).getHours();

  // const ImageContent = () => {
  //   return (
  //     <img onClick={(e) => {
  //       e.stopPropagation();
  //       setImgExpandReply(true)
  //     }} className="md:max-w-[250px] max-w-[156px] object-contain" src={`${imgUrl}/${image}`} alt=""/>
  //   );
  // }

  return (
    <>
      {/*replier*/}
      <div className="flex w-full mt-2 space-x-3 max-w-xs">
        {/*pfp*/}
        <div className="flex-shrink-0 h-10 w-10 rounded-full border">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 30 30" fill="none">
            <path
              d="M23.4 18.4499C23.8375 17.3874 24.075 16.2499 24.075 14.9999C24.075 14.0999 23.9375 13.2374 23.7 12.4374C22.8875 12.6249 22.0375 12.7249 21.15 12.7249C19.3325 12.7268 17.5411 12.2918 15.9269 11.4564C14.3127 10.621 12.923 9.40982 11.875 7.92487C10.7539 10.6376 8.63891 12.8196 5.9625 14.0249C5.9125 14.3374 5.9125 14.6749 5.9125 14.9999C5.9125 16.1933 6.14756 17.375 6.60424 18.4775C7.06093 19.5801 7.73031 20.5819 8.57417 21.4257C10.2784 23.1299 12.5898 24.0874 15 24.0874C16.3125 24.0874 17.575 23.7999 18.7125 23.2874C19.425 24.6499 19.75 25.3249 19.725 25.3249C17.675 26.0124 16.0875 26.3499 15 26.3499C11.975 26.3499 9.0875 25.1624 6.9625 23.0249C5.67 21.7363 4.70921 20.1536 4.1625 18.4124H2.5V12.7249H3.8625C4.2753 10.7155 5.22437 8.85538 6.60899 7.34186C7.99361 5.82834 9.76214 4.71788 11.7269 4.12832C13.6917 3.53876 15.7794 3.49209 17.7686 3.99326C19.7577 4.49442 21.5741 5.52474 23.025 6.97487C24.6003 8.54394 25.6748 10.545 26.1125 12.7249H27.5V18.4124H27.425L22.975 22.4999L16.35 21.7499V19.6624H22.3875L23.4 18.4499ZM11.5875 14.7124C11.9625 14.7124 12.325 14.8624 12.5875 15.1374C12.8513 15.4033 12.9993 15.7628 12.9993 16.1374C12.9993 16.512 12.8513 16.8714 12.5875 17.1374C12.325 17.3999 11.9625 17.5499 11.5875 17.5499C10.8 17.5499 10.1625 16.9249 10.1625 16.1374C10.1625 15.3499 10.8 14.7124 11.5875 14.7124ZM18.4 14.7124C19.1875 14.7124 19.8125 15.3499 19.8125 16.1374C19.8125 16.9249 19.1875 17.5499 18.4 17.5499C17.6125 17.5499 16.975 16.9249 16.975 16.1374C16.975 15.7594 17.1251 15.397 17.3924 15.1297C17.6596 14.8625 18.0221 14.7124 18.4 14.7124Z"
              fill="#2D335B">
            </path>
          </svg>
        </div>
        {/*pfp*/}
        <div>
          <div
            className={`${image ? 'p-0' : 'p-3'} ${messageContent ? 'bg-gray-300' : 'bg-transparent'} rounded-r-lg rounded-bl-lg`}>
            <p className={`${image && 'p-3'} text-sm`}>{messageContent}</p>
            <span>
              {image &&
                <img onClick={(e) => {
                  e.stopPropagation();
                  setImgExpandReply(true)
                }} className="cursor-pointer md:max-w-[250px] max-w-[156px] object-contain"
                     src={`${imgUrl}/${image}`} alt=""/>
              }
              <ImageExpand open={imgExpandReply} imgSrc={`${imgUrl}/${image}`} setOpen={setImgExpandReply}/>
            </span>
          </div>
          <span
            className="text-xs text-gray-500 leading-none">{time.slice(10).slice(0, 6)}{timePrefix >= 12 ? ' PM' : ' AM'}</span>
        </div>
      </div>
      {/*replier*/}
    </>
  );
};
