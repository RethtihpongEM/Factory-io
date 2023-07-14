// eslint-disable-next-line no-unused-vars
import React, {useRef, useEffect, useState, useContext} from 'react';
import Transition from '../../utils/Transition.jsx';
import {useAuthContext} from "../../context/AuthContext.jsx";
import Axios from "axios";
import ProductContext from "../../context/ProductContext.jsx";
import AdminPopUp from "./AdminPopUp.jsx";
import {ImageExpand} from "../../components/ImageExpand.jsx";

function ReviewModal({
                       productID,
                       // eslint-disable-next-line react/prop-types
                       id,
                       // eslint-disable-next-line react/prop-types
                       modalOpen,
                       // eslint-disable-next-line react/prop-types
                       setModalOpen
                     }) {

  const modalContent = useRef(null);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState([]);
  const {token, user} = useAuthContext()
  const [reviewPic, setReviewPic] = useState('');
  const {reviewsQueryReFetch} = useContext(ProductContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (token) {
      const formValue = new FormData()
      formValue.append('product_id', productID)
      formValue.append('title', title)
      formValue.append('description', description)
      formValue.append('user_id', user?.id)
      if (reviewPic !== '') {
        formValue.append('image', reviewPic)
      }
      try {
        await Axios.post('reviews', formValue, {
          headers: {'Content-Type': "multipart/form-data"}
        })
        setTitle('')
        setDescription('')
        setErrors([])
        setReviewPic('')
        reviewsQueryReFetch()
        setModalOpen(false)
      } catch (e) {
        if (e.response.status === 422) {
          setErrors(e.response.data.errors)
          console.log(e.response.data.errors)
        }
      }
    } else {
      setErrors([
        {
          noAccount: 'Please sign in to make a review'
        }
      ])
    }
  }

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
      setTitle('')
      setDescription('')
      setErrors([])
    };
    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    modalOpen
  }, [modalOpen]);

  const [expandImg, setExpandImg] = useState(false);

  return (
    <>
      <AdminPopUp modalOpen={modalOpen} setModalOpen={setModalOpen} id={"review-modal"} content={
        <div className={"w-screen h-screen flex justify-center items-center"}>
          <div
            className="overflow-auto w-[60%] h-[60%] p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between align-middle">
              <h5 className="md:text-2xl text-base font-semibold tracking-tight text-gray-900 dark:text-white">
                WRITE A REVIEW
              </h5>
              <button onClick={e => {
                e.stopPropagation()
                setModalOpen(false)
                setDescription('')
                setTitle('')
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="">Title: </label>
              <input className="py-2 px-4 border border-blackFactory rounded-md" id="title" name="title"
                     onChange={e => setTitle(e.target.value)} value={title}/>
              <span className="text-sm text-red-600 mt-2">{errors.title}</span>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description: </label>
              <textarea className="py-2 px-4 border border-blackFactory rounded-md" id="description" name="description"
                        rows={8}
                        onChange={e => setDescription(e.target.value)} value={description}/>
              <span className="text-sm text-red-600 mt-2">{errors.description}</span>
            </div>
            <div className={"flex flex-col"}>
              <div className={"flex md:flex-row flex-col md:items-center gap-2"}>
                <label
                  className="cursor-pointer h-fit lg:inline-flex md:px-3 md:py-1 md:w-60
                flex px-2 py-1 border border-slate-600 rounded-lg text-blackFactory
                md:text-base text-[12px]" htmlFor="files">
                  Select Image
                  <input className='hidden' type="file"
                         id="files" accept="image/*"
                         onChange={(e) => {
                           // cartItem.paymentError = '';
                           setReviewPic(e.target.files[0])
                         }}/>
                </label>
                {reviewPic &&
                  <div className={"flex flex-col gap-2"}>
                    <div className="">
                      <img onClick={(e) => {
                        e.stopPropagation();
                        setExpandImg(true);
                      }} className="md:w-[400px] aspect-video object-contain"
                           src={URL.createObjectURL(reviewPic)} alt=""/>
                      <ImageExpand imgSrc={URL.createObjectURL(reviewPic)} open={expandImg} setOpen={setExpandImg}/>
                    </div>
                    <div className="self-center flex gap-x-2">
                      <button
                        className="rounded-md md:text-base h-fit text-[14px] bg-redHover text-whiteFactory px-2 py-1"
                        onClick={() => setReviewPic('')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                        </svg>
                      </button>
                      <label
                        className="text-center rounded-md md:text-base h-fit text-[14px] text-whiteFactory bg-blueBase px-2 py-1"
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
              </div>

              <div className={"flex flex-col gap-1"}>
                <span className="text-sm text-red-600 mt-2">{errors[0]?.noAccount}</span>
                <button onClick={handleSubmit}
                        className="py-2 px-4 bg-tealActive rounded text-white font-semibold hover:bg-tealBase">Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      }/>
    </>
  );
}

export default ReviewModal;
