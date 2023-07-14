import {ItemCard} from "../../components/CartComponents/ItemCard.jsx";
import React, {Fragment, Suspense, useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import {Pagination} from "@mui/material";
import {Spinner} from "flowbite-react";
import {Dropdown} from "flowbite-react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";

export const MakerLanding = () => {
  const {
    fetchTypes,
    types,
    searchInput,
    setSearchInput,
    setPage,
    page,
    pageSum,
    itemsPaginate,
    itemsPageLoading
  } = useContext(ProductContext);
  const [category, setCategory] = useState('All');

  const handlePage = async (event, value) => {
    scrollTo({top: 0, behavior: "smooth"})
    setPage(value);
  }

  useEffect(() => {
    scrollTo({top: 0, behavior: "smooth"})
    fetchTypes()
    setCategory(searchInput);
    setPage(1)
  }, [searchInput])

  const CateLabel = () => {
    return (
      <span className="font-bold text-tealHover">
        {category}
      </span>
    );
  }
  const loading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const LoadingItem = () => {
    if (itemsPageLoading) {
      return (
        <>
          <div
            className="bg-gray-100 max-w-[270px] min-h-[350px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col justify-center items-center">
            <Spinner size="xl" color="purple"/>
          </div>
        </>
      )
    }
  }

  return (
    <div className="flex flex-col gap-y-6 xl:py-6 lg:py-12 md:py-8 py-6">
      <div className="flex flex-col gap-6 justify-center">
        <div className="font-bold flex flex-col items-center gap-y-6">
          Product
        </div>
        <Dropdown style={{background: "none"}} inline
                  label={searchInput === '' ?
                    <span className="font-bold text-tealHover">All</span> :
                    <CateLabel/>}>
          <div className="w-[270px]">
            <Dropdown.Item className="highlight-hover font-bold" onClick={() => {
              setSearchInput('')
            }}>
              <div className={`${searchInput === '' && 'text-tealHover'}`}>
                All
              </div>
            </Dropdown.Item>
            {types.map((type, key) => {
              return (
                <Dropdown.Item key={key} className={"highlight-hover font-bold"} onClick={() => {
                  setSearchInput(type.type)
                }}>
                  <div className={`${searchInput === type.type && 'text-tealHover'}`}>
                    {type.type}
                  </div>
                </Dropdown.Item>
              )
            })}
          </div>
        </Dropdown>
      </div>
      <div className="flex flex-col gap-6 justify-center">
        {/*display item */}
        <div className="grid auto-rows-fr gap-12
            min-[1880px]:grid-cols-4
            xl:grid-cols-4 xl:px-8
            lg:grid-cols-3
            md:grid-cols-2 md:px-12
          ">
          {loading.map(l => <LoadingItem key={l}/>)}
          {itemsPaginate?.length === 0 && <div>No items found</div>}
          {itemsPaginate?.map((item) => {
            return (
              <ItemCard key={item?.id} item={item}/>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Pagination defaultPage={1} page={page} onChange={handlePage} count={pageSum}/>
        </div>
      </div>
    </div>
  );
};


