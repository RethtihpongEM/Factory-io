import React, {useContext, useState} from "react";
import ReviewModal from "./Modals/ReviewModal.jsx";
import ProductContext from "../context/ProductContext.jsx";
import {ReviewSection} from "./ReviewSection.jsx";


export const ProductReview = (props) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const {reviews} = useContext(ProductContext)
  const {id} = props.item;
  const filteredItem = reviews.filter((review) => review.product_id === id)
  return (
    <>
      <div
        className="max-w-[1000px] p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto min-w-[300px] mt-16 flex flex-col gap-4">
        <div className="flex justify-between">
          <h5 className="mb-2 lg:text-2xl md:text-base font-semibold tracking-tight text-gray-900 dark:text-white">Review
            ({filteredItem?.length})</h5>
          <button
            className={`px-4 py-[4px] text-white font-bold bg-redBase rounded-[20px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110`}
            onClick={(e) => {
              e.stopPropagation();
              setReviewModalOpen(true);
            }}
            aria-controls="review-item-modal"
          >
            Review
          </button>
        </div>
        {
          filteredItem.length === 0 ? <span className={"text-sm text-grayFactory"}>No reviews yet !</span> : null
        }
        {filteredItem.map((review, key) => {
          return (
            <ReviewSection review={review} key={key}/>
          )
        })
        }
        <ReviewModal id="review-item-modal" modalOpen={reviewModalOpen} setModalOpen={setReviewModalOpen}
                     productID={id}/>
      </div>
    </>
  )
}
