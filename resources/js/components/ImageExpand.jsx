import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card} from "flowbite-react";
import React, {useContext, useEffect, useState} from "react";

export const ImageExpand = ({open, setOpen, imgSrc}) => {
  // close on click outside

  useEffect(() => {
    const clickHandler = (event) => {
      if (!open) return
      setOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100vw",
    minHeight: "100vh"
  };

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="div" id="modal-modal-description">
            <div className="w-full h-full flex justify-center items-center">
              <div className={"relative flex justify-center items-center w-[65%] aspect-video"}>
                <button
                  className="absolute top-1 right-1 transition bg-whiteFactory duration-300 rounded-[50%] hover:bg-opacity-50"
                  onClick={event => {
                    event.stopPropagation();
                    setOpen(false);
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <img className={"object-contain"} src={imgSrc} alt=""/>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
